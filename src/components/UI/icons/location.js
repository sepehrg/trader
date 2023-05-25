import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const LocationIcon = (props) => {
  return (
    <SvgIcon viewBox="0 9 512 494" {...props}>
      <g>
        <path d="M510,38L273.6,492.4c-3.5,6.7-9.9,10.6-17.6,10.6c-7.5,0-14-3.9-17.6-10.6L2,38c-3.9-7.5-2.8-16.1,2.8-22.2c5.6-6.3,14-8.4,21.8-5.4L220.5,85c23.7,9.2,47.2,9.2,71,0l193.8-74.7c7.8-3,16.2-0.9,21.9,5.4C512.8,21.9,513.9,30.5,510,38L510,38z" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(LocationIcon);
