import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DeleteIcon from "../../icons/delete";
import ReloadIcon from "../../icons/reload";
import CopyIcon from "../../icons/copy";
import CheckboxIcon from "../../icons/checkbox";
import Link from "../../Link/Link";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  toolbarBtn: {
    margin: `auto 3px`,
    cursor: "pointer",
    "&:hover $toolbarIcon": {
      fill: theme.palette.primary.main,
    },
    "&:hover $toolbarIconDelete": {
      fill: theme.palette.color.red,
    },
  },
  toolbarIconActive: {
    fill: theme.palette.primary.main,
  },
  toolbarIcon: {
    height: 20,
    width: 20,
  },
  toolbarIconDelete: {
    height: 20,
    width: 20,
  },
  mainTools: {
    borderRight: `2px solid ${theme.palette.border.bar}`,
    paddingRight: theme.spacing(4),
  },
  toggledTools: {
    width: 0,
    overflow: "hidden",
    transition: "0.3s",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    float: "left",
  },
  showToggledTools: {
    width: "100%",
  },
}));

const TableControls = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [showOptions, setShowOptions] = useState(false);

  const selectChangeHandler = () => {
    setShowOptions(!showOptions);
    props.onSelectChange(!showOptions);
  };

  return (
    <>
      {props.selectedTab === 0 && (
        <Grid item>
          <Grid
            container
            className={
              showOptions
                ? clsx(classes.toggledTools, classes.showToggledTools)
                : classes.toggledTools
            }
          >
            <Grid item>
              <Link
                title="حذف گروهی"
                component={<DeleteIcon className={classes.toolbarIconDelete} />}
                tooltipPlacement="top"
                onClick={props.onDelete}
                className={classes.toolbarBtn}
                tooltipColor={theme.palette.color.red}
              />
            </Grid>
            <Grid item>
              <Link
                title="کپی گروهی"
                component={<CopyIcon className={classes.toolbarIcon} />}
                tooltipPlacement="top"
                onClick={() => {}}
                className={classes.toolbarBtn}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item className={classes.mainTools}>
        <Grid container>
          {props.selectedTab === 0 && (
            <Grid item>
              <Link
                title="انتخاب"
                component={
                  <CheckboxIcon
                    className={clsx(
                      classes.toolbarIcon,
                      showOptions && classes.toolbarIconActive
                    )}
                  />
                }
                tooltipPlacement="top"
                className={classes.toolbarBtn}
                onClick={selectChangeHandler}
              />
            </Grid>
          )}
          <Grid item>
            <Link
              title="بارگزاری مجدد"
              component={<ReloadIcon className={classes.toolbarIcon} />}
              tooltipPlacement="top"
              onClick={props.onRefresh}
              className={classes.toolbarBtn}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TableControls;
