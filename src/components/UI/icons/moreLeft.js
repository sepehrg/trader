import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const MoreLeftIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M2.5,19.4c0-0.2,0.1-0.4,0.2-0.5L13.5,8.1c0.1-0.1,0.3-0.2,0.5-0.2s0.4,0.1,0.5,0.2L25.3,19c0.3,0.3,0.3,0.7,0,1
			c-0.3,0.3-0.7,0.3-1,0L14,9.6L3.7,19.9c-0.3,0.3-0.7,0.3-1,0C2.6,19.8,2.5,19.6,2.5,19.4z"
      />
    </SvgIcon>
  );
};

export default React.memo(MoreLeftIcon);
