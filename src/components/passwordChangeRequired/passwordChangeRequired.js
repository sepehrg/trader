import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../UI/dialog/dialog";
import { connect } from "react-redux";
import { addDisplayedModal, isModalDisplayed } from "../../shared/utility";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  message: {
    padding: "0 20px",
  },
  acceptBtn: {
    color: theme.palette.color.blue,
    borderColor: theme.palette.color.blue,
  },
  cancelBtn: {
    color: theme.palette.color.red,
    borderColor: theme.palette.color.red,
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    fontSize: 16,
    height: 48,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    fontSize: 16,
    height: 48,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
}));

const PasswordChangeRequired = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [dialogOpen, setDialogOpen] = useState(props.open || false);

  useEffect(() => {
    if (props.user && props.user.UserShouldChangePassword) {
      if (!isModalDisplayed("passwordChangeModal")) {
        setDialogOpen(true);
        addDisplayedModal("passwordChangeModal");
      } else {
        setDialogOpen(false);
      }
    }
  }, [props.user]);

  const closeDialog = () => {
    setDialogOpen(false);
    props.onClose();
  };

  const openProfileModalHandler = () => {
    closeDialog();
    props.onOpenProfileModal();
  };

  const dialogActions = [
    {
      title: "تایید",
      onClick: openProfileModalHandler,
      className: clsx(
        device.isNotMobile ? classes.acceptBtn : classes.acceptBtnMobile
      ),
    },
    {
      title: "بعدا...",
      onClick: closeDialog,
      className: clsx(
        device.isNotMobile ? classes.cancelBtn : classes.cancelBtnMobile
      ),
    },
  ];

  return (
    <Dialog
      title="رمز عبور"
      open={dialogOpen}
      onClose={closeDialog}
      dialogActions={dialogActions}
    >
      <p className={classes.message}>
        رمز عبور شما منقضی شده است لطفا نسبت به تغییر آن اقدام نمایید
      </p>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
  };
};

export default connect(mapStateToProps)(PasswordChangeRequired);
