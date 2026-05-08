import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const shouldwait = useRef(true);

  useEffect(() => {
    if (!shouldwait.current) {
      return;
    }
    setThrottledValue(value);
    shouldwait.current = false;
    setTimeout(() => (shouldwait.current = true), delay);
  }, [value, delay]);
  return throttledValue;
};

export default useThrottle;
