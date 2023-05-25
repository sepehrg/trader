import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const AcceptIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M14,2C7.4,2,2,7.4,2,14c0,6.6,5.4,12,12,12c6.6,0,12-5.4,12-12C26,7.4,20.6,2,14,2z M14,25C7.9,25,3,20.1,3,14S7.9,3,14,3
		c6.1,0,11,4.9,11,11S20.1,25,14,25z"
      />
      <polygon points="11.9,18.1 8.3,14.5 7.6,15.2 11.9,19.5 20.4,11 19.7,10.3 " />
    </SvgIcon>
  );
};

export default React.memo(AcceptIcon);
