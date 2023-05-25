import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ArrowToTop = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="14,3.7 3.2,13 4.3,14.2 13.1,6.7 13.1,25.9 14.9,25.9 14.9,6.7 23.7,14.2 24.8,13 " />
      <rect x="3.7" y="1.6" width="20.6" height="1.8" />
    </SvgIcon>
  );
};

export default React.memo(ArrowToTop);
