import React, { useState, useEffect } from "react";
import moment from "moment";
import "./style.css";

function Clock() {
  const [time, setTime] = useState(() => moment().format("HH:mm"));

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(moment().format("HH:mm"));
    }, 1000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalID);
  }, []);

  return <p className="App-clock">{time}</p>;
}

export default Clock;
