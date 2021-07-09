import { useEffect, useState } from "react";
import { useAppSelector } from "src/redux";
import { loadAllInPersonVisitEntities } from "src/redux/modules/inPersonVisit";
import {
  selectAllInPersonVisits,
  selectContactEntities,
} from "src/redux/selectors";
import { InPersonVisit } from "src/types/InPersonVisit";

export function useInPersonVisits() {
  const [inPersonVisits, setInPersonVisits] = useState<InPersonVisit[]>([]);
  const baseInPersonVisits = useAppSelector(selectAllInPersonVisits);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    setInPersonVisits(
      loadAllInPersonVisitEntities(baseInPersonVisits, contactEntities)
    );
  }, [baseInPersonVisits, contactEntities]);

  return inPersonVisits;
}

export function useUpcomingInPersonVisits() {
  const [inPersonVisits, setInPersonVisits] = useState<InPersonVisit[]>([]);
  const baseInPersonVisits = useAppSelector(selectAllInPersonVisits);
  const contactEntities = useAppSelector(selectContactEntities);

  useEffect(() => {
    const filteredInPersonVisits = baseInPersonVisits
      .filter(
        (inPersonVisit) =>
          (inPersonVisit.status === "live" ||
            inPersonVisit.status === "scheduled") &&
          // inPersonVisit.status === "missing_monitor") &&
          new Date(inPersonVisit.scheduledEnd) >= new Date()
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
    setInPersonVisits(
      loadAllInPersonVisitEntities(filteredInPersonVisits, contactEntities)
    );
  }, [baseInPersonVisits, contactEntities]);

  return inPersonVisits;
}
