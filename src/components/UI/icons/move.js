import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const MoveIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <polygon
        points="22.5,9.5 21,11 23.1,13 15,13 15,4.9 17,7 18.5,5.5 14,1 9.5,5.5 11,7 13,4.9 13,13 4.9,13 7,11 5.5,9.5 1,14 
	5.5,18.5 7,17 4.9,15 13,15 13,23.1 11,21 9.5,22.5 14,27 18.5,22.5 17,21 15,23.1 15,15 23.1,15 21,17 22.5,18.5 27,14 "
      />
    </SvgIcon>
  );
};

export default React.memo(MoveIcon);
