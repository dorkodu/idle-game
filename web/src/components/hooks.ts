import { useEffect, useState } from "react";

export function useDelay() {
  const [state, setState] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setState(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  return state;
}

export function useTimer(to: number, onEnd: () => void) {
  function getTimeText(): string {
    const currentDate = new Date();
    const endDate = new Date(to);

    const _hour = Math.abs(endDate.getUTCHours() - currentDate.getUTCHours());
    const _minute = Math.abs(endDate.getUTCMinutes() - currentDate.getUTCMinutes());
    const _second = Math.abs(endDate.getUTCSeconds() - currentDate.getUTCSeconds());

    const hour = _hour > 9 ? _hour : `0${_hour}`;
    const minute = _minute > 9 ? _minute : `0${_minute}`;
    const second = _second > 9 ? _second : `0${_second}`;

    if (currentDate.getTime() >= endDate.getTime()) return "00:00:00";
    return `${hour}:${minute}:${second}`;
  }

  const [time, setTime] = useState(getTimeText())
  useEffect(() => {
    const callback = () => {
      const currentDate = new Date();
      const endDate = new Date(to);

      if (currentDate.getTime() >= endDate.getTime()) onEnd();
      setTime(getTimeText());
    }

    const interval = setInterval(callback, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}