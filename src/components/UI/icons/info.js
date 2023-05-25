import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const InfoIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <g>
          <path
            d="M14,26C7.4,26,2,20.6,2,14C2,7.4,7.4,2,14,2c6.6,0,12,5.4,12,12C26,20.6,20.6,26,14,26z M14,3C7.9,3,3,7.9,3,14
			c0,6.1,4.9,11,11,11s11-4.9,11-11C25,7.9,20.1,3,14,3z"
          />
        </g>
        <g>
          <g>
            <path d="M14,20.4c-0.6,0-1.1-0.5-1.1-1.1v-6.6c0-0.6,0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1v6.6C15.1,19.9,14.6,20.4,14,20.4z" />
          </g>
          <g>
            <circle cx="14" cy="9.1" r="1.1" />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
};

export default React.memo(InfoIcon);
