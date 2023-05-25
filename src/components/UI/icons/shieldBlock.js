import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ShieldBlockIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M14,1.7L3.8,5.2V13c0,0.4,0.1,9.6,10.1,13.2l0.2,0l0.2-0.1c9.9-3.6,10.1-12.8,10.1-13.2V5.2L14,1.7z M5.3,6.3l8.8-3l8.8,3
		V13c0,0.9-0.2,8.5-8.8,11.7C5.5,21.5,5.3,13.9,5.3,13V6.3z"
        />
        <polygon points="9.8,19.3 14,15.1 18.2,19.3 19.3,18.2 15.1,14 19.3,9.8 18.2,8.7 14,12.9 9.8,8.7 8.7,9.8 12.9,14 8.7,18.2 " />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ShieldBlockIcon);
