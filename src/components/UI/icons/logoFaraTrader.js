import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const LogoFaraTraderIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M15.8,2.3l1.4,0.8l-11,6.4v12.7l-1.4-0.8C3.7,20.7,3,19.6,3,18.3V9.7c0-1.3,0.7-2.5,1.8-3.1l7.4-4.3
		C13.3,1.7,14.7,1.7,15.8,2.3L15.8,2.3z M20.3,4.9l2.9,1.7C24.3,7.3,25,8.4,25,9.7v8.5c0,1.3-0.7,2.5-1.8,3.1l-7.4,4.3
		c-1.1,0.7-2.5,0.7-3.6,0L9.3,24v-5.6l12.5-7.2V9.4l-1.5-0.9l-11,6.3v-3.5L20.3,4.9z M12.3,20.3l0.2,1.7l1.4,1l7.8-4.5v-3.6
		L12.3,20.3z"
      />
    </SvgIcon>
  );
};

export default React.memo(LogoFaraTraderIcon);
