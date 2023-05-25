import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const KeyIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M19.5,6.1c-1.3,0-2.4,1.1-2.4,2.4c0,1.3,1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4C21.9,7.2,20.8,6.1,19.5,6.1z M19.5,9.9
		c-0.8,0-1.4-0.6-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4s1.4,0.6,1.4,1.4C20.9,9.3,20.3,9.9,19.5,9.9z"
      />
      <path
        d="M17.8,2c-4.5,0-8.2,3.7-8.2,8.2c0,0.7,0.1,1.4,0.3,2.2l-7.5,7.5C2.1,20.1,2,20.3,2,20.6v4.3C2,25.5,2.5,26,3.1,26h5.3
		c0.6,0,1.1-0.5,1.1-1.1L9.5,23h1.9c0.6,0,1.1-0.5,1.1-1.1l0.1-1.9h0.9c0.3,0,0.6-0.1,0.8-0.3l1.5-1.5c0.7,0.2,1.4,0.3,2.1,0.3
		c4.5,0,8.2-3.7,8.2-8.2C26,5.7,22.3,2,17.8,2z M17.8,17.5c-0.6,0-1.3-0.1-1.8-0.2c-0.4-0.1-0.8,0-1,0.3L13.4,19h-0.9
		c-0.6,0-1.1,0.5-1.1,1.1v1.9c0,0,0,0.1-0.1,0.1H9.5c-0.6,0-1.1,0.5-1.1,1.1v1.9c0,0,0,0.1-0.1,0.1H3.1C3,25,3,25,3,24.9l0-4.4
		l7.5-7.5c0.3-0.3,0.4-0.7,0.3-1c-0.2-0.6-0.2-1.2-0.2-1.8c0-4,3.2-7.2,7.2-7.2c4,0,7.2,3.2,7.2,7.2C25,14.2,21.8,17.5,17.8,17.5z"
      />
    </SvgIcon>
  );
};

export default React.memo(KeyIcon);
