import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // Обновляем время каждую минуту
    }, 60000);

    return () => clearInterval(interval); // Очистка таймера при размонтировании
  }, []);

  return (
    <div>
      <span>{time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
  );
};

export default Clock;