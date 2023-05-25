import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const EraserIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M25.3,13.7c1.2-1.2,1.2-3.2,0-4.4l-4.9-4.9c-1.2-1.2-3.2-1.2-4.4,0l-8.1,8.1l-3.3,3.2c-1.2,1.2-1.2,3.2,0,4.4l2.9,2.9h-5
	v1.3h6.3h5.7h5.8v-1.3h-4.5l1.8-1.8L25.3,13.7z M9.4,23.1l-3.8-3.8c-0.7-0.7-0.7-1.8,0-2.5L8.3,14l3.7,3.7l3.7,3.7L14,23.1H9.4z
	 M13,16.7L9.3,13l7.7-7.7c0.7-0.7,1.8-0.7,2.6,0l4.9,4.9c0.7,0.7,0.7,1.9,0,2.6l-7.7,7.7L13,16.7z"
      />
    </SvgIcon>
  );
};

export default React.memo(EraserIcon);
