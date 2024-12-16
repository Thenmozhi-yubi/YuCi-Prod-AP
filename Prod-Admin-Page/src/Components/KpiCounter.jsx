import React, { useState, useEffect } from "react";

const KpiCounter = ({ title, targetValue }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 50);

    const interval = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCounter(targetValue);
        clearInterval(interval);
      } else {
        setCounter(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetValue]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">{counter}</div>
      <div className="mt-2 text-lg">{title}</div>
    </div>
  );
};

export default KpiCounter;
