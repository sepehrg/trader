import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ArrowTop = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <polygon points="14,1.3 2.7,12.6 3.9,13.8 13.1,4.6 13.1,25.9 14.9,25.9 14.9,4.6 24.1,13.8 25.3,12.6 " />
      </g>
    </SvgIcon>
  );
};

export default React.memo(ArrowTop);
