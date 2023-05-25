import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { default as MuiCheckbox } from "@material-ui/core/Checkbox";
import TickIcon from "../icons/tick";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  checkboxRoot: {
    color: theme.palette.text.secondary,
  },
  checkboxColorSecondary: {
    "&$checkboxChecked": {
      color: theme.palette.primary.main,
    },
  },
  checkboxChecked: {},
  checkboxIcon: {
    width: 18,
    height: 18,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
  },
  uncheckedIcon: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedTickIcon: {
    // fill: theme.palette.text.primary,
    fill: "#FFF",
    width: 14,
    height: 14,
    margin: "auto",
  },
  validation: {
    color: theme.palette.color.red,
    marginRight: 15,
  },

  checkboxIconMobile: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
}));

const Checkbox = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();

  const icon = (
    <div
      className={clsx(
        classes.checkboxIcon,
        classes.uncheckedIcon,
        device.isMobile && classes.checkboxIconMobile
      )}
    ></div>
  );

  const checkedIcon = (
    <div
      className={clsx(
        classes.checkboxIcon,
        classes.checkedIcon,
        device.isMobile && classes.checkboxIconMobile
      )}
    >
      <TickIcon className={classes.checkedTickIcon}></TickIcon>
    </div>
  );

  const checkbox = (
    <MuiCheckbox
      inputRef={ref}
      name={props.name}
      checked={props.checked}
      onChange={props.onChange}
      icon={icon}
      checkedIcon={checkedIcon}
      classes={{
        root: classes.checkboxRoot,
        colorSecondary: classes.checkboxColorSecondary,
        checked: classes.checkboxChecked,
      }}
    />
  );

  const labeledCheckbox = props.label ? (
    <>
      <FormControlLabel
        control={checkbox}
        classes={{ label: props.labelClassName }}
        className={props.className}
        label={props.label}
      />
      {props.error && (
        <div className={classes.validation}>{props.helperText}</div>
      )}
    </>
  ) : (
    checkbox
  );

  return labeledCheckbox;
});

export default Checkbox;
