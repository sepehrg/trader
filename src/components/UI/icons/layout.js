import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const LayoutIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M21.2,2H6.8C4.2,2,2,4.2,2,6.8v14.3C2,23.8,4.2,26,6.8,26h14.3c2.7,0,4.8-2.2,4.8-4.8V6.8C26,4.2,23.8,2,21.2,2
	z M25,6.8v10.1H14.5V3h6.7C23.3,3,25,4.7,25,6.8z M6.8,3h6.7v7.2H3V6.8C3,4.7,4.7,3,6.8,3z M3,21.2v-10h10.5V25H6.8
	C4.7,25,3,23.3,3,21.2z M21.2,25h-6.7v-7.1H25v3.3C25,23.3,23.3,25,21.2,25z"
      />
    </SvgIcon>
  );
};

export default React.memo(LayoutIcon);
