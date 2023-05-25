import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const HideIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M7,17.8c-1.8-1.4-3-3-3.6-3.7c1-1.4,4.9-6.3,10.6-6.3c1,0,2.1,0.2,3.1,0.5l0.5-1.4c-1.2-0.4-2.4-0.6-3.6-0.6
		c-7.5,0-12,7.1-12.1,7.4L1.6,14l0.2,0.4c0.1,0.1,1.5,2.5,4.2,4.5L7,17.8z"
        />
        <path
          d="M26.1,13.6c-0.1-0.1-1.9-3.1-5.2-5.2l0.9-0.9l-1.1-1.1l-1.2,1.2l0,0L7.4,19.9l0,0l-1.7,1.7l1.1,1.1l2.1-2.1
		c1.7,0.8,3.4,1.2,5.2,1.2c7.5,0,12-7.1,12.1-7.4l0.2-0.4L26.1,13.6z M14,20.4c-1.4,0-2.8-0.3-4.1-0.9l1.9-1.9
		c0.7,0.4,1.4,0.6,2.2,0.6c2.3,0,4.2-1.9,4.2-4.2c0-0.8-0.2-1.6-0.6-2.2l2.3-2.3c2.4,1.5,4.1,3.7,4.7,4.5
		C23.6,15.5,19.7,20.4,14,20.4z M16.7,14c0,1.5-1.2,2.7-2.7,2.7c-0.4,0-0.8-0.1-1.1-0.2l3.6-3.6C16.6,13.3,16.7,13.6,16.7,14z"
        />
        <path
          d="M14,11.3c0.2,0,0.3,0,0.5,0l0.2-1.5c-0.2,0-0.5-0.1-0.7-0.1c-2.3,0-4.2,1.9-4.2,4.2c0,0.2,0,0.4,0,0.6l1.5-0.2
		c0-0.1,0-0.3,0-0.4C11.3,12.5,12.5,11.3,14,11.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(HideIcon);
