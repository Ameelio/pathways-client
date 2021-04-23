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

export function useUpcomingCalls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const baseCalls = useAppSelector(selectAllCalls);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    const filteredCalls = baseCalls
      .filter(
        (call) =>
          call.status === "live" ||
          call.status === "scheduled" ||
          call.status === "missing_monitor"
      )
      .sort((a, b) => {
        const key1 = new Date(a.scheduledStart);
        const key2 = new Date(b.scheduledStart);
        // sort in ascending order
        if (key1 < key2) {
          return -1;
        } else if (key1 === key2) {
          return 0;
        } else {
          return 1;
        }
      });
    setCalls(loadAllCallEntities(filteredCalls, contactEntities));
  }, [baseCalls, contactEntities]);

  return calls;
}

export function usePastCalls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const baseCalls = useAppSelector(selectAllCalls);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    const filteredCalls = baseCalls
      .filter(
        (call) =>
          call.status === "ended" ||
          call.status === "terminated" ||
          call.status === "no_show"
      )
      .sort((a, b) => {
        // sort in descending order
        const key1 = new Date(a.scheduledStart);
        const key2 = new Date(b.scheduledStart);
        if (key1 < key2) {
          return 1;
        } else if (key1 === key2) {
          return 0;
        } else {
          return -1;
        }
      });
    setCalls(loadAllCallEntities(filteredCalls, contactEntities));
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
