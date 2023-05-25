import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import WifiIcon from "../UI/icons/wifi";
import CmdTseService from "../../services/cmdTseService";
import Tooltip from "../UI/Tooltip/Tooltip";
import ProfileMenu from "./profileMenu/profileMenu";
import Clock from "../UI/clock/clock";
import CurrentDate from "../UI/date/date";
import Ipo from "../ipo/ipo";
import Messages from "../messages/messages";
import IndexLevel from "./indexLevel/indexLevel";
import MarketIcon from "./marketIcon/marketIcon";
import useDevice from "../../hooks/useDevice";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { comma } from "../../shared/utility";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
// import LogoFaraTraderIcon from "../UI/icons/logoFaraTrader";
import LogoDanayanTraderIcon from "../UI/icons/logoDanayanTrader";
import PropertyAmountModal from "../propertyAmountModal/propertyAmountModal";
import Search from "../search/search";
import Link from "../UI/Link/Link";
import ArrowIcon from "../UI/icons/arrow";
import SearchIcon from "../UI/icons/search";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `2px solid ${theme.palette.border.primary}`,
    minHeight: 60,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
  },
  headerIcon: {
    padding: `0 ${theme.spacing(5)}px`,
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
  },
  connect: {
    fill: theme.palette.color.green,
  },
  time: {
    padding: `0 ${theme.spacing(5)}px`,
    alignItems: "center",
    cursor: "default",
    "&:hover $calendar": {
      color: theme.palette.primary.main,
    },
  },
  timeset: {
    textAlign: "right",
    flexDirection: "column",
  },
  clock: {
    color: theme.palette.text.primary,
    fontSize: "14px",
  },
  calendar: {
    color: theme.palette.text.secondary,
    fontSize: "10px",
    transition: "0.3s",
  },
  navbar: {
    alignItems: "center",
  },
  navBtn: {
    alignItems: "center",
  },
  icon: {},
  profileMenu: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  headerRoot: {
    flexDirection: "column",
  },
  mobileHeader: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    padding: 11,
    height: 45,
    alignItems: "center",
  },
  status: {
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.box,
    color: theme.palette.text.primary,
    padding: 4,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    height: 26,
    alignItems: "center",
  },
  mobileTitle: {
    color: "#fff",
    fontSize: 16,
    marginRight: -28,
  },
  mobileIcon: {
    fill: "#fff",
  },
  amountMobile: {
    color: `${theme.palette.text.secondary}99`,
    fontSize: 11,
    alignItems: "center",
    flexWrap: "nowrap",
  },
  amountTitleMobile: {
    whiteSpace: "nowrap",
  },
  amountNumberMobile: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  marketStatusMobile: {
    fontSize: 12,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const history = useHistory();

  const [time, setTime] = useState("");
  const [propertyModalIsOpen, setPropertyModalIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  let isSubscribed = true;

  useEffect(() => {
    getServerTime();
    props.cstPusherSubscribe();
    return () => (isSubscribed = false);
  }, []);

  const getServerTime = () => {
    CmdTseService.getServerTime((status, data) => {
      if (isSubscribed) setTime(data);
    });
  };

  const backButtonClickHandler = () => {
    props.setBackButton(false);
    history.goBack();
  };

  const propertyAmountModalToggle = () => {
    setPropertyModalIsOpen(!propertyModalIsOpen);
  };

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root}>
          <Grid item data-tour="indexLevel">
            <IndexLevel />
          </Grid>
          <Grid item>
            <Grid container className={classes.navbar}>
              <Ipo />
              <Grid item>
                <Grid container className={classes.time}>
                  <Grid item data-tour="marketIcon">
                    <MarketIcon />
                  </Grid>
                  <Grid item>
                    <Grid container className={classes.timeset}>
                      <Grid item className={classes.clock}>
                        <Clock date={time} />
                      </Grid>
                      <Grid item className={classes.calendar}>
                        <CurrentDate date={time}></CurrentDate>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container className={classes.navBtn}>
                  <Tooltip
                    placement="bottom"
                    title="اتصال برقرار"
                    className={classes.headerIcon}
                  >
                    <span data-tour="connection">
                      <WifiIcon className={classes.connect}></WifiIcon>
                    </span>
                  </Tooltip>
                  <span data-tour="messages">
                    <Messages />
                  </span>
                </Grid>
              </Grid>
              <Grid item data-tour="profileMenu">
                <ProfileMenu
                  onProfileModalOpen={props.onProfileModalOpen}
                  onLoginReportModalOpen={props.onLoginReportModalOpen}
                ></ProfileMenu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.headerRoot}>
          <Grid item>
            <Grid container className={classes.mobileHeader}>
              {!searchIsOpen ? (
                <>
                  <Grid item>
                    <Grid container spacing={4}>
                      <Grid item>
                        <HamburgerMenu onMenuItemSelect={props.onSelect} />
                      </Grid>
                      <Grid item>
                        <Link onClick={() => setSearchIsOpen(true)}>
                          <SearchIcon className={classes.mobileIcon} />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.mobileTitle}>
                    {props.pageTitle}
                  </Grid>
                  <Grid item>
                    {!props.backButton ? (
                      <LogoDanayanTraderIcon className={classes.mobileIcon} />
                    ) : (
                      <Link onClick={backButtonClickHandler}>
                        <ArrowIcon className={classes.mobileIcon} />
                      </Link>
                    )}
                  </Grid>
                </>
              ) : (
                <Search
                  searchOpen={searchIsOpen}
                  setSearchOpen={setSearchIsOpen}
                />
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container className={classes.status}>
              <Grid item className={classes.marketStatusMobile}>
                <Clock date={time} />
                <IndexLevel />
                <MarketIcon />
              </Grid>
              <Grid item>
                {propertyModalIsOpen && (
                  <PropertyAmountModal
                    open={propertyModalIsOpen}
                    onClose={() => setPropertyModalIsOpen(!propertyModalIsOpen)}
                  />
                )}
                <Link onClick={propertyAmountModalToggle}>
                  <Grid container className={classes.amountMobile} spacing={2}>
                    <Grid item className={classes.amountTitleMobile}>
                      قدرت خرید:
                    </Grid>
                    <Grid item className={classes.amountNumberMobile}>
                      {comma(props.accountState?.BuyCeiling)}
                    </Grid>
                    <Grid item>ریال</Grid>
                  </Grid>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accountState: state.tseOms.accountState,
    backButton: state.app.backButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBackButton: (state) => dispatch(actions.setBackButton(state)),
    cstPusherSubscribe: () => dispatch(actions.cstPusherSubscribe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
