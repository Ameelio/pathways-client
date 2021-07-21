import { useState, useEffect } from "react";
import { Call } from "src/types/Call";
import { loadAllCallEntities } from "src/utils";
import {
  selectAllCalls,
  selectAllInPersonVisits,
  selectContactEntities,
} from "src/redux/selectors";
import { useAppSelector } from "src/redux";
import { InPersonVisit } from "src/types/InPersonVisit";
import { loadAllInPersonVisitEntities } from "src/redux/modules/inPersonVisit";

export function useUpcomingVisits() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [inPersonVisits, setInPersonVisits] = useState<InPersonVisit[]>([]);
  const baseCalls = useAppSelector(selectAllCalls);
  const baseInPersonVisits = useAppSelector(selectAllInPersonVisits);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    const filteredCalls = baseCalls.filter(
      (call) =>
        (call.status === "live" ||
          call.status === "scheduled" ||
          call.status === "missing_monitor") &&
        new Date(call.scheduledEnd) >= new Date()
    );
    setCalls(loadAllCallEntities(filteredCalls, contactEntities));
  }, [baseCalls, contactEntities]);

  useEffect(() => {
    console.log("hi from effect");
    console.log(baseInPersonVisits);
    const filteredInPersonVisits = baseInPersonVisits.filter(
      (inPersonVisit) =>
        (inPersonVisit.status === "live" ||
          inPersonVisit.status === "scheduled") &&
        new Date(inPersonVisit.scheduledEnd) >= new Date()
    );
    console.log("hi filtered from effect");
    console.log(filteredInPersonVisits);
    setInPersonVisits(
      loadAllInPersonVisitEntities(filteredInPersonVisits, contactEntities)
    );
  }, [baseInPersonVisits, contactEntities]);

  let visits = [...calls, ...inPersonVisits];
  return visits.sort((a, b) => {
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
}
