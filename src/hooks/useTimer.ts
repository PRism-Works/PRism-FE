'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialTime: number, callback: () => void) {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      callbackRef.current();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isRunning]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { timeLeft, startTimer, stopTimer, isRunning };
}
