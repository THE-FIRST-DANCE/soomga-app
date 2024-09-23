import { useEffect, useState } from "react";

const useTimer = (time: string, start: boolean) => {
  console.log(time, start);

  const [hour, minute] = time.split(" ");
  const [hourNum, minuteNum] = [parseInt(hour), parseInt(minute)];
  const [currentHour, setCurrentHour] = useState(hourNum);
  const [currentMinute, setCurrentMinute] = useState(minuteNum);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (start) {
      timer = setInterval(() => {
        if (currentMinute === 0) {
          if (currentHour === 0) {
            clearInterval(timer);
          } else {
            setCurrentHour(currentHour - 1);
            setCurrentMinute(59);
          }
        } else {
          setCurrentMinute(currentMinute - 1);
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [start, currentHour, currentMinute]);

  return { currentHour, currentMinute };
};

export default useTimer;
