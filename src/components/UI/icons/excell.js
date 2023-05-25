import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ExcellIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M24.8,10.6c0-0.1,0-0.1,0-0.2c0,0,0,0,0-0.1c0-0.1-0.1-0.1-0.1-0.2L16.5,2c-0.1-0.1-0.1-0.1-0.2-0.1
		c0,0,0,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0H5.8c-1.5,0-2.7,1.2-2.7,2.7v18.9c0,1.5,1.2,2.7,2.7,2.7h16.3c1.5,0,2.7-1.2,2.7-2.7
		L24.8,10.6C24.9,10.6,24.8,10.6,24.8,10.6z M16.7,4.1l5.9,5.9H19c-1.2,0-2.2-1-2.2-2.2V4.1z M22.2,24.8H5.8c-0.8,0-1.4-0.6-1.4-1.4
		V4.5c0-0.8,0.6-1.4,1.4-1.4h9.6v4.6c0,2,1.6,3.5,3.5,3.5h4.6v12.2C23.6,24.2,22.9,24.8,22.2,24.8z"
        />
        <path
          d="M17.9,13.2c-0.3-0.2-0.7-0.2-0.9,0.1l-3,3.5l-3-3.5c-0.2-0.3-0.6-0.3-0.9-0.1c-0.3,0.2-0.3,0.6-0.1,0.9
		l3.1,3.6L10,21.3c-0.2,0.3-0.2,0.7,0.1,0.9c0.1,0.1,0.3,0.2,0.4,0.2c0.2,0,0.4-0.1,0.5-0.2l3-3.5l3,3.5c0.1,0.1,0.3,0.2,0.5,0.2
		c0.2,0,0.3-0.1,0.4-0.2c0.3-0.2,0.3-0.6,0.1-0.9l-3.1-3.6l3.1-3.6C18.2,13.8,18.2,13.4,17.9,13.2z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ExcellIcon);
