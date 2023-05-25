import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../../UI/Link/Link";
import DeleteIcon from "../../UI/icons/delete";
import EditIcon from "../../UI/icons/edit";
import clsx from "clsx";
import TreeItem from "@material-ui/lab/TreeItem";
import Input from "../../UI/Input/Input";
import AcceptIcon from "../../UI/icons/accept";
import PlusIcon from "../../UI/icons/plus";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 20,
    fontSize: 12,
    padding: `${theme.spacing(4)}px 0`,
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&:hover $mainBtns": {
      visibility: "visible",
      left: "0px",
    },
  },
  main: {
    minHeight: 20,
  },
  label: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: 13,
  },
  hotListItem: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  name: {},
  btns: {
    flexWrap: "nowrap",
  },
  btn: {
    "&:hover $iconBtnEdit": {
      fill: theme.palette.primary.main,
    },
    "&:hover $iconBtnDelete": {
      fill: theme.palette.color.red,
    },
  },
  iconBtn: {
    height: 20,
  },
  iconBtnEdit: {},
  iconBtnDelete: {},
  mainBtns: {
    visibility: "visible",
    position: "absolute",
    left: "-60px",
    transition: "0.3s",
    backgroundColor: theme.palette.background.paper,
  },
  acceptBtn: {
    marginLeft: theme.spacing(4),
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.color.green,
    },
  },
  cancelBtn: {
    transform: "rotate(45deg)",
    marginLeft: theme.spacing(4),
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },

  rootMobile: {
    minHeight: 42,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
  },
  mainBtnsMobile: {
    position: "absolute",
    left: 10,
    top: -5,
    backgroundColor: theme.palette.border.secondary,
  },
  iconBtnEditMobile: {
    height: 26,
    width: 26,
    fill: theme.palette.color.blue,
  },
  iconBtnDeleteMobile: {
    height: 26,
    width: 26,
    fill: theme.palette.color.red,
  },
}));

const HotListTreeItem = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.label);

  const editHandler = () => {
    props.onEdit(title);
    setEditMode(false);
  };

  return (
    <TreeItem
      label={
        <div>
          <Grid container className={classes.main}>
            <Grid item className={classes.label}>
              {!editMode ? (
                <Link onClick={props.onClick}>{props.label}</Link>
              ) : (
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  endAdornment={
                    <>
                      <Link onClick={editHandler}>
                        <AcceptIcon className={classes.acceptBtn} />
                      </Link>
                      <Link onClick={() => setEditMode(false)}>
                        <PlusIcon className={classes.cancelBtn} />
                      </Link>
                    </>
                  }
                ></Input>
              )}
            </Grid>
            {props.editable && !editMode && (
              <Grid
                item
                className={clsx(
                  device.isNotMobile ? classes.mainBtns : classes.mainBtnsMobile
                )}
              >
                <Grid
                  container
                  className={classes.btns}
                  spacing={device.isMobile ? 4 : 0}
                >
                  <Grid item>
                    <Link
                      tooltipPlacement="bottom"
                      title="ویرایش نام دیده‌بان"
                      onClick={() => setEditMode(true)}
                      className={classes.btn}
                    >
                      <EditIcon
                        className={clsx(
                          device.isNotMobile
                            ? clsx(classes.iconBtn, classes.iconBtnEdit)
                            : classes.iconBtnEditMobile
                        )}
                      ></EditIcon>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      tooltipPlacement="bottom"
                      title="حذف دیده‌بان"
                      onClick={props.onDelete}
                      className={clsx(device.isNotMobile && classes.btn)}
                      tooltipColor={theme.palette.color.red}
                    >
                      <DeleteIcon
                        className={clsx(
                          device.isNotMobile
                            ? clsx(classes.iconBtn, classes.iconBtnDelete)
                            : classes.iconBtnDeleteMobile
                        )}
                      ></DeleteIcon>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </div>
      }
      nodeId={props.nodeId}
      className={clsx(device.isNotMobile ? classes.root : classes.rootMobile)}
      classes={props.classes}
    />
  );
};

export default HotListTreeItem;
