import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const NeutralIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g>
        <polygon
          points="24.3,24.8 19.8,24.8 19.8,17.4 18.1,17.4 18.1,24.8 14.1,24.8 14.1,14.4 12.4,14.4 12.4,24.8 8.6,24.8 8.6,17.4 
		6.9,17.4 6.9,24.8 3.6,24.8 3.6,14.4 1.9,14.4 1.9,25.9 1.9,26.4 2.4,26.4 25.9,26.4 25.9,14.4 24.3,14.4 	"
        />
        <polygon points="20.7,10 21.9,11.2 26.7,6.4 21.9,1.6 20.7,2.8 23.5,5.5 2.1,5.5 2.1,7.3 23.5,7.3 	" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(NeutralIcon);
