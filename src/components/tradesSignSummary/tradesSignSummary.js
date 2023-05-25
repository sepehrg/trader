import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CmdTseService from "../../services/cmdTseService";
import clsx from "clsx";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: 10,
    flexDirection: "column",
    // alignItems: "center",

    height: "100%",
  },
  chart: {
    width: "100%",
    height: 14,
    backgroundColor: theme.palette.border.bar,
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
    display: "flex",
  },
  sectionBuy: {
    height: 24,
    backgroundColor: theme.palette.color.green,
    width: (props) => `${(props.positiveCount / props.sum) * 100}%`,
  },
  sectionSell: {
    height: 24,
    backgroundColor: theme.palette.color.red,
    width: (props) => `${(props.negativeCount / props.sum) * 100}%`,
  },
  sectionNoChange: {
    height: 24,
    backgroundColor: theme.palette.text.secondary,
    width: (props) => `${(props.notChangeCount / props.sum) * 100}%`,
  },
  countNumber: {
    justifyContent: "center",
    padding: 10,
  },
  countNumberItem: {
    display: "flex",
    alignItems: "center",
  },
  countGuide: {
    height: 12,
    width: 12,
    margin: "0 5px",
    borderRadius: 3,
  },
  posetiveCountGuide: {
    backgroundColor: theme.palette.color.green,
  },
  notChangeCountGuide: {
    backgroundColor: theme.palette.text.secondary,
  },
  negativeCountGuide: {
    backgroundColor: theme.palette.color.red,
  },
  tradesSignSummaryTitle: {
    color: theme.palette.text.secondary,
    marginBottom: 40,
    textAlign: "center",
  },
  body: {
    flex: 1,
  },
  main: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
    flexWrap: "nowrap",
  },
  countNumberItemTitle: {
    display: "flex",
  },

  rootMobile: {
    alignItems: "normal",
  },
  tradesSignSummaryTitleMobile: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  containerBarMobile: {
    order: 1,
  },
  legerMobile: {
    order: 2,
  },
  chartMobile: {
    height: 18,
    borderRadius: 6,
  },
  countNumberMobile: {
    flexDirection: "column",
    padding: 0,
  },
  countNumberItemInnerMobile: {
    justifyContent: "space-between",
    fontSize: 12,
  },
  countGuideMobile: {
    height: 16,
    width: 16,
    borderRadius: 5,
  },
  positiveCountColorMobile: {
    color: theme.palette.color.green,
  },
  notChangeCountColorMobile: {
    color: theme.palette.text.secondary,
  },
  negativeCountColorMobile: {
    color: theme.palette.color.red,
  },
}));

const TradesSignSummary = (props) => {
  // const classes = useStyles(props);
  const theme = useTheme();
  const device = useDevice();

  const [summaryCount, setSummaryCount] = useState({});
  const [sum, setSum] = useState();

  let isSubscribed = true;

  useEffect(() => {
    getInstrumentTradesSignSummary();
    return () => (isSubscribed = false);
  }, []);

  const getInstrumentTradesSignSummary = () => {
    CmdTseService.getInstrumentTradesSignSummary((status, data) => {
      if (data.Result && isSubscribed) {
        setSummaryCount(data.Result);
        setSum(
          data.Result.PositiveCount +
            data.Result.NegativeCount +
            data.Result.NotChangeCount
        );
      }
    });
  };

  const notChangeCount =
    props.positiveCount === 0 && props.negativeCount === 0
      ? notChangeCount === 0
      : summaryCount.NotChangeCount;

  const classes = useStyles({
    positiveCount: summaryCount.PositiveCount,
    negativeCount: summaryCount.NegativeCount,
    notChangeCount,
    sum,
  });

  return (
    <Grid
      container
      className={clsx(classes.root, device.isMobile && classes.rootMobile)}
    >
      <Grid
        item
        className={clsx(
          classes.tradesSignSummaryTitle,
          device.isMobile && classes.tradesSignSummaryTitleMobile
        )}
      >
        وضعیت نمادها
      </Grid>
      <Grid item className={classes.body}>
        <Grid container className={classes.main} spacing={6}>
          <Grid item className={clsx(device.isMobile && classes.legerMobile)}>
            <Grid
              container
              className={clsx(
                classes.countNumber,
                device.isMobile && classes.countNumberMobile
              )}
              spacing={device.isMobile ? 3 : 6}
            >
              <Grid item className={classes.countNumberItem}>
                <Grid
                  container
                  className={clsx(
                    device.isMobile && classes.countNumberItemInnerMobile
                  )}
                >
                  <Grid item className={classes.countNumberItemTitle}>
                    <div
                      className={clsx(
                        classes.posetiveCountGuide,
                        classes.countGuide,
                        device.isMobile && classes.countGuideMobile
                      )}
                    />
                    تعداد نمادهای مثبت:{" "}
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      device.isMobile && classes.positiveCountColorMobile
                    )}
                  >
                    {summaryCount.PositiveCount ? (
                      <>
                        {summaryCount.PositiveCount} (
                        {parseInt(
                          Math.round((summaryCount.PositiveCount / sum) * 100)
                        )}
                        %)
                      </>
                    ) : (
                      "0 (0%)"
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.countNumberItem}>
                <Grid
                  container
                  className={clsx(
                    device.isMobile && classes.countNumberItemInnerMobile
                  )}
                >
                  <Grid item className={classes.countNumberItemTitle}>
                    <div
                      className={clsx(
                        classes.notChangeCountGuide,
                        classes.countGuide,
                        device.isMobile && classes.countGuideMobile
                      )}
                    />
                    تعداد نمادهای بدون تغییر:{" "}
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      device.isMobile && classes.notChangeCountColorMobile
                    )}
                  >
                    {summaryCount.NotChangeCount ? (
                      <>
                        {summaryCount.NotChangeCount} (
                        {parseInt(
                          Math.round((summaryCount.NotChangeCount / sum) * 100)
                        )}
                        %)
                      </>
                    ) : (
                      "0 (0%)"
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.countNumberItem}>
                <Grid
                  container
                  className={clsx(
                    device.isMobile && classes.countNumberItemInnerMobile
                  )}
                >
                  <Grid item className={classes.countNumberItemTitle}>
                    <div
                      className={clsx(
                        classes.negativeCountGuide,
                        classes.countGuide,
                        device.isMobile && classes.countGuideMobile
                      )}
                    />
                    تعداد نمادهای منفی:{" "}
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      device.isMobile && classes.negativeCountColorMobile
                    )}
                  >
                    {summaryCount.NegativeCount ? (
                      <>
                        {summaryCount.NegativeCount} (
                        {parseInt(
                          Math.round((summaryCount.NegativeCount / sum) * 100)
                        )}
                        %)
                      </>
                    ) : (
                      "0 (0%)"
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={clsx(classes.containerBarMobile)}>
            <Grid
              container
              className={clsx(
                classes.chart,
                device.isMobile && classes.chartMobile
              )}
            >
              <div className={classes.sectionBuy} />
              <div className={classes.sectionNoChange} />
              <div className={classes.sectionSell} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(TradesSignSummary);
