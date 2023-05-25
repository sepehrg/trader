import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useTheme, ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectMenu: {
    fontSize: 13,
    paddingTop: 13,
    paddingBottom: 6,
    backgroundColor: theme.palette.background.paper,
  },
  marginDense: {
    marginRight: -8,
    color: "red",
  },
  outlined: {
    backgroundColor: theme.palette.border.primary,
    borderColor: theme.palette.border.primary,
    fontSize: 12,
    padding: "4px 6px",
    borderRadius: 5,
  },
  menuItemRoot: {
    fontSize: "13px",
  },
  formLabelFocused: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.background.default} !important`,
  },
  selectIcon: {
    color: theme.palette.text.secondary,
  },
  rootLabel: {
    backgroundColor: theme.palette.border.bar,
  },
  outlinedRoot: {
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

  rootLabelMobile: {
    position: "relative",
    transform: "none !important",
    margin: "5px 0 3px 0 !important",
    fontSize: 12,
  },
  selectMenuMobile: {
    height: 42,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  formLabelFocusedMobile: {
    backgroundColor: "none",
    color: `${theme.palette.text.secondary} !important`,
  },
  menuItemRootMobile: {
    fontSize: 16,
  },
  selectIconMobile: {
    width: 34,
    height: 34,
    top: 6,
    left: 2,
    color: `${theme.palette.text.secondary}77`,
  },

  notchedOutlineMobile: {
    borderRadius: 8,
  },
  outlinedRootMobile: {
    borderRadius: 8,
  },
}));

const DropDownList = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = { ...useTheme(), direction: "rtl" };

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant="outlined" className={classes.formControl}>
        {props.label && (
          <InputLabel
            classes={{
              root: clsx(
                device.isNotMobile ? classes.rootLabel : classes.rootLabelMobile
              ),
              marginDense: classes.marginDense,
              outlined: clsx(
                device.isNotMobile && classes.outlined,
                props.inputLabelOutlined
              ),
              focused: device.isNotMobile
                ? classes.formLabelFocused
                : classes.formLabelFocusedMobile,
            }}
            shrink={true}
            className={classes.input}
            id={`label-${props.id}`}
            // InputLabelProps={{ shrink: true }}
          >
            {props.label}
          </InputLabel>
        )}
        <Select
          required={props.required}
          labelId={`label-${props.id}`}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label={props.label}
          className={props.className}
          classes={{
            selectMenu: clsx(
              props.selectMenuClassName,
              device.isNotMobile ? classes.selectMenu : classes.selectMenuMobile
            ),
            icon: clsx(
              classes.selectIcon,
              device.isMobile && classes.selectIconMobile,
              props.selectIconClassName
            ),
          }}
          input={
            <OutlinedInput
              classes={{
                root: clsx(
                  classes.outlinedRoot,
                  device.isMobile && classes.outlinedRootMobile
                ),
                notchedOutline: clsx(
                  classes.notchedOutline,
                  device.isMobile && classes.notchedOutlineMobile
                ),
                focused: classes.focused,
              }}
            />
          }
        >
          {props.options &&
            props.options.map((item) => {
              return (
                <MenuItem
                  key={item[props.valueField]}
                  value={item[props.valueField]}
                  classes={{
                    root: device.isNotMobile
                      ? classes.menuItemRoot
                      : classes.menuItemRootMobile,
                  }}
                >
                  {item[props.textField]}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
});

export default DropDownList;
