import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const DashIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <rect x="8" y="13.3" width="12" height="1.5" />
    </SvgIcon>
  );
};

export default React.memo(DashIcon);
