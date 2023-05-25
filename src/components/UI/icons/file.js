import React from "react";
import SvgIcon from "../SvgIcon/SvgIcon";

const FileIcon = (props) => {
  return (
    <SvgIcon viewBox="-127 0 512 512" {...props}>
      <g>
        <path d="M-32.1,19h244.6l104.6,104.6v322.5c0,14.7-12,26.9-26.9,26.9H-32.2c-14.7,0-26.9-12-26.9-26.9V45.9C-58.9,31-46.8,19-32.1,19L-32.1,19z" />
        <path d="M183.6,19h28.9l104.6,104.6v30.5H195.2c-6.4,0-11.6-5.3-11.6-11.6V19z" />
      </g>
    </SvgIcon>
  );
};

export default React.memo(FileIcon);
