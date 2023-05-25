import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ArrowBottom = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="24.1,14.2 14.9,23.4 14.9,2.1 13.1,2.1 13.1,23.4 3.9,14.2 2.7,15.4 14,26.7 25.3,15.4 " />
    </SvgIcon>
  );
};

export default React.memo(ArrowBottom);
