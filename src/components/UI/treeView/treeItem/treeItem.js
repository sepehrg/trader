import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { default as MuiTreeItem } from "@material-ui/lab/TreeItem";
import useDevice from "../../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  treeParent: {
    padding: "10px 0",
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  treeParentLabel: {
    fontSize: 13,
  },
  label: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  rootTreeItem: {
    "&$selected > $content $label": {
      backgroundColor: "transparent",
      color: "#22A7F2",
    },
    "&$selected > $content $label:hover, &$selected:focus > $content $label": {
      backgroundColor: "transparent",
    },
    "&:focus > $content $label": {
      backgroundColor: "transparent",
    },
  },
  selected: {},
  content: {
    maxHeight: 20,
  },
  treeItemContentMobile: {
    minHeight: 48,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  group: {
    marginLeft: 0,
    marginTop: 14,
  },
  treeItemGroupMobile: {
    backgroundColor: theme.palette.border.secondary,
    marginLeft: 0,
  },
  iconContainer: {
    marginRight: 0,
    marginLeft: 4,
    width: 25,
  },
  treeItemIconContainerMobile: {
    width: "auto",
    marginLeft: 5,
  },
}));

const TreeItem = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <MuiTreeItem
      nodeId={props.nodeId}
      label={props.label}
      onClick={props.onClick}
      className={clsx(device.isNotMobile && classes.treeParent)}
      classes={{
        label: clsx(
          device.isNotMobile && classes.treeParentLabel,
          device.isNotMobile && classes.label
        ),
        root: clsx(device.isNotMobile && classes.rootTreeItem),
        selected: clsx(device.isNotMobile && classes.selected),
        content: clsx(
          device.isNotMobile ? classes.content : classes.treeItemContentMobile
        ),
        group: clsx(
          device.isNotMobile ? classes.group : classes.treeItemGroupMobile
        ),
        iconContainer: clsx(
          device.isNotMobile
            ? classes.iconContainer
            : classes.treeItemIconContainerMobile
        ),
      }}
    >
      {props.children}
    </MuiTreeItem>
  );
};

export default TreeItem;
