import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as MuiAccordionDetails } from "@material-ui/core/AccordionDetails";
import style from "../../../../shared/style";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  accordionDetails: {
    backgroundColor: (props) =>
      !props.widget
        ? theme.palette.background.box
        : theme.palette.background.default,
    borderRadius: "5px",
    maxHeight: 290,
    overflowY: "scroll",
  },
}));

const AccordionDetails = (props) => {
  const classes = useStyles(props);

  return (
    <MuiAccordionDetails
      classes={{
        root: clsx(classes.accordionDetails, props.detailsClassName),
      }}
      className={classes.scrollbarY}
    >
      {props.children}
    </MuiAccordionDetails>
  );
};
export default AccordionDetails;
