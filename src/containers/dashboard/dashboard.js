import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import MarketActivity from "../../components/marketActivity/marketActivity";
import InstrumentAffect from "../../components/instrumentAffect/instrumentAffect";
import IndexData from "../../components/indexData/indexData";
import TradesSignSummary from "../../components/tradesSignSummary/tradesSignSummary";
import StockIcon from "../../components/UI/icons/stock";
import StockFaraBourseIcon from "../../components/UI/icons/stockFaraBourse";
import useDevice from "../../hooks/useDevice";
import SwipeableViews from "react-swipeable-views";
import ScrollPager from "../../components/UI/scrollPager/scrollPager";
import Tour from "../../components/UI/tour/tour";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import steps from "../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
  root: {
    padding: 10,
    paddingBottom: 0,
    height: "100%",
  },
  main: {
    flexDirection: "column",
    height: "100%",
    overflow: "hidden auto",
    flexWrap: "nowrap",
  },
  secondSection: {
    paddingBottom: "0px !important",
    height: "calc(100% - 399px)",
  },
  fullHeight: {
    height: "100%",
    paddingBottom: "0px !important",
  },
  secondSectionLeft: {
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  tradesSignSummary: {
    flex: 1,
    paddingTop: 12,
  },
  stockIcon: {
    height: 60,
    width: 60,
  },
  stockIconBackground: {
    height: "100%",
    width: "100%",
    fill: theme.palette.background.paper,
  },

  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: 6,
    width: "100%",
  },

  containerMobile: {
    padding: 10,
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
    overflow: "hidden auto",
  },
  indexMobile: {
    flexDirection: "column",
  },
  swipeableViews: {
    direction: "rtl",
  },
  pagination: {
    direction: "ltr",
  },
  secondSectionLeftContainer: {
    paddingBottom: "0px !important",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const chartContainer = useRef();
  const leftContainer = useRef();
  const device = useDevice();

  const [chartWidth, setChartWidth] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [page, setPage] = React.useState(1);

  let isSubscribed = true;

  useEffect(() => {
    // if (device.isMobile) {
    window.addEventListener("resize", resize);
    resize();
    // }
    return () => {
      isSubscribed = false;
      // if (device.isMobile)
      window.removeEventListener("resize", resize);
    };
  }, []);

  let timer;
  const resize = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isSubscribed) {
        setChartWidth(chartContainer.current?.offsetWidth);
      }
    }, 200);
  };

  const scrollChange = (number) => {
    setPage(number + 1);
  };

  useEffect(() => {
    setBottomHeight(leftContainer.current?.offsetHeight);
  }, [window.innerHeight]);

  return (
    <>
      {device.isNotMobile ? (
        <Grid container className={classes.container}>
          <Grid item className={classes.root}>
            <Grid
              container
              className={classes.main}
              spacing={6}
              ref={chartContainer}
            >
              <Grid item>
                <Grid container spacing={6}>
                  <Grid item sm={6} data-tour="indexData1">
                    <IndexData
                      flowId={1}
                      flowTitle="شاخص بورس"
                      flowIcon={<StockIcon className={classes.stockIcon} />}
                      flowIconBackground={
                        <StockIcon className={classes.stockIconBackground} />
                      }
                      width={chartWidth}
                    />
                  </Grid>
                  <Grid item sm={6} data-tour="indexData2">
                    <IndexData
                      flowId={2}
                      flowTitle="شاخص فرابورس"
                      flowIcon={
                        <StockFaraBourseIcon className={classes.stockIcon} />
                      }
                      flowIconBackground={
                        <StockFaraBourseIcon
                          className={classes.stockIconBackground}
                        />
                      }
                      width={chartWidth}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.secondSection}>
                <Grid container className={classes.fullHeight} spacing={6}>
                  <Grid
                    item
                    sm={6}
                    className={classes.fullHeight}
                    style={{ height: bottomHeight }}
                  >
                    <InstrumentAffect />
                  </Grid>
                  <Grid
                    item
                    sm={6}
                    className={classes.secondSectionLeftContainer}
                    ref={leftContainer}
                  >
                    <Grid container className={classes.secondSectionLeft}>
                      <Grid item data-tour="marketActivity">
                        <MarketActivity />
                      </Grid>
                      <Grid
                        item
                        className={classes.tradesSignSummary}
                        data-tour="tradesSignSummary"
                      >
                        <TradesSignSummary />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          className={classes.containerMobile}
          ref={chartContainer}
        >
          <Grid item>
            <Grid container className={classes.container} spacing={4}>
              <Grid item>
                <Grid container className={classes.indexMobile}>
                  <Grid item className={classes.boxMobile}>
                    <SwipeableViews
                      enableMouseEvents
                      onChangeIndex={scrollChange}
                      slideClassName={classes.swipeableViews}
                    >
                      <div>
                        <IndexData
                          flowId={1}
                          flowTitle="شاخص بورس"
                          flowIcon={<StockIcon className={classes.stockIcon} />}
                          width={chartWidth}
                        />
                      </div>
                      <div>
                        <IndexData
                          flowId={2}
                          flowTitle="شاخص فرابورس"
                          flowIcon={
                            <StockFaraBourseIcon
                              className={classes.stockIcon}
                            />
                          }
                          width={chartWidth}
                        />
                      </div>
                    </SwipeableViews>
                    <ScrollPager
                      count={2}
                      page={page}
                      paginationClassName={classes.pagination}
                      horizontal
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <MarketActivity />
              </Grid>
              <Grid item>
                <InstrumentAffect />
              </Grid>
              <Grid item>
                <TradesSignSummary />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Tour
        steps={steps.marketView}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
