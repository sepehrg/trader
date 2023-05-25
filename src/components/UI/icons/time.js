import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const TimeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M14,2.6C7.7,2.6,2.6,7.7,2.6,14S7.7,25.4,14,25.4S25.4,20.3,25.4,14S20.3,2.6,14,2.6z M14,23.7
		c-5.3,0-9.7-4.3-9.7-9.7S8.7,4.3,14,4.3s9.7,4.3,9.7,9.7S19.3,23.7,14,23.7z"
        />
        <path
          d="M17.1,13.9h-2.9V9.4c0-0.5-0.4-0.9-0.9-0.9s-0.9,0.4-0.9,0.9v5.3c0,0.5,0.4,0.8,0.9,0.8h3.8
		c0.5,0,0.8-0.4,0.8-0.8S17.5,13.9,17.1,13.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TimeIcon);
