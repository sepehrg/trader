import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { default as ReactTour } from "reactour";

const useStyles = makeStyles(() => ({
  tour: {
    direction: "ltr",
    color: `#333 !important`,
    borderRadius: `8px !important`,
  },
}));

const Tour = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <ReactTour
      steps={props.steps}
      isOpen={props.isOpen}
      onRequestClose={() => props.onRequestClose(false)}
      accentColor={theme.palette.primary.main}
      className={classes.tour}
      // showCloseButton={false}
    />
  );
};
export default Tour;
