import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const FilterIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M11.3,25.5c-0.1,0-0.3,0-0.4-0.1c-0.2-0.1-0.3-0.3-0.3-0.6v-9.6l-8-7.3C2.6,7.8,2.5,7.6,2.5,7.4V3.2
			c0-0.4,0.3-0.7,0.7-0.7h21.7c0.4,0,0.7,0.3,0.7,0.7v4.3c0,0.2-0.1,0.4-0.2,0.5l-8,7.3v7.3c0,0.3-0.2,0.5-0.4,0.6l-5.3,2.3
			C11.5,25.5,11.4,25.5,11.3,25.5z M3.8,7.2l8,7.3c0.1,0.1,0.2,0.3,0.2,0.5v8.9l4-1.8v-7.1c0-0.2,0.1-0.4,0.2-0.5l8-7.3V3.8H3.8V7.2
			z"
      />
    </SvgIcon>
  );
};

export default React.memo(FilterIcon);
