// components/ClockCalendar.js
import React, { useState, useEffect } from 'react';

const ClockCalendar = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = (date) =>
    date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <div className="bg-white text-gray-700 shadow-md rounded-xl px-6 py-2 w-fit mx-auto text-center">
      <div className="text-lg font-semibold">{formatDate(dateTime)}</div>
      <div className="text-2xl font-bold text-indigo-700">{formatTime(dateTime)}</div>
    </div>
  );
};

export default ClockCalendar;
