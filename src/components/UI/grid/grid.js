import React from "react";
import { default as MuiGrid } from "@material-ui/core/Grid";

const Grid = React.forwardRef((props, ref) => {
  return (
    <MuiGrid ref={ref} {...props}>
      {props.children}
    </MuiGrid>
  );
});

export default Grid;
