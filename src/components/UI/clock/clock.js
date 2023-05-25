import { useEffect, useState } from "react";
import moment from "moment";

let offset = 0;

const Clock = (props) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    tick();
    const interval = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (props.date) {
      offset = moment(props.date).diff(moment());
    }
  }, [props.date]);

  const tick = () => {
    setTime(moment().add(offset, "milliseconds").format("HH:mm:ss"));
  };

  return time;
};

export default Clock;
