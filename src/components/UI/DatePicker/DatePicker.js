import React from "react";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import {
  DatePicker as MuiDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import CustomToolbar from "./CustomToolbar";
import { useTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import CalendarIcon from "../../UI/icons/calendar";
import useDevice from "../../../hooks/useDevice";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const useStyles = makeStyles((theme) => ({
  root: {},
  input: {
    padding: 0,
  },
  rootLabel: {
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 5,
    whiteSpace: "nowrap",
    backgroundColor: theme.palette.border.bar,
  },
  formLabelFocused: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.background.default} !important`,
  },
  outlined: {
    "&$marginDense": {
      transform: "translate(-14px, -6px) scale(0.75)",
      marginRight: -5,
    },
    "&$shrink": {
      transform: "translate(-14px, -6px) scale(0.75)",
      marginRight: -5,
    },
  },
  shrink: {},
  marginDense: {},
  outlinedRoot: {
    height: 38,
    backgroundColor: theme.palette.background.paper,
    fontSize: 13,
    padding: "13px 14px 6px 14px",
    "&:hover $notchedOutline": {
      borderColor: theme.palette.border.bar,
    },
    "&$focused $notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  notchedOutline: {
    borderColor: theme.palette.border.bar,
  },
  focused: {},
  calendarIcon: {
    width: 22,
    height: 22,
    position: "absolute",
    left: 8,
    top: 8,
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },

  inputMobile: {
    height: 44,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
  },
  rootLabelMobile: {
    position: "relative",
    transform: "none !important",
    margin: "5px 0 3px 0 !important",
    fontSize: 12,
  },
  formLabelFocusedMobile: {
    backgroundColor: "none",
    color: `${theme.palette.text.secondary} !important`,
  },
  calendarIconMobile: {
    height: 26,
    width: 26,
  },
}));

const DatePicker = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = { ...useTheme(), direction: "rtl" };

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <MuiDatePicker
          fullWidth
          name={props.name}
          label={props.label}
          variant="inline"
          inputVariant="outlined"
          clearable="true"
          autoOk
          labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          ToolbarComponent={CustomToolbar}
          inputProps={{
            ...props.inputProps,
            className: clsx(props.inputClassName, classes.input),
            outlined: classes.outlined,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarIcon
                  className={clsx(
                    classes.calendarIcon,
                    device.isMobile && classes.calendarIconMobile
                  )}
                />
              </InputAdornment>
            ),
            classes: {
              root: clsx(
                classes.outlinedRoot,
                device.isMobile && classes.inputMobile
              ),
              notchedOutline: classes.notchedOutline,
              focused: classes.focused,
            },
          }}
          classes={{
            root: classes.root,
            // outlined: classes.outlined
          }}
          InputLabelProps={{
            classes: {
              root: clsx(
                device.isNotMobile ? classes.rootLabel : classes.rootLabelMobile
              ),
              focused: device.isNotMobile
                ? classes.formLabelFocused
                : classes.formLabelFocusedMobile,
              marginDense: classes.marginDense,
              shrink: classes.shrink,
              outlined: classes.outlined,
            },
          }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
});

export default DatePicker;
