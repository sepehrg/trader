import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const TickIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path d="M-0.2,467.8C118.7,467.8,216,370.9,216,252C216,133.5,119.1,36.2-0.2,36.2S-216,133.1-216,252S-119.1,467.8-0.2,467.8L-0.2,467.8z" />
        <polyline points="112.9,189.6 -39.4,342 -113.1,268.3 " />
      </g>
    </SvgIcon>
  );
};

export default React.memo(TickIcon);
