import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const PlusIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon points="25.5,13 14.9,13 14.9,2.5 12.9,2.5 12.9,13 2.5,13 2.5,15 12.9,15 12.9,25.5 14.9,25.5 14.9,15 25.5,15 " />
    </SvgIcon>
  );
};

export default React.memo(PlusIcon);
