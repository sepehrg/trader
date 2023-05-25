import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { default as MuiTreeView } from "@material-ui/lab/TreeView";
import useDevice from "../../../hooks/useDevice";
import CloseFolderIcon from "../icons/closeFolder";
import OpenFolderIcon from "../icons/openFolder";
import DashIcon from "../icons/dash";

const useStyles = makeStyles((theme) => ({
  tree: {
    flexGrow: 1,
    textAlign: "right",
    padding: "2px 0",
    fontSize: 13,
    overflowY: "auto",
    height: "100%",
    overflowX: "hidden",
  },
  treeViewRootMobile: {
    height: "100%",
  },
}));

const TreeView = (props) => {
  const classes = useStyles();
  const device = useDevice();

  return (
    <MuiTreeView
      defaultCollapseIcon={<OpenFolderIcon />}
      defaultExpandIcon={<CloseFolderIcon />}
      defaultEndIcon={device.isNotMobile && <DashIcon />}
      defaultExpanded={props.defaultExpanded}
      className={clsx(device.isNotMobile && classes.tree)}
      classes={{ root: device.isMobile && classes.treeViewRootMobile }}
    >
      {props.children}
    </MuiTreeView>
  );
};

export default TreeView;
