import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const AddIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="-497 499 28 28">
      <g>
        <path
          d="M-483,501.5c-6.3,0-11.5,5.2-11.5,11.5c0,6.3,5.2,11.5,11.5,11.5c6.3,0,11.5-5.2,11.5-11.5
		C-471.5,506.7-476.7,501.5-483,501.5z M-483,523.2c-5.6,0-10.2-4.6-10.2-10.2c0-5.6,4.6-10.2,10.2-10.2s10.2,4.6,10.2,10.2
		C-472.8,518.6-477.4,523.2-483,523.2z"
        />
        <path
          d="M-478,512.3h-4.4V508c0-0.4-0.3-0.7-0.7-0.7s-0.7,0.3-0.7,0.7v4.4h-4.4c-0.4,0-0.7,0.3-0.7,0.7
		s0.3,0.7,0.7,0.7h4.4v4.4c0,0.4,0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7v-4.4h4.4c0.4,0,0.7-0.3,0.7-0.7S-477.6,512.3-478,512.3z"
        />
      </g>
    </SvgIcon>
  );
};

export default React.memo(AddIcon);
