import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const AscendingIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <polygon points="4.3,5.7 2.7,5.7 2.7,21.8 25.7,21.8 25.7,20.2 4.3,20.2 	" />
        <polygon
          points="19.4,6.2 19.4,7.7 22.7,7.7 16.8,13.6 12.9,9.9 5.6,17.5 6.7,18.5 12.9,12.1 16.9,15.8 23.7,8.8 23.7,12.1 
		25.3,12.1 25.3,6.2 "
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(AscendingIcon);
