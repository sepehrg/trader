import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { comma, coloredPercent } from "../../shared/utility";
import Dialog from "../UI/dialog/dialog";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    padding: `16px 10px`,
  },
  walletItem: {
    justifyContent: "space-between",
    // padding: `${theme.spacing(2)}px 0px`,
  },
  currency: {
    cursor: "default",
    transition: "0.3s",
    color: theme.palette.text.primary,
    direction: "ltr",
    display: "flex",
  },
  currencyUnit: {
    fontSize: "10px",
    color: theme.palette.text.secondary,
    padding: 5,
  },
  firstItem: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: theme.spacing(2),
  },
  firstCurrency: {
    fontSize: "14px",
    color: theme.palette.text.primary,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
  },

  rootMobile: {
    padding: "16px 22px",
  },
  walletItemMobile: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  currencyMobile: {
    fontSize: 16,
  },
  titleMobile: {
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
}));

const PropertyAmountModal = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [minimized, setMinimized] = useState(false);

  const minimizeHandler = () => {
    setMinimized(!minimized);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="xs"
      title="دارایی شما"
    >
      <Grid
        container
        className={clsx(classes.root, device.isMobile && classes.rootMobile)}
        spacing={device.isNotMobile ? 6 : 10}
      >
        <Grid
          item
          className={clsx(device.isMobile && classes.walletItemMobile)}
        >
          <Grid
            container
            className={clsx(
              classes.walletItem,
              device.isNotMobile && classes.firstItem
            )}
          >
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
            >
              قدرت خرید
            </Grid>
            <Grid
              item
              className={clsx(
                classes.currency,
                classes.firstCurrency,
                device.isMobile && classes.currencyMobile
              )}
            >
              <div className={classes.currencyUnit}>ریال</div>
              {coloredPercent(
                props.accountState.BuyCeiling,
                theme,
                false,
                false
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={clsx(device.isMobile && classes.walletItemMobile)}
        >
          <Grid container className={classes.walletItem}>
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
            >
              مانده حساب
            </Grid>
            <Grid
              item
              className={clsx(
                classes.currency,
                device.isMobile && classes.currencyMobile
              )}
            >
              <div className={classes.currencyUnit}>ریال</div>
              {coloredPercent(
                props.accountState.AccountRemaining,
                theme,
                false,
                false
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className={clsx(device.isMobile && classes.walletItemMobile)}
        >
          <Grid container className={classes.walletItem}>
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
            >
              مانده اعتبار
            </Grid>
            <Grid
              item
              className={clsx(
                classes.currency,
                device.isMobile && classes.currencyMobile
              )}
            >
              <div className={classes.currencyUnit}>ریال</div>
              {comma(props.accountState.CreditRemaining)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container className={classes.walletItem}>
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
            >
              بلوکه شده
            </Grid>
            <Grid
              item
              className={clsx(
                classes.currency,
                device.isMobile && classes.currencyMobile
              )}
            >
              <div className={classes.currencyUnit}>ریال</div>
              {comma(props.accountState.BlockedAmount)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    accountState: state.tseOms.accountState,
  };
};

export default connect(mapStateToProps)(PropertyAmountModal);
