import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const ExpandMoreIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M10.2,15.7c-0.4-0.4-0.7-1-0.7-1.7c0-0.6,0.2-1.3,0.7-1.7L19.6,3L18.7,2l-9.4,9.3C8.6,12.1,8.2,13,8.2,14
	c0,1,0.4,1.9,1.1,2.6l9.4,9.4l0.9-0.9L10.2,15.7z"
      />
    </SvgIcon>
  );
};

export default React.memo(ExpandMoreIcon);
