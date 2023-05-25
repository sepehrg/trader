import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const KeyboardIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M24.4,7.3H2.8c-0.9,0-1.5,0.6-1.5,1.4v10.8c0,0.8,0.7,1.5,1.5,1.5h21.5c0.8,0,1.4-0.7,1.4-1.5V8.7
		C25.8,7.9,25.2,7.3,24.4,7.3z M2.8,19.6V8.8l21.5,0l0.1,10.7L2.8,19.6z"
        />
        <rect x="4.8" y="10.2" width="2" height="1.5" />
        <rect x="8.7" y="10.2" width="2" height="1.5" />
        <rect x="12.5" y="10.2" width="2.1" height="1.5" />
        <rect x="16.5" y="10.2" width="2" height="1.5" />
        <rect x="20.3" y="10.2" width="2" height="1.5" />
        <rect x="6.7" y="13.4" width="2" height="1.5" />
        <rect x="10.6" y="13.4" width="2.1" height="1.5" />
        <rect x="14.5" y="13.4" width="2.1" height="1.5" />
        <rect x="18.4" y="13.4" width="2" height="1.5" />
        <rect x="8.8" y="16.4" width="9.5" height="1.5" />
        <rect x="4.7" y="16.4" width="2.5" height="1.5" />
        <rect x="20" y="16.4" width="2.5" height="1.5" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(KeyboardIcon);
