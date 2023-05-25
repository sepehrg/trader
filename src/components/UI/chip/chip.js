import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { default as MuiChip } from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Link from "../../../components/UI/Link/Link";
import CloseIcon from "../../../components/UI/icons/close";

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    color: theme.palette.text.secondary,
    backgroundColor: `${theme.palette.text.secondary}22`,
    margin: "0 3px",
    fontSize: 12,
    width: "auto",
    height: 32,
    alignItems: "center",
    borderRadius: 50,
    padding: "0 12px",
    flexWrap: "nowrap",
  },
  CloseIcon: {
    width: 18,
    height: 18,
    fill: theme.palette.border.secondary,
    backgroundColor: `${theme.palette.text.secondary}77`,
    padding: 3,
    borderRadius: 50,
    marginLeft: 7,
    marginRight: -3,
    strokeWidth: 1,
    stroke: theme.palette.border.secondary,
    "&:hover": {
      backgroundColor: `${theme.palette.text.secondary}bb`,
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    whiteSpace: "nowrap",
  },
}));

const Chip = (props) => {
  const classes = useStyles();

  return (
    // <MuiChip
    //   label={props.label}
    //   onClick={props.onClick}
    //   onDelete={props.onDelete}
    //   // deleteIcon={<DoneIcon />}
    //   classes={{ root: classes.chipRoot }}
    // />
    <Grid container className={classes.chipRoot}>
      {props.onDelete && (
        <Grid item>
          <Link onClick={props.onDelete}>
            <CloseIcon className={classes.CloseIcon} />
          </Link>
        </Grid>
      )}
      <Link onClick={props.onClick} className={classes.label}>
        <Grid item>{props.label}</Grid>
      </Link>
    </Grid>
  );
};

export default Chip;
