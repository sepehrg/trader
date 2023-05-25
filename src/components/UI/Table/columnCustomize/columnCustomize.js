import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import ColumnIcon from "../../icons/column";
import Tooltip from "../../Tooltip/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import TickIcon from "../../icons/tick";

const useStyles = makeStyles((theme) => ({
  root: {},
  dropDownMenu: {
    zIndex: "300",
    width: 130,
    marginTop: 5,
  },
  dropDownMenu2: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: theme.palette.border.primary,
  },
  menuItem: {
    padding: `${theme.spacing(4)}px ${theme.spacing(4)}px`,
    fontSize: 10,
    transition: "0.3s",
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.background.default}`,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuItemIcon: {
    height: 22,
    marginLeft: theme.spacing(2),
    fill: theme.palette.text.primary,
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  checkbox: {
    padding: `0 0 0 4px`,
  },
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
  uncheckedIcon: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
  },
  checkedTickIcon: {
    fill: theme.palette.text.primary,
    width: 14,
    height: 14,
    // verticalAlign: "middle",
    margin: "auto",
  },
}));

const ColumnCustomize = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const uncheckedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.uncheckedIcon)}></div>
  );
  const checkedIcon = (
    <div className={clsx(classes.checkboxIcon, classes.checkedIcon)}>
      <TickIcon className={classes.checkedTickIcon}></TickIcon>
    </div>
  );

  return (
    <div>
      <Tooltip
        placement="top"
        title="نمایش ستون"
        // className={classes.toolbarBtn}
      >
        <Grid
          container
          onClick={handleToggle}
          className={props.toolbarBtn}
          ref={anchorRef}
        >
          {<ColumnIcon className={props.toolbarIcon} />}
        </Grid>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.dropDownMenu}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.dropDownMenu2}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  classes={{ padding: classes.padding }}
                >
                  {props.schema.columns.map((col) => (
                    <MenuItem
                      // onClick={handleClose}
                      className={classes.menuItem}
                    >
                      <Checkbox
                        icon={uncheckedIcon}
                        checkedIcon={checkedIcon}
                        classes={{
                          root: classes.checkboxRoot,
                          colorSecondary: classes.checkboxColorSecondary,
                          checked: classes.checkboxChecked,
                          colorPrimary: classes.checkboxColorPrimary,
                        }}
                        className={classes.checkbox}
                        checked
                      />
                      {col.title}
                    </MenuItem>
                  ))}
                  <MenuItem className={classes.menuItem}>
                    <Checkbox
                      icon={uncheckedIcon}
                      checkedIcon={checkedIcon}
                      classes={{
                        root: classes.checkboxRoot,
                        colorSecondary: classes.checkboxColorSecondary,
                        checked: classes.checkboxChecked,
                        colorPrimary: classes.checkboxColorPrimary,
                      }}
                      className={classes.checkbox}
                      checked
                    />
                    عملیات
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ColumnCustomize;
