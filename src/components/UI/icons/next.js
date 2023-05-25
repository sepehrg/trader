import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const NextIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M15.2,25.3c-0.2,0-0.4,0-0.6-0.1c-0.6-0.2-0.9-0.8-0.9-1.4v-4.6H3c-0.8,0-1.5-0.7-1.5-1.5v-7.3c0-0.8,0.7-1.5,1.5-1.5
			h10.7V4.2c0-0.6,0.4-1.2,0.9-1.4c0.6-0.2,1.2-0.1,1.6,0.3l9.8,9.8c0.6,0.6,0.6,1.5,0,2.1l-9.8,9.8C16,25.1,15.6,25.3,15.2,25.3z
			 M4.5,16.1h10.7c0.8,0,1.5,0.7,1.5,1.5v2.5l6.1-6.1l-6.1-6.1v2.5c0,0.8-0.7,1.5-1.5,1.5H4.5V16.1z"
      />
    </SvgIcon>
  );
};

export default React.memo(NextIcon);
