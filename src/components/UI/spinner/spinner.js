import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = (props) => {
  return <CircularProgress size={props.size} className={props.className} />;
};
export default Spinner;
