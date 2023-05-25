import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ArrowToBottom = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="24.6,14.9 23.6,13.5 14.9,20.9 14.9,2.1 13.1,2.1 13.1,20.9 4.4,13.5 3.4,14.9 14,23.9 	" />
      <rect x="3.9" y="24.6" width="20.3" height="1.8" />
    </SvgIcon>
  );
};

export default React.memo(ArrowToBottom);
