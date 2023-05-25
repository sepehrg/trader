import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const DraftIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <path
          d="M22,1.9H6c-2,0-3.6,1.6-3.6,3.6v17.1c0,2,1.6,3.6,3.6,3.6h9v-1.3H6c-1.3,0-2.3-1-2.3-2.3V5.5c0-1.3,1-2.3,2.3-2.3h16
		c1.3,0,2.3,1,2.3,2.3v10.3h1.3V5.5C25.6,3.5,24,1.9,22,1.9z"
        />
        <path
          d="M24.2,20.9L24.2,20.9l-0.3-0.3L23.3,20l0,0l-4.4-4.4l-4.6-0.6l0.6,4.5l4.8,4.8l0.8,0.8c0.6,0.6,1.3,0.8,2,0.8
		c0.7,0,1.5-0.3,2-0.8c0.5-0.5,0.8-1.2,0.8-2s-0.3-1.5-0.8-2L24.2,20.9z M15.8,16.5l2.5,0.3l4.1,4.1l-2.1,2.1L16.1,19L15.8,16.5z
		 M23.6,24.4c-0.6,0.6-1.6,0.6-2.2,0L21.1,24l2.2-2.2l0.4,0.4c0.3,0.3,0.4,0.7,0.4,1.1S23.9,24.1,23.6,24.4z"
        />
        <rect x="7.6" y="7" width="12.7" height="1.3" />
        <rect x="7.6" y="10.7" width="12.7" height="1.3" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(DraftIcon);
