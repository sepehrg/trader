import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const SearchIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M18.6,17.9c1.5-1.7,2.5-3.9,2.5-6.4C21,6.3,16.8,2,11.5,2S2,6.3,2,11.5S6.3,21,11.5,21c2.4,0,4.7-0.9,6.4-2.5l7.3,7.3
	l0.7-0.7L18.6,17.9z M11.5,20C6.8,20,3,16.2,3,11.5S6.8,3,11.5,3S20,6.8,20,11.5S16.2,20,11.5,20z"
      />
    </SvgIcon>
  );
};

export default React.memo(SearchIcon);
