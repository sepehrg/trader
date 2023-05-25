import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const DeleteIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M24.1,5.6h-2h-5V4.3C17.1,3,16,2,14.8,2h-1.5c-1.3,0-2.3,1-2.3,2.3l0,1.3h-5h-2v1h2l0,15.3c0,2.2,1.8,4.1,4.1,4.1h8
		c2.2,0,4.1-1.8,4.1-4.1V6.6h2V5.6z M11.9,4.3c0-0.7,0.6-1.3,1.3-1.3h1.5c0.7,0,1.3,0.6,1.3,1.3v1.3h-4.1L11.9,4.3z M21.1,21.9
		c0,1.7-1.4,3.1-3.1,3.1h-8c-1.7,0-3.1-1.4-3.1-3.1l0-15.3h4h6.1h4V21.9z"
        />
        <rect x="10.9" y="11" width="1" height="9.5" />
        <rect x="16.1" y="11" width="1" height="9.5" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(DeleteIcon);
