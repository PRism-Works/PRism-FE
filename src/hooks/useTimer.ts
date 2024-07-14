import { useState, useEffect } from 'react';

export function useTimer(initialTime: number, callback: () => void) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setTimeLeft(initialTime);
    if (timerId) clearInterval(timerId);

    const newTimerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(newTimerId);
          setTimerId(null);
          callback();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerId(newTimerId);
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  return { timeLeft, startTimer };
}
