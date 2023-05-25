import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const closeFolderIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M23.2,7.6h-7.7c-0.4,0-0.7-0.1-1-0.4l-2.4-2.5c-0.5-0.5-1.2-0.8-2-0.8H4.8C3.3,3.9,2,5.1,2,6.7v14.6c0,1.6,1.3,2.8,2.8,2.8
	h18.4c1.6,0,2.8-1.3,2.8-2.8V10.4C26,8.9,24.7,7.6,23.2,7.6z M25,21.3c0,1-0.8,1.8-1.8,1.8H4.8c-1,0-1.8-0.8-1.8-1.8V6.7
	c0-1,0.8-1.8,1.8-1.8h5.2c0.5,0,1,0.2,1.3,0.5l2.4,2.5c0.4,0.4,1,0.7,1.7,0.7h7.7c1,0,1.8,0.8,1.8,1.8V21.3z"
      />
    </SvgIcon>
  );
};

export default React.memo(closeFolderIcon);
