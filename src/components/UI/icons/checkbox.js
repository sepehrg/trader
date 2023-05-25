import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const CheckboxIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <g>
          <path
            d="M22.3,26H5.7c-2,0-3.7-1.7-3.7-3.7V5.7C2,3.7,3.7,2,5.7,2h16.6c2,0,3.7,1.7,3.7,3.7v16.6C26,24.3,24.3,26,22.3,26z M5.7,3
			C4.2,3,3,4.2,3,5.7v16.6C3,23.8,4.2,25,5.7,25h16.6c1.5,0,2.7-1.2,2.7-2.7V5.7C25,4.2,23.8,3,22.3,3H5.7z"
          />
        </g>
        <g>
          <polygon points="11.3,19.9 5.9,14.5 6.6,13.8 11.3,18.5 21.4,8.4 22.1,9.1 " />
        </g>
      </g>
    </SvgIcon>
  );
};

export default React.memo(CheckboxIcon);
