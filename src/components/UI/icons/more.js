import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const MoreIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 28 28" {...props}>
      <g>
        <path
          d="M2.5,19.4c0-0.2,0.1-0.4,0.2-0.5L13.5,8.1C13.6,8,13.8,7.9,14,7.9s0.4,0.1,0.5,0.2L25.3,19c0.3,0.3,0.3,0.7,0,1
			s-0.7,0.3-1,0L14,9.6L3.7,19.9c-0.3,0.3-0.7,0.3-1,0C2.6,19.8,2.5,19.6,2.5,19.4z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MoreIcon);
