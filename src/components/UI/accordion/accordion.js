import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { default as MuiAccordion } from "@material-ui/core/Accordion";
import style from "../../../shared/style";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  accordionRoot: {
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: 0,
    width: "100%",
    "&$accordionExpanded": {
      margin: 0,
    },
  },
  accordionExpanded: {},
}));

const Accordion = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MuiAccordion
      onChange={props.onChange}
      classes={{
        root: classes.accordionRoot,
        expanded: classes.accordionExpanded,
      }}
    >
      {props.children}
    </MuiAccordion>
  );
};
export default Accordion;
