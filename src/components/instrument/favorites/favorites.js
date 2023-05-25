import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import FavoriteIcon from "../../UI/icons/favorite";
import Dialog from "../../UI/dialog/dialog";
import DropDownList from "../../UI/DropDownList/DropDownList";
import Link from "../../UI/Link/Link";
import clsx from "clsx";
import TseBofService from "../../../services/tseBofService";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  icon: {
    stroke: theme.palette.icon.primary,
    fill: "none",
    "&:hover": {
      stroke: theme.palette.primary.main,
    },
  },
  inputLabel: {
    transform: "translate(-14px, 8px) scale(1)",
  },
  active: {
    stroke: "none",
    fill: theme.palette.primary.main,
  },
  dialogContent: {
    flexDirection: "column",
    padding: 16,
  },
  acceptBtn: {
    color: theme.palette.color.blue,
    borderColor: theme.palette.color.blue,
  },
  cancelBtn: {
    color: theme.palette.color.red,
    borderColor: theme.palette.color.red,
  },
}));

let isSubscribed = true;

const Favorites = (props) => {
  const classes = useStyles();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [userWatchlists, setUserWatchlists] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    getUserWatchList();
    return () => (isSubscribed = false);
  }, []);

  const getUserWatchList = () => {
    TseBofService.getUserWatchList((status, data) => {
      if (status && isSubscribed) setUserWatchlists(data);
    });
  };

  const submitHandler = () => {
    if (!value) return;
    const data = {
      UserWatchListId: value,
      Isin: props.isin,
    };
    TseBofService.addUserWatchListItem(data, (status, data) => {
      if (status) {
        close();
        props.notifySuccess("با موفقیت اضافه شد");
      } else {
        props.notifyError(data.Message);
      }
    });
  };

  const close = () => {
    setFavoritesOpen(false);
    setValue("");
  };

  const dialogActions = [
    { title: "تایید", onClick: submitHandler, className: classes.acceptBtn },
    { title: "انصراف", onClick: close, className: classes.cancelBtn },
  ];

  return (
    <>
      <Link
        tooltipPlacement="bottom"
        title="افزودن به علاقه‌مندی‌ها"
        onClick={() => setFavoritesOpen(true)}
        className={props.className}
      >
        <FavoriteIcon
          className={clsx(
            classes.icon,
            props.watchlistInstruments?.some((i) => i.Isin === props.isin) &&
              classes.active
          )}
        ></FavoriteIcon>
      </Link>

      <Dialog
        title="انتخاب دیده بان"
        open={favoritesOpen}
        onClose={close}
        dialogActions={dialogActions}
      >
        <Grid container className={classes.dialogContent}>
          <Grid item>
            <DropDownList
              label="دیده بان"
              textField="Title"
              valueField="Id"
              // className={classes.dropdownlist}
              options={userWatchlists}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              inputLabelOutlined={classes.inputLabel}
            ></DropDownList>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    watchlistInstruments: state.app.watchlistInstruments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(Favorites)
);
