import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const MoonIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 512 512" {...props}>
      <g>
        <path
          d="M496.8,311.9c-27.5,105.2-123.1,182.9-236.9,182.9C124.7,494.8,15,385.2,15,249.9
		C15,141.6,85.3,49.7,182.8,17.4c2-0.7,4.2,0,5.4,1.7c1.2,1.7,1.3,3.9,0,5.6c-24.3,34-38.6,75.7-38.6,120.7
		c0,115,93.2,208.1,208.1,208.1c49.9,0,95.5-17.5,131.4-46.6c1.6-1.3,3.9-1.4,5.6-0.3C496.5,307.8,497.4,309.9,496.8,311.9
		L496.8,311.9z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(MoonIcon);
