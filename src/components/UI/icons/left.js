import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const LeftIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 512 354" {...props}>
      <g>
        <polyline points="178,349 6,177 178,5 " />
        <line x1="6" y1="177" x2="504" y2="177" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(LeftIcon);
