import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ChartIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          style={{ fill: "#E24C4B" }}
          d="M25.2,21.2L15.9,4.6c-0.8-1.4-3-1.4-3.8,0L2.8,21.2C2,22.7,3,24.5,4.7,24.5h18.6C25,24.4,26,22.7,25.2,21.2
		L25.2,21.2z"
        />
        <polygon
          style={{ fill: "#FFFFFF" }}
          points="14,5.7 23.3,22.3 4.7,22.3 14,5.7 	"
        />
        <path
          style={{ fill: "#3F4448" }}
          d="M12.5,13.3l0.6,3.8c0.1,0.4,0.4,0.8,0.9,0.8l0,0c0.4,0,0.9-0.4,0.9-0.8l0.6-3.8c0.1-0.9-0.6-1.7-1.5-1.7l0,0
		C13.1,11.6,12.4,12.4,12.5,13.3L12.5,13.3z"
        />
        <path
          style={{ fill: "#3F4448" }}
          d="M14.9,19.6c0-0.5-0.4-0.9-0.9-0.9c-0.5,0-0.9,0.4-0.9,0.9c0,0.5,0.4,0.9,0.9,0.9
		C14.5,20.5,14.9,20.1,14.9,19.6L14.9,19.6z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ChartIcon);
