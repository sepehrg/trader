import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Instrument from "../../../components/instrument/instrument";
import Bidask from "../../../components/bidask/bidask";
import ClientTrade from "../../../components/clientTrade/clientTrade";
import Trade from "../../../components/trade/trade";
import Range from "../../../components/range/range";
import Footer from "../../../components/footer/footer";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Components from "../../../enums/components";
import style from "../../../shared/style";
import Splitter from "../../../components/UI/splitter/splitter";
import useDevice from "../../../hooks/useDevice";
import Tabs from "../../../components/UI/Tab/Tabs";
import Tab from "../../../components/UI/Tab/Tab";
import TabPanel from "../../../components/UI/Tab/TabPanel";
import TradeInfo from "../../../components/instrument/tradeInfo/tradeInfo";
import ClosingPriceInfo from "../../../components/instrument/closingPriceInfo/closingPriceInfo";
import OrderButtons from "../../../components/orderButtons/orderButtons";
import TradeChart from "../../../components/tradeChart/tradeChart";
import clsx from "clsx";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";
import SideBar from "../../../components/sideBar/sideBar";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexWrap: "nowrap",
    height: "100%",
    position: "relative",
  },
  right: {
    overflow: "hidden auto",
    height: "100%",
    flex: 1,
  },
  components: {
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap",
    padding: theme.spacing(5),
  },
  footer: {
    height: "100%",
  },

  tradesMobile: {
    padding: 10,
    height: "100%",
  },
  tab: {
    width: "33.3%",
  },
  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 6px",
  },
  tabMobile: {
    fontSize: 12,
    maxWidth: "none",
  },
  tabsMobile: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: 10,
  },
  rangeMobile: {
    paddingTop: "15px !important",
  },
  orderButtons: {
    position: "sticky",
    bottom: 10,
  },
  mainTradesMobile: {
    height: "calc(100% - 73px - 48px)",
  },
  mainTradesContainerMobile: {
    height: "100%",
  },
  tabPanel: {
    height: "calc(100% - 49px - 10px)",
    overflow: "hidden scroll",
  },
  tabPanelItem: {
    width: "100%",
  },
  rightLaptop: {
    paddingLeft: 25,
  },
  tradesBody: {
    flexDirection: "column",
  },
  range: {
    paddingBottom: "1px !important",
  },
  trade: {
    paddingBottom: "1px !important",
  },
}));

const Trades = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const chartContainer = useRef();
  const theme = useTheme();
  const pageContainer = useRef();
  const topSectionContainer = useRef();

  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  const [selectedTabMobile, setSelectedTabMobile] = useState(0);
  const [height, setHeight] = useState(window.innerHeight - 490);

  let isSubscribed = true;

  useEffect(() => {
    if (device.isMobile) {
      window.addEventListener("resize", resize);
      resize();
    }
    return () => {
      isSubscribed = false;
      if (device.isMobile) window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    setHeight(
      pageContainer.current?.offsetHeight -
        topSectionContainer.current?.offsetHeight -
        28
    );
  }, []);

  let timer;
  const resize = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isSubscribed) {
        setChartWidth(chartContainer.current?.offsetWidth);
        setChartHeight(chartContainer.current?.offsetHeight);
      }
    }, 200);
  };

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.root} ref={pageContainer}>
          <Grid
            item
            className={clsx(
              classes.right,
              !device.isBigScreen && classes.rightLaptop
            )}
          >
            <Grid container className={classes.components}>
              <Splitter
                split="horizontal"
                minSize={35}
                defaultSize={height}
                primary="second"
              >
                <Grid item ref={topSectionContainer}>
                  <Grid container className={classes.tradesBody} spacing={6}>
                    <Grid item data-tour="instrument">
                      <Instrument></Instrument>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={6}>
                        <Grid item md={6} data-tour="bidask">
                          <Bidask
                            border={true}
                            instrument={props.instrument}
                            component={Components.Trades}
                          ></Bidask>
                        </Grid>
                        <Grid item md={6} data-tour="clientTrade">
                          <ClientTrade></ClientTrade>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          className={classes.range}
                          data-tour="range"
                        >
                          <Range></Range>
                        </Grid>
                        <Grid
                          item
                          md={6}
                          className={classes.trade}
                          data-tour="trade"
                        >
                          <Trade></Trade>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={classes.footer}
                  data-tour="footer"
                >
                  <Footer></Footer>
                </Grid>
              </Splitter>
            </Grid>
          </Grid>
          <SideBar />
        </Grid>
      ) : (
        <Grid container className={classes.tradesMobile}>
          <Grid item xs={12}>
            <Instrument />
          </Grid>
          <Grid item xs={12} className={classes.mainTradesMobile}>
            <Grid
              container
              className={classes.mainTradesContainerMobile}
              ref={chartContainer}
            >
              <Grid item xs={12}>
                <Tabs
                  orientation="horizontal"
                  value={selectedTabMobile}
                  onChange={(e, tab) => setSelectedTabMobile(tab)}
                  indicatorColor="primary"
                  className={classes.tabsMobile}
                >
                  <Tab
                    className={clsx(
                      classes.tab,
                      !device.isNotMobile && classes.tabMobile
                    )}
                    label="اطلاعات نماد"
                    id="tab-0"
                  ></Tab>
                  <Tab
                    className={clsx(
                      classes.tab,
                      !device.isNotMobile && classes.tabMobile
                    )}
                    label="صف"
                    id="tab-1"
                  ></Tab>
                  <Tab
                    className={clsx(
                      classes.tab,
                      !device.isNotMobile && classes.tabMobile
                    )}
                    label="نمودار"
                    id="tab-2"
                  ></Tab>
                </Tabs>
              </Grid>
              <Grid item xs={12} className={classes.tabPanel}>
                <Grid container>
                  <TabPanel
                    value={selectedTabMobile}
                    index={0}
                    className={classes.tabPanelItem}
                  >
                    <Grid item xs={12}>
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} className={classes.boxMobile}>
                              <ClosingPriceInfo
                                instrument={props.instrument}
                              ></ClosingPriceInfo>
                              <TradeInfo
                                instrument={props.instrument}
                              ></TradeInfo>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              className={clsx(
                                classes.boxMobile,
                                classes.rangeMobile
                              )}
                            >
                              <Range></Range>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel
                    value={selectedTabMobile}
                    index={1}
                    className={classes.tabPanelItem}
                  >
                    <Grid item xs={12}>
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} className={classes.boxMobile}>
                              <Bidask
                                border={false}
                                instrument={props.instrument}
                                component={Components.Trades}
                              ></Bidask>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} className={classes.boxMobile}>
                              <ClientTrade></ClientTrade>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel
                    value={selectedTabMobile}
                    index={2}
                    className={classes.tabPanelItem}
                  >
                    <Grid item xs={12} className={classes.boxMobile}>
                      <TradeChart width={chartWidth} height={chartHeight} />
                    </Grid>
                  </TabPanel>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.orderButtons}>
            <OrderButtons></OrderButtons>
          </Grid>
        </Grid>
      )}
      <Tour
        steps={steps.trades}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    permissions: state.account.permissions,
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
    setInstrument: (isin) => dispatch(actions.setInstrument(isin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trades);
