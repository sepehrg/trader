import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const TickIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="10,24.6 1.1,15.7 3.9,12.8 10,18.9 24.1,4.8 26.9,7.7 " />
    </SvgIcon>
  );
};

export default React.memo(TickIcon);
