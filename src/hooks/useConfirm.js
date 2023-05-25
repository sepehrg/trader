import React from "react";
import { useConfirm as useMaterialUIConfirm } from "material-ui-confirm";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "../components/UI/icons/warning";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    padding: "5px 10px",
    borderRadius: 8,
    height: 34,
    minWidth: 120,
    display: "flex",
    border: "none",
    backgroundColor: "transparent",
    marginRight: 10,
    transition: "0ms",
  },
  confirmBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "#FFF",
      border: "none",
    },
  },
  cancelBtn: {
    border: `1px solid ${theme.palette.border.primary}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
      color: "#FFF",
      border: "none",
    },
  },
  dialogRoot: {
    borderRadius: 10,
  },
  dialogTitle: {
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    paddingBottom: 10,
  },
  dialogDescription: {
    fontSize: 14,
  },
  warningIcon: {
    marginLeft: 10,
  },
}));

const useConfirm = () => {
  const classes = useStyles();
  const confirm = useMaterialUIConfirm();

  const customConfirm = (title, description, confirmation, cancellation) =>
    confirm({
      title: (
        <div className={classes.dialogTitle}>
          <WarningIcon className={classes.warningIcon} />
          {title}
        </div>
      ),
      description: (
        <span className={classes.dialogDescription}>{description}</span>
      ),
      confirmationText: confirmation,
      cancellationText: cancellation,
      dialogProps: {
        classes: {
          paper: classes.dialogRoot,
        },
      },
      confirmationButtonProps: {
        classes: { root: clsx(classes.confirmBtn, classes.actionBtn) },
      },
      cancellationButtonProps: {
        classes: { root: clsx(classes.cancelBtn, classes.actionBtn) },
      },
    });

  return customConfirm;
};

export default useConfirm;