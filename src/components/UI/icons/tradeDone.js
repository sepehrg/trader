import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const tradeDoneIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <g>
          <path
            d="M14,26.1C7.3,26.1,1.9,20.7,1.9,14C1.9,7.3,7.3,1.9,14,1.9c6.7,0,12.1,5.5,12.1,12.2C26.1,20.7,20.7,26.1,14,26.1z
			 M14,3.2C8,3.2,3.2,8,3.2,14C3.2,20,8,24.8,14,24.8c6,0,10.8-4.9,10.8-10.8C24.8,8,20,3.2,14,3.2z"
          />
        </g>
        <g>
          <path
            d="M12.5,18.5l-4.3-4.2C8,14,8,13.6,8.3,13.4c0.3-0.3,0.7-0.3,0.9,0l3.3,3.3l6-6.6c0.2-0.3,0.7-0.3,0.9,0
			c0.3,0.2,0.3,0.7,0,0.9L12.5,18.5z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

export default React.memo(tradeDoneIcon);
