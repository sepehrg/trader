import React, { useState, useEffect, useReducer, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Header from "../../components/header/header";
import * as actions from "../../store/actions/index";
import { Grid } from "@material-ui/core";
import Navigation from "../../components/navigation/navigation";
import WatchlistPane from "../../components/watchlistPane/watchlistPane";
import LoginReport from "../../components/loginReport/loginReport";
import Agreements from "../../components/agreements/agreements";
import PaymentRequest from "../../components/paymentRequest/paymentRequest";
import ChangeSupervisorBroker from "../../components/changeSupervisorBroker/changeSupervisorBroker";
import DepositMoney from "../../components/depositMoney/depositMoney";
import ElectronicPayment from "../../components/electronicPayment/electronicPayment";
import ThemeModal from "../../components/themeModal/themeModal";
import useDevice from "../../hooks/useDevice";
import PasswordChangeRequired from "../../components/passwordChangeRequired/passwordChangeRequired";
import ProfileModal from "../../components/profileModal/profileModal";
import Spinner from "../../components/UI/spinner/spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "11px",
    height: "100%",
    backgroundColor: theme.palette.background.default,
    scrollbarColor: "transparent transparent",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  navigation: {
    height: "100%",
    zIndex: "200",
    backgroundColor: theme.palette.background.box,
  },
  main: {
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap",
  },
  body: {
    height: "calc(100% - 60px)",
  },
  watchlistPane: {
    position: "relative",
  },
  layoutMobile: {
    fontSize: "11px",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
    overflow: "hidden",
  },
  bodyMobile: {
    // padding: 10,
    height: "calc(100% - 71px - 48px)",
    // overflow: "scroll",
  },
  tabBarPosition: {
    // marginTop: "auto",
    position: "sticky",
    bottom: 0,
    // zIndex: 100,
    width: "100%",
    backgroundColor: theme.palette.background.box,
    borderTop: `1px solid ${theme.palette.border.primary}`,
    height: 48,
    display: "flex",
    alignItems: "center",
    zIndex: 1300,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const [hasWatchlist, setHasWatchlist] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [userMustChangePassword, setUserMustChangePassword] = useState(true);

  useEffect(() => {
    props.cmdPusherConnect();
    props.fetchAccountState();
    props.fetchSpecialInstruments();
    props.fetchUserAccountInfo();
  }, []);

  useEffect(() => {
    if (props.user && props.user.UserMustChangePassword)
      setUserMustChangePassword(true);
    else setUserMustChangePassword(false);
  }, [props.user]);

  const initialState = {};
  const reducer = (state, action) => {
    return { ...state, [action.modal]: action.open };
  };
  const [openedModals, dispatch] = useReducer(reducer, initialState);

  const menuSelectHandler = (item) => {
    // console.log("item", item);
    if (item?.modal) openModal(item.modal);
    else {
      setHasWatchlist(item?.watchlist || false);
      setPageTitle(item?.title || "");
    }
  };

  const openModal = (modal) => dispatch({ modal: modal, open: true });

  const closeModal = (modal) => dispatch({ modal: modal, open: false });

  return (
    <>
      {(openedModals.profileModal || userMustChangePassword) && (
        <ProfileModal
          open={openedModals.profileModal || userMustChangePassword}
          onClose={() => closeModal("profileModal")}
          userMustChangePassword={userMustChangePassword}
        ></ProfileModal>
      )}
      {!userMustChangePassword && (
        <>
          <PasswordChangeRequired
            open={props.user.UserShouldChangePassword}
            onClose={() => closeModal("passwordChange")}
            onOpenProfileModal={() => openModal("profileModal")}
          />
          <Agreements
            open={openedModals.agreements}
            onClose={() => closeModal("agreements")}
          />
          <LoginReport
            open={openedModals.loginReport}
            onClose={() => closeModal("loginReport")}
          />
          {openedModals.paymentRequest && (
            <PaymentRequest
              open={openedModals.paymentRequest}
              onClose={() => closeModal("paymentRequest")}
            />
          )}
          {openedModals.changeSupervisorBroker && (
            <ChangeSupervisorBroker
              open={openedModals.changeSupervisorBroker}
              onClose={() => closeModal("changeSupervisorBroker")}
            />
          )}
          {openedModals.depositMoney && (
            <DepositMoney
              open={openedModals.depositMoney}
              onClose={() => closeModal("depositMoney")}
            />
          )}
          {openedModals.electronicPayment && (
            <ElectronicPayment
              open={openedModals.electronicPayment}
              onClose={() => closeModal("electronicPayment")}
            />
          )}
          {openedModals.themeModal && (
            <ThemeModal
              open={openedModals.themeModal}
              onClose={() => closeModal("themeModal")}
            ></ThemeModal>
          )}
          {device.isNotMobile ? (
            <Grid container className={classes.root}>
              <Grid item className={classes.navigation}>
                <Navigation onSelect={menuSelectHandler} />
              </Grid>
              {hasWatchlist && <WatchlistPane />}
              <Grid item xs={12}>
                <Grid container className={classes.main}>
                  <Grid item>
                    <Header
                      onProfileModalOpen={() => openModal("profileModal")}
                      onLoginReportModalOpen={() => openModal("loginReport")}
                    />
                  </Grid>
                  <Grid item className={classes.body}>
                    <Suspense fallback={<Spinner />}>
                      {props.children}
                    </Suspense>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid container className={classes.layoutMobile}>
              <Grid item>
                <Header pageTitle={pageTitle} onSelect={menuSelectHandler} />
              </Grid>
              <Grid item className={classes.bodyMobile}>
                {props.children}
              </Grid>
              <Grid item className={classes.tabBarPosition}>
                <Navigation onSelect={menuSelectHandler} />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cmdPusherConnect: () => dispatch(actions.cmdPusherConnect()),
    fetchAccountState: () => dispatch(actions.fetchAccountState()),
    fetchSpecialInstruments: () => dispatch(actions.fetchSpecialInstruments()),
    fetchUserAccountInfo: () => dispatch(actions.fetchUserAccountInfo()),
    // setPageTitle: (title) => dispatch(actions.setPageTitle(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
