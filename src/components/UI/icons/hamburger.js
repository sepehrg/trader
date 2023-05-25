import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const HamburgerIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <g>
          <path d="M25.5,6.1h-23C1.9,6.1,1.4,5.6,1.4,5s0.5-1.1,1.1-1.1h23c0.6,0,1.1,0.5,1.1,1.1S26.1,6.1,25.5,6.1z" />
        </g>
        <g>
          <path d="M25.5,15.1H14.4c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h11.1c0.6,0,1.1,0.5,1.1,1.1S26.1,15.1,25.5,15.1z" />
        </g>
        <g>
          <path d="M25.5,24.1h-23c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1h23c0.6,0,1.1,0.5,1.1,1.1S26.1,24.1,25.5,24.1z" />
        </g>
      </g>
    </SvgIcon>
  );
};

export default React.memo(HamburgerIcon);
