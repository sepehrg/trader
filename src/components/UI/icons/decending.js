import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const DecendingIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <polygon points="4.3,5.7 2.7,5.7 2.7,21.8 25.7,21.8 25.7,20.2 4.3,20.2 	" />
        <polygon
          points="23.7,12.7 23.7,15.8 16.9,8.9 12.9,12.6 6.7,6.1 5.6,7.2 12.9,14.8 16.8,11 22.7,16.9 19.4,16.9 19.4,18.5 
		25.3,18.5 25.3,12.7 "
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(DecendingIcon);
