import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M25.9,13.2l-9.3-9.4c-1.3-1.3-3.7-1.3-5,0l-9.4,9.4L2.9,14l1.3-1.3v10.7c0,1,0.8,1.8,1.8,1.8h4.6h7h4.6c1,0,1.8-0.8,1.8-1.8
	V12.7l1.3,1.3L25.9,13.2z M11.5,24.1v-6c0-0.6,0.5-1.1,1.1-1.1h2.9c0.6,0,1.1,0.5,1.1,1.1v6H11.5z M22.9,23.4c0,0.4-0.3,0.8-0.8,0.8
	h-4.6v-6c0-1.1-0.9-2.1-2.1-2.1h-2.9c-1.1,0-2.1,0.9-2.1,2.1v6H5.9c-0.4,0-0.8-0.3-0.8-0.8V11.7l7.1-7.1c1-1,2.6-1,3.6,0l7.1,7.1
	V23.4z"
      />
    </SvgIcon>
  );
};

export default React.memo(HomeIcon);
