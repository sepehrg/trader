import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const SentCoreIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M9.4,19.4c-0.1,0-0.1,0-0.1,0l-6-5c-0.1-0.1-0.1-0.2-0.1-0.3c0-0.2,0.1-0.2,0.1-0.3l6-5.1c0,0,0,0,0.1,0
		c0.1,0,0.1,0.1,0.1,0.1v2.2h7.8V9.6h-6.5V8.7c0-0.5-0.3-1-0.8-1.3C9.4,7.2,8.8,7.3,8.4,7.6l-6,5.1C2.1,13,1.9,13.5,1.9,14
		c0,0.5,0.2,1,0.6,1.3l6,5c0.3,0.2,0.6,0.3,0.9,0.3c0.2,0,0.4,0,0.6-0.1c0.5-0.2,0.8-0.7,0.8-1.3v-0.9h7.8v-1.3H9.4L9.4,19.4z"
        />
        <rect x="16.3" y="13.4" width="9.2" height="1.3" />
        <rect x="19.9" y="9.6" width="3.5" height="1.3" />
        <rect x="21.4" y="17.1" width="2.1" height="1.3" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(SentCoreIcon);
