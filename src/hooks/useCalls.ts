import { useState, useEffect } from "react";
import { Call } from "src/types/Call";
import { loadAllCallEntities, loadCallEntities } from "src/utils";
import {
  selectAllCalls,
  selectCallById,
  selectContactEntities,
} from "src/redux/selectors";
import { useAppSelector } from "src/redux";

export function useCalls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const baseCalls = useAppSelector(selectAllCalls);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    setCalls(loadAllCallEntities(baseCalls, contactEntities));
  }, [baseCalls, contactEntities]);

  return calls;
}

export function useCallById(id: number) {
  const baseCall = useAppSelector((state) => selectCallById(state, id));
  const contactEntities = useAppSelector(selectContactEntities);
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (baseCall) setCall(loadCallEntities(baseCall, contactEntities));
  }, [baseCall, contactEntities]);

  return call;
}
