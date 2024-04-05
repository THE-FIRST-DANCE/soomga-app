import { EventData } from "@/interface/Event";
import Colors from "@/modules/Color";
import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { useMemo, useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";

interface UseParsedMarkersProps {
  allEvents: EventData[];
  selectedDate: string;
}

type UseParsedMarkersReturn = {
  markers: MarkedDates;
};

const useParsedMarkers = ({
  allEvents,
  selectedDate,
}: UseParsedMarkersProps): UseParsedMarkersReturn => {
  const [markers, setMarkers] = useState<MarkedDates>({});

  const parsedMarkers = useMemo<MarkedDates>(() => {
    const initialValue: MarkedDates = {};
    const emptyPeriod = { color: "transparent" };

    return (
      allEvents
        ?.sort((a, b) => {
          const aStart = startOfDay(new Date(a.start));
          const aEnd = endOfDay(new Date(a.end));
          const bStart = startOfDay(new Date(b.start));
          const bEnd = endOfDay(new Date(b.end));

          return (
            differenceInDays(bEnd, bStart) - differenceInDays(aEnd, aStart)
          );
        })
        .reduce((prev, curr) => {
          const color = Colors.PRIMARY;
          const start = startOfDay(new Date(curr.start));
          const end = endOfDay(new Date(curr.end));
          const totalDays = differenceInDays(end, start) + 1;

          let rowIndex = 0;
          let freeRowFound = false;
          while (!freeRowFound) {
            freeRowFound = true;
            for (let i = 0; i < totalDays; i++) {
              const date = addDays(start, i);
              const dateStr = format(date, "yyyy-MM-dd");

              const period = prev[dateStr]?.periods?.[rowIndex];
              if (period) {
                if (isWithinInterval(date, { start, end })) {
                  rowIndex++;
                  freeRowFound = false;
                  break;
                }
              }
            }
          }

          for (let i = 0; i < totalDays; i++) {
            const date = addDays(start, i);
            const dateStr = format(date, "yyyy-MM-dd");

            let marking = prev[dateStr];
            if (marking === undefined) {
              marking = {};
            }

            if (marking.periods === undefined) {
              marking.periods = [];
            }

            if (marking.periods.length <= rowIndex) {
              marking.periods = marking.periods.concat(
                [...Array(rowIndex + 1 - marking.periods.length)].map(() => ({
                  ...emptyPeriod,
                }))
              );
            }

            marking.periods[rowIndex] = {
              color: color,
              startingDay: i === 0,
              endingDay: i === totalDays - 1,
            };

            prev[dateStr] = marking;
          }

          return prev;
        }, initialValue) ?? initialValue
    );
  }, [allEvents]);

  useEffect(() => {
    const updateMarkers = {
      ...parsedMarkers,
      [selectedDate]: {
        ...parsedMarkers[selectedDate],
        selected: true,
      },
    };

    setMarkers(updateMarkers);
  }, [parsedMarkers, selectedDate]);

  return { markers };
};

export default useParsedMarkers;
