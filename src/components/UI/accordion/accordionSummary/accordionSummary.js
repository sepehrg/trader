import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { default as MuiAccordionSummary } from "@material-ui/core/AccordionSummary";
import style from "../../../../shared/style";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  contentSummary: {
    margin: 0,
    width: "100%",
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {},
  rootSummary: {
    flexDirection: "column",
  },
  expandIcon: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    padding: 0,
    transform: "none",
    // marginBottom: -10,
    "&$expandedNotRotate": {
      transform: "none",
    },
  },
  expandMoreIcon: {
    "&:after": {
      content: "''",
      backgroundColor: `${theme.palette.text.secondary}33`,
      display: "flex",
      width: 32,
      height: 3,
      borderRadius: 50,
      marginBottom: 2,
    },
  },
  expandedNotRotate: {},
}));

const AccordionSummary = (props) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MuiAccordionSummary
      classes={{
        root: clsx(classes.rootSummary, props.summaryClassName),
        content: classes.contentSummary,
        expandIcon: classes.expandIcon,
        expanded: clsx(
          classes.expanded,
          !props.expandIcon && classes.expandedNotRotate
        ),
      }}
      expandIcon={
        props.expandIcon ? (
          props.expandIcon
        ) : (
          <div className={classes.expandMoreIcon} />
        )
      }
    >
      {props.children}
    </MuiAccordionSummary>
  );
};
export default AccordionSummary;
