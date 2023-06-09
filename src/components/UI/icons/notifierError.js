import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const NotifierErrorIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M25.4,12.9l-4.1-7.1c-0.3-0.5-0.7-1-1.2-1.3C19.6,4.3,19.1,4,18.4,4h-8.1C9.7,4,9.1,4.2,8.6,4.6
		C8.1,4.8,7.7,5.4,7.4,5.9l-4.1,7.1c-0.3,0.5-0.5,1.1-0.5,1.7c0,0.6,0.2,1.2,0.5,1.7l4.1,7.1c0.3,0.5,0.7,0.9,1.2,1.2
		c0.5,0.3,1.1,0.5,1.7,0.5h8.1c0.6,0,1.2-0.2,1.7-0.5c0.5-0.3,0.9-0.7,1.2-1.2l4.1-7.1c0.3-0.5,0.5-1.1,0.5-1.7
		C25.9,14,25.7,13.4,25.4,12.9z M23.8,15.3l-4.1,7c-0.1,0.3-0.3,0.4-0.6,0.5C19,23,18.7,23,18.4,23h-8.1c-0.3,0-0.5,0-0.8-0.1
		c-0.2-0.1-0.4-0.2-0.6-0.5l-4.1-7.1c-0.1-0.2-0.2-0.5-0.2-0.8c0-0.3,0.1-0.5,0.2-0.8l4.1-7c0.1-0.3,0.3-0.5,0.6-0.6
		C9.8,6.1,10,6,10.3,6h8.1c0.3,0,0.6,0.1,0.8,0.2c0.2,0.1,0.4,0.3,0.6,0.6l4.1,7c0.1,0.3,0.2,0.5,0.2,0.8
		C24.1,14.9,24,15.1,23.8,15.3z"
        />
        <path
          d="M18.2,10.8c-0.3-0.4-0.9-0.4-1.3,0l-2.6,2.6l-2.6-2.6c-0.3-0.3-0.9-0.3-1.3,0c-0.4,0.4-0.4,0.9,0,1.3
		l2.6,2.6l-2.6,2.6c-0.4,0.4-0.4,0.9,0,1.3c0.4,0.4,0.9,0.4,1.3,0l2.6-2.6l2.6,2.6c0.3,0.4,0.9,0.4,1.3,0c0.4-0.4,0.4-0.9,0-1.3
		l-2.6-2.6l2.6-2.6C18.6,11.7,18.6,11.1,18.2,10.8z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(NotifierErrorIcon);
