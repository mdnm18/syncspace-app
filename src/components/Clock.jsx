import React, { useState, useEffect } from "react";

// This component displays the current time and date, updating every second.
const Clock = ({ darkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect to set up an interval that updates the time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Formatting options for the date and time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={darkMode ? "text-slate-300" : "text-slate-700"}>
      <div className="font-bold text-lg text-center">
        {currentTime.toLocaleTimeString("en-US", timeOptions)}
      </div>
      <div className="text-xs text-center">
        {currentTime.toLocaleDateString("en-US", dateOptions)}
      </div>
    </div>
  );
};

export default Clock;
