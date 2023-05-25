import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const NoImageIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M23,4.4H5c-1.8,0-3.2,1.4-3.2,3.2v12.8c0,1.8,1.4,3.2,3.2,3.2h17.9c1.8,0,3.2-1.4,3.2-3.2V7.6
		C26.2,5.8,24.7,4.4,23,4.4z M5,5.7h17.9c1,0,1.9,0.8,1.9,1.9v11.2l-5.1-5c-0.3-0.2-0.7-0.2-0.9,0l-3.5,3.4l-5.2-6.3
		c-0.1-0.1-0.3-0.2-0.5-0.2s-0.4,0.1-0.5,0.2l-6,7.3V7.6C3.1,6.6,4,5.7,5,5.7z M3.1,20.4v-0.2l6.5-7.9l8.2,9.9H5
		C4,22.3,3.1,21.4,3.1,20.4z M23,22.3h-3.4l-3.4-4.1l3.1-3l5.5,5.4C24.7,21.5,23.9,22.3,23,22.3z"
        />
        <path
          d="M20,11.9c1.2,0,2.2-1,2.2-2.2s-1-2.2-2.2-2.2s-2.2,1-2.2,2.2S18.8,11.9,20,11.9z M20,8.9
		c0.5,0,0.9,0.4,0.9,0.9s-0.4,0.9-0.9,0.9s-0.9-0.4-0.9-0.9S19.5,8.9,20,8.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(NoImageIcon);