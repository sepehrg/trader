import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const EngFlag = (props) => {
  return (
    <SvgIcon viewBox="0 0 766 512" {...props}>
      <g>
	<rect style={{fill: "#F0F0F0"}} y="1" width="766" height="510"/>
	<path style={{fill: "#0052B4"}} d="M198.3,511H283v-84.4L198.3,511z M483,511h84.7L483,426.6V511z M553.6,356l133.3,133.1L709,511
		h57V356H553.6z M686.8,22.9L553.6,156h199.2H766V1h-57L686.8,22.9z M483,1v84.5L567.7,1H483z M283,85.5V1h-84.7L283,85.5z
		 M212.4,156L79.2,22.9L57,1H0v155h13.2H212.4z M212.4,356H13.2H0v155h57l22.2-21.9L212.4,356z"/>
	<path style={{fill: "#D80027"}} d="M482.9,356l155.4,155h47.1L530,356H482.9z M433,206V1H333v205H0v34.8V306h333v205h100V306h333
		v-65.2V206H433z M638.3,1h-47.1L483,109v47.1l0,0L638.3,1z M80.6,1l9.1,8.9L236,156h47.1l0,0L127.7,1H80.6z M283,355.9L283,355.9
		L127.7,511h47.1L283,403V355.9z"/>
</g>
    </SvgIcon>
  );
};

export default React.memo(EngFlag);
