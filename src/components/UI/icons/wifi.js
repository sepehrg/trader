import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const MessageIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M14,5.9c-4.4,0-8.6,1.6-11.8,4.6l0.7,0.7c3.1-2.8,7-4.3,11.2-4.3c4.1,0,8.1,1.5,11.2,4.3l0.7-0.7C22.6,7.5,18.4,5.9,14,5.9
		z"
        />
        <path d="M6.6,14.9l0.7,0.7c1.9-1.7,4.3-2.6,6.8-2.6s4.9,0.9,6.8,2.6l0.7-0.7c-2-1.8-4.7-2.8-7.4-2.8C11.3,12.1,8.6,13.1,6.6,14.9z" />
        <path
          d="M14,17.1c-1.4,0-2.5,1.1-2.5,2.5c0,1.4,1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5C16.5,18.3,15.4,17.1,14,17.1z M14,21.1
		c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5C15.5,20.4,14.8,21.1,14,21.1z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MessageIcon);
