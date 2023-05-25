import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "../UI/Tab/Tabs";
import Tab from "../UI/Tab/Tab";
import TradeForm from "../tradeForm/tradeForm";
import { connect } from "react-redux";
import TradeChart from "../tradeChart/tradeChart";
import AccessKeys from "../../enums/accessKeys";
import clsx from "clsx";
import Switch from "../../components/UI/switch/switch";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    height: "100%",
    padding: theme.spacing(3),
    flexWrap: "nowrap",
    minHeight: 238,
  },
  rootWidget: {
    border: "none",
  },
  rootHorizontal: {
    minHeight: "auto",
    // flexDirection: "column",
  },
  flex: {
    display: "flex",
    width: 60,
  },
  tabs: {
    width: "60px",
    borderLeft: `1px solid ${theme.palette.border.secondary}`,
  },
  tab: {
    minWidth: "50px",
    minHeight: "34px",
  },
  buyPower: {
    position: "absolute",
    bottom: 15,
    right: 11,
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
  },
  icon: {},
  indicatorBuy: {
    backgroundColor: theme.palette.color.blue,
  },
  indicatorSell: {
    backgroundColor: theme.palette.color.red,
  },
  tabContent: {
    flexGrow: 1,
  },
  horizontalTabContent: {
    flex: 1,
  },
  switchContainer: {
    alignItems: "center",
    height: "100%",
    flexWrap: "nowrap",
  },
  switchLabel: {
    minWidth: 26,
    transform: "translateX(20px)",
    color: "#fff",
    zIndex: 1,
  },
  switchLabelFalse: {
    transform: "translateX(45px)",
  },
}));

const Trade = (props) => {
  const classes = useStyles();
  const chartContainer = useRef();

  const [chartWidth, setChartWidth] = useState(0);
  const [activeTab, setActiveTab] = useState(props.tradeSide);
  const [activeSwitch, setActiveSwitch] = useState(true);

  const switchChangeHandler = () => {
    setActiveSwitch(!activeSwitch);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  let isSubscribed = true;

  useEffect(() => {
    if (!props.onlineGroup && isSubscribed) {
      window.addEventListener("resize", resize);
      resize();
    }
    return () => {
      isSubscribed = false;
      if (!props.onlineGroup) window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    setActiveTab(props.tradeSide);
  }, [props.tradeSide]);

  const tabs = {
    chart: props.onlineGroup || props.widget ? -1 : 0,
    buy: props.onlineGroup || props.widget ? 0 : 1,
    sell: props.onlineGroup || props.widget ? 1 : 2,
  };

  let timer;
  const resize = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isSubscribed) setChartWidth(chartContainer.current?.offsetWidth);
    }, 1400);
  };

  const showChart =
    !props.onlineGroup &&
    !props.widget &&
    props.permissions.includes(AccessKeys.TradeHistoricalChart);

  return (
    <>
      <Grid
        container
        className={clsx(
          classes.root,
          props.widget && classes.rootWidget,
          props.horizontal && classes.rootHorizontal
        )}
        ref={chartContainer}
      >
        {!props.horizontal ? (
          <Grid item className={classes.flex}>
            <Tabs
              className={classes.tabs}
              orientation="vertical"
              variant="fullWidth"
              value={activeTab}
              onChange={handleChange}
              classes={{
                indicator:
                  activeTab === tabs.sell
                    ? classes.indicatorSell
                    : classes.indicatorBuy,
              }}
            >
              {showChart && (
                <Tab className={classes.tab} label="نمودار" id="tab-0"></Tab>
              )}
              <Tab className={classes.tab} label="خرید" id="tab-1"></Tab>
              <Tab className={classes.tab} label="فروش" id="tab-2"></Tab>
            </Tabs>
          </Grid>
        ) : (
          <Grid item>
            <Grid container className={classes.switchContainer}>
              <Grid item>
                <Switch checked={activeSwitch} onChange={switchChangeHandler} />
              </Grid>
              <Grid
                item
                className={clsx(
                  classes.switchLabel,
                  !activeSwitch && classes.switchLabelFalse
                )}
              >
                {activeSwitch ? "خرید" : "فروش"}
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          className={clsx(classes.tabContent, classes.horizontalTabContent)}
        >
          {!props.horizontal && activeTab === tabs.chart && (
            <TradeChart width={chartWidth} />
          )}
          {(activeTab === tabs.buy || activeTab === tabs.sell) && (
            <TradeForm
              side={
                !props.horizontal
                  ? activeTab === tabs.buy
                    ? "buy"
                    : activeTab === tabs.sell
                    ? "sell"
                    : ""
                  : activeSwitch
                  ? "buy"
                  : "sell"
              }
              instrument={props.instrument}
              expandable={false}
              buyPower={!props.onlineGroup}
              onlineGroup={props.onlineGroup}
              accountNumber={props.accountNumber}
              horizontal={props.horizontal}
            ></TradeForm>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    tradeSide: state.app.tradeSide,
    permissions: state.account.permissions,
  };
};

export default connect(mapStateToProps)(Trade);
