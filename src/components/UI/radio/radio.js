import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { default as MuiRadio } from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  radio: {
    "&$colorSecondary": {
      "&$checked": {
        color: theme.palette.primary.main,
      },
    },
  },
  checked: {},
  colorSecondary: {},
  formControlLabel: {
    fontSize: 11,
    color: theme.palette.text.primary,
  },
  formControlLabelMobile: {
    fontSize: 12,
    width: "100%",
    color: theme.palette.text.primary,
  },
  formControlLabelRootMobile: {
    border: `1px solid ${theme.palette.border.primary}`,
    borderRadius: 8,
    minWidth: 95,
    margin: 0,
    // marginLeft: 15,
  },
}));

const Radio = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <RadioGroup
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      row={props.row}
    >
      {(props.options || []).map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          classes={{
            label: clsx(
              classes.formControlLabel,
              device.isMobile && classes.formControlLabelMobile
            ),
            root: clsx(
              device.isMobile && classes.formControlLabelRootMobile,
              props.formControlLabelRootClassName
            ),
          }}
          control={
            <MuiRadio
              classes={{
                root: classes.radio,
                colorSecondary: classes.colorSecondary,
                checked: classes.checked,
              }}
              size={device.isNotMobile ? "small" : "medium"}
            />
          }
          label={option.label}
          disabled={option.disabled}
        />
      ))}
    </RadioGroup>
  );
};

export default Radio;
