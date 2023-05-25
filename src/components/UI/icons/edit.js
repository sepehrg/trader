import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const EditIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M18.6,1.8L2,18.4l0.4,7.3L9.6,26L26.2,9.4L18.6,1.8z M24.8,9.4l-4.5,4.5l-6.2-6.2l4.5-4.5L24.8,9.4z M9.2,25l-5.9-0.3
	L3,18.8L13.4,8.4l6.2,6.2L9.2,25z"
      />
    </SvgIcon>
  );
};

export default React.memo(EditIcon);
