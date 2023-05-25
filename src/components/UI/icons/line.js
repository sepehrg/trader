import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const LineIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <line x1="-1.1" y1="259" x2="-1.1" y2="-231" />
    </SvgIcon>
  );
};

export default React.memo(LineIcon);
