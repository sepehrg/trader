import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DraftIcon from "../../UI/icons/draft";
import SentCoreIcon from "../../UI/icons/sentCore";
import QueueIcon from "../../UI/icons/queue";
import ErrorIcon from "../../UI/icons/error";
import CancelledIcon from "../../UI/icons/cancelled";
import TradeDoneIcon from "../../UI/icons/tradeDone";
import EraserIcon from "../../UI/icons/eraser";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: { justifyContent: "center" },
  status: {},
  icon: {
    width: 18,
    margin: `0px ${theme.spacing(2)}px`,
  },
  inStack: {
    fill: theme.palette.primary.main,
  },
  sendToCore: {
    fill: theme.palette.icon.primary,
  },
  sending: {
    fill: theme.palette.icon.primary,
    height: 17,
  },
  wait: {
    fill: theme.palette.icon.primary,
  },
  mistake: {
    fill: theme.palette.color.red,
    height: 13,
  },
  text: {
    margin: "auto",
  },
  grayIcon: {
    fill: theme.palette.icon.primary,
  },
  blueIcon: {
    fill: theme.palette.color.blue,
  },
  redIcon: {
    fill: theme.palette.color.red,
  },
  yellowIcon: {
    fill: theme.palette.color.yellow,
  },
  greenIcon: {
    fill: theme.palette.color.green,
  },

  iconMobile: {
    height: 15,
  },
}));

const TradeStatus = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = useTheme();

  let tradeState = "";
  let tradeIcon = "";
  let color = "";

  switch (props.status) {
    case 1:
      tradeState = "پیش‌نویس";
      tradeIcon = (
        <DraftIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></DraftIcon>
      );
      color = theme.palette.color.yellow;
      break;
    case 2:
      tradeState = "ذخیره شده";
      tradeIcon = (
        <SentCoreIcon
          className={clsx(
            classes.icon,
            classes.blueIcon,
            device.isMobile && classes.iconMobile
          )}
        ></SentCoreIcon>
      );
      color = theme.palette.color.blue;
      break;
    case 4:
      tradeState = "ارسال شده به هسته";
      tradeIcon = (
        <SentCoreIcon
          className={clsx(
            classes.icon,
            classes.blueIcon,
            device.isMobile && classes.iconMobile
          )}
        ></SentCoreIcon>
      );
      color = theme.palette.color.blue;
      break;
    case 8:
      tradeState = "در صف";
      tradeIcon = (
        <QueueIcon
          className={clsx(
            classes.icon,
            classes.blueIcon,
            device.isMobile && classes.iconMobile
          )}
        ></QueueIcon>
      );
      color = theme.palette.color.blue;
      break;
    case 16:
      tradeState = "خطا";
      tradeIcon = (
        <ErrorIcon
          className={clsx(
            classes.icon,
            classes.redIcon,
            device.isMobile && classes.iconMobile
          )}
        ></ErrorIcon>
      );
      color = theme.palette.color.red;
      break;
    case 32:
      tradeState = "لغو شده";
      tradeIcon = (
        <CancelledIcon
          className={clsx(
            classes.icon,
            classes.yellowIcon,
            device.isMobile && classes.iconMobile
          )}
        ></CancelledIcon>
      );
      color = theme.palette.color.yellow;
      break;
    case 64:
      tradeState = "قسمتی معامله شده";
      tradeIcon = (
        <QueueIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></QueueIcon>
      );
      color = theme.palette.color.yellow;
      break;
    case 128:
      tradeState = "معامله کامل";
      tradeIcon = (
        <TradeDoneIcon
          className={clsx(
            classes.icon,
            classes.greenIcon,
            device.isMobile && classes.iconMobile
          )}
        ></TradeDoneIcon>
      );
      color = theme.palette.color.green;
      break;
    case 256:
      tradeState = "حذف شده توسط هسته معاملات";
      tradeIcon = (
        <EraserIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></EraserIcon>
      );
      color = theme.palette.color.red;
      break;
    case 512:
      tradeState = "حذف معامله توسط ناظر";
      tradeIcon = (
        <EraserIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></EraserIcon>
      );
      color = theme.palette.color.red;
      break;
    case 1024:
      tradeState = "حذف برای اتمام اعتبار پایان روز";
      tradeIcon = (
        <EraserIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></EraserIcon>
      );
      color = theme.palette.color.red;
      break;
    case 2048:
      tradeState = "اجرا و حذف فوری";
      tradeIcon = (
        <EraserIcon
          className={clsx(
            classes.icon,
            classes.grayIcon,
            device.isMobile && classes.iconMobile
          )}
        ></EraserIcon>
      );
      color = theme.palette.color.blue;
      break;
    default:
      tradeState = "";
      tradeIcon = (
        <TradeDoneIcon
          className={clsx(
            classes.icon,
            classes.greenIcon,
            device.isMobile && classes.iconMobile
          )}
        ></TradeDoneIcon>
      );
      color = theme.palette.color.blue;
      break;
  }

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root}>
          <Grid item className={classes.status}>
            <Grid container>
              <Grid item>{tradeIcon}</Grid>
              <Grid item className={classes.text}>
                {tradeState}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <div
            className={props.className}
            style={{ backgroundColor: `${color}22`, color: `${color}` }}
          >
            {props.icon && tradeIcon}
            {props.children}
          </div>
        </>
      )}
    </>
  );
};

export default TradeStatus;
