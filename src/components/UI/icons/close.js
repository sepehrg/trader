import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const CloseIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="25.8,4 24,2.2 14,12.1 4,2.2 2.2,4 12.1,14 2.2,24 4,25.8 14,15.9 24,25.8 25.8,24 15.9,14 " />
    </SvgIcon>
  );
};

export default React.memo(CloseIcon);
