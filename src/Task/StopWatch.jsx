import React, { useEffect, useRef, useState } from 'react';


const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerId = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }

    return () => clearInterval(timerId.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <div>Time: {elapsedTime} seconds</div>
      <button className="btn btn-primary" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button className="btn btn-primary" onClick={handleReset} disabled={isRunning}>Reset</button>
    </div>

  );
};

export default Stopwatch;
