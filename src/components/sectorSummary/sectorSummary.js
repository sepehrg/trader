import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../shared/style";
import CmdTseService from "../../services/cmdTseService";
import { shortenNumber } from "../../shared/utility";
import clsx from "clsx";
import SectorSummaryItem from "./sectorSummaryItem/sectorSummaryItem";
import Link from "../UI/Link/Link";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: "10px 2px",
    flexDirection: "column",

    height: "100%",
  },
  main: {
    position: "relative",
    flexWrap: "nowrap",
  },
  header: {
    color: theme.palette.text.secondary,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 12,
    margin: "15px 0",
  },
  items: {
    width: "100%",
    flex: 1,
    overflow: "hidden auto",
  },
  gridRow: {
    width: "100%",
    position: "relative",
  },
  sectorTitle: {
    width: 230,
  },
  titles: {
    flexDirection: "column",
  },
  title: {
    height: 28,
    alignItems: "center",
    textAlign: "left",

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
    padding: "0 12px",
    paddingTop: 9,
  },
  sectorVolume: {
    width: 90,
  },
  volumes: {
    flexDirection: "column",
    padding: "0 12px",
  },
  volume: {
    height: 28,
    alignItems: "center",
    direction: "ltr",
    textAlign: "right",
    paddingTop: 9,
  },
  gridItem: {
    justifyContent: "space-between",
    height: 28,
    alignItems: "center",
    padding: "0 5px",
    zIndex: 1,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  bar: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  barRight: {
    position: "absolute",
    right: 0,
    display: "flex",
    height: 18,
    justifyContent: "flex-end",
  },
  barLeft: {
    position: "absolute",
    left: 0,
    display: "flex",
    height: 18,
  },
  gridXAxis: {
    color: theme.palette.text.secondary,
    display: "flex",
    paddingTop: 5,
    position: "sticky",
    bottom: 0,
    backgroundColor: theme.palette.background.box,
    zIndex: 2,
    borderTop: `1px solid ${theme.palette.border.bar}`,
    width: "100%",
  },
  itemXAxis: {
    fontSize: 10,
    direction: "ltr",
    justifyContent: "space-between",
  },
  fulWidth: {
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    position: "relative",
    border: `1px solid ${theme.palette.border.bar}`,
    "&:before": {
      content: "''",
      width: 2,
      height: "100%",
      backgroundColor: theme.palette.border.bar,
      position: "absolute",
      left: "50%",
      zIndex: 2,
    },
    "& td": {
      height: 28,
      border: `1px solid ${theme.palette.border.bar}`,
    },
    "& $tr:nth-child(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "& $tr:nth-child(odd)": {
      backgroundColor: theme.palette.background.box,
    },
  },
  mainChart: {
    flex: 1,
  },
  innerChart: {
    position: "relative",
  },
  chart: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    top: 2,
  },
  btn: {
    display: "flex",
    margin: "0 10px",
  },
  toggleBtn: {
    width: 16,
    height: 16,
    borderRadius: 3,
    backgroundColor: theme.palette.border.bar,
    margin: "0 5px",
  },
  toggleBtnMoreThanTwo: {
    backgroundColor: theme.palette.color.green,
  },
  toggleBtnBetweenZeroAndTwo: {
    backgroundColor: "#73D2B6",
  },
  toggleBtnBetweenZeroAndMinesTwo: {
    backgroundColor: "#FF7CA0",
  },
  toggleBTNLessThanMinesTwo: {
    backgroundColor: theme.palette.color.red,
  },
  emptyBox: {
    color: theme.palette.text.secondary,
    position: "sticky",
    bottom: 0,
    backgroundColor: theme.palette.background.box,
    width: "100%",
    height: 20,
  },
  titleActive: {
    color: theme.palette.primary.main,
  },
  gridItemActive: {
    backgroundColor: `${theme.palette.primary.main}22`,
  },
  sectorVolumeHeader: {
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
    fontSize: 10,
  },
  sectorVolumeHeaderItem: {
    paddingLeft: 22,
  },
}));

const SectorSummary = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const [sectors, setSectors] = useState([]);
  const [toggleMoreThanTwo, setToggleMoreThanTwo] = useState(true);
  const [toggleBetweenZeroAndTwo, setToggleBetweenZeroAndTwo] = useState(true);
  const [toggleBetweenZeroAndMinesTwo, setToggleBetweenZeroAndMinesTwo] =
    useState(true);
  const [toggleLessThanMinesTwo, setToggleLessThanMinesTwo] = useState(true);

  let isSubscribed = true;

  useEffect(() => {
    getSectorsSummary();
    return () => (isSubscribed = false);
  }, []);

  const getSectorsSummary = () => {
    CmdTseService.getSectorsSummary((status, data) => {
      if (data.Result && isSubscribed) {
        setSectors(data.Result);
      }
    });
  };

  const sectorHandler = (data) => {
    props.setSectorId(data.SectorId);
    props.setSectorTitle(data.SectorTitle);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.header}>
        خلاصه صنایع
      </Grid>
      <Grid item className={classes.header}>
        <Link
          onClick={() => {
            setToggleMoreThanTwo(!toggleMoreThanTwo);
          }}
          className={classes.btn}
        >
          <div
            className={clsx(
              classes.toggleBtn,
              toggleMoreThanTwo && classes.toggleBtnMoreThanTwo
            )}
          />
          {"بزرگتر از 2+"}
        </Link>
        <Link
          onClick={() => {
            setToggleBetweenZeroAndTwo(!toggleBetweenZeroAndTwo);
          }}
          className={classes.btn}
        >
          <div
            className={clsx(
              classes.toggleBtn,
              toggleBetweenZeroAndTwo && classes.toggleBtnBetweenZeroAndTwo
            )}
          />
          {"بین صفر و 2+"}
        </Link>
        <Link
          onClick={() => {
            setToggleBetweenZeroAndMinesTwo(!toggleBetweenZeroAndMinesTwo);
          }}
          className={classes.btn}
        >
          <div
            className={clsx(
              classes.toggleBtn,
              toggleBetweenZeroAndMinesTwo &&
                classes.toggleBtnBetweenZeroAndMinesTwo
            )}
          />
          {"بین 2- و صفر"}
        </Link>
        <Link
          onClick={() => {
            setToggleLessThanMinesTwo(!toggleLessThanMinesTwo);
          }}
          className={classes.btn}
        >
          <div
            className={clsx(
              classes.toggleBtn,
              toggleLessThanMinesTwo && classes.toggleBTNLessThanMinesTwo
            )}
          />
          {"کوچک تر از 2-"}
        </Link>
      </Grid>
      <Grid item>
        <Grid container className={classes.sectorVolumeHeader}>
          <Grid item></Grid>
          <Grid item></Grid>
          <Grid item className={classes.sectorVolumeHeaderItem}>
            ارزش معاملات
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.items, classes.scrollbarY)}>
        <Grid container className={classes.main}>
          <Grid
            item
            className={classes.sectorTitle}
            data-tour="sectorSummarySectors"
          >
            <Grid container className={classes.titles}>
              {sectors.length > 0 ? (
                <>
                  {sectors.map((data, i) => (
                    <Link onClick={() => sectorHandler(data)} key={i}>
                      <Grid
                        item
                        className={clsx(
                          classes.title,
                          sectors[i].SectorId === props.sectorId &&
                            classes.titleActive
                        )}
                      >
                        {data.SectorTitle}
                      </Grid>
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {[...Array(28).keys()].map((i) => (
                    <Grid item className={classes.title} key={i}>
                      بدون اطلاعات
                    </Grid>
                  ))}
                </>
              )}
              <Grid item className={classes.emptyBox}></Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.mainChart}>
            <Grid container className={classes.innerChart}>
              <Grid item className={classes.chart}>
                <Grid container>
                  {sectors.map((data, i) => (
                    <Grid item className={classes.gridRow} key={i}>
                      <Grid
                        container
                        // onClick={() => props.setSectorId(data.SectorId)}
                        onClick={() => sectorHandler(data)}
                        className={clsx(
                          classes.gridItem,
                          sectors[i].SectorId === props.sectorId &&
                            classes.gridItemActive
                        )}
                      >
                        <Grid
                          item
                          sm={6}
                          className={clsx(classes.bar, classes.barRight)}
                        >
                          {toggleMoreThanTwo && (
                            <SectorSummaryItem
                              mainValue={data.MoreThanTwo}
                              moreThanTwo={data.MoreThanTwo}
                              betweenZeroAndTwo={data.BetweenZeroAndTwo}
                              betweenZeroAndMinesTwo={
                                data.BetweenZeroAndMinesTwo
                              }
                              lessThanMinesTwo={data.LessThanMinesTwo}
                              color={theme.palette.color.green}
                              positive={true}
                            />
                          )}
                          {toggleBetweenZeroAndTwo && (
                            <SectorSummaryItem
                              mainValue={data.BetweenZeroAndTwo}
                              moreThanTwo={data.MoreThanTwo}
                              betweenZeroAndTwo={data.BetweenZeroAndTwo}
                              betweenZeroAndMinesTwo={
                                data.BetweenZeroAndMinesTwo
                              }
                              lessThanMinesTwo={data.LessThanMinesTwo}
                              color="#73d2b6"
                              positive={true}
                            />
                          )}
                        </Grid>
                        <Grid
                          item
                          sm={6}
                          className={clsx(classes.bar, classes.barLeft)}
                        >
                          {toggleBetweenZeroAndMinesTwo && (
                            <SectorSummaryItem
                              mainValue={data.LessThanMinesTwo}
                              moreThanTwo={data.MoreThanTwo}
                              betweenZeroAndTwo={data.BetweenZeroAndTwo}
                              betweenZeroAndMinesTwo={
                                data.BetweenZeroAndMinesTwo
                              }
                              lessThanMinesTwo={data.LessThanMinesTwo}
                              color="#ff7ca0"
                              negetive={true}
                            />
                          )}
                          {toggleLessThanMinesTwo && (
                            <SectorSummaryItem
                              mainValue={data.BetweenZeroAndMinesTwo}
                              moreThanTwo={data.MoreThanTwo}
                              betweenZeroAndTwo={data.BetweenZeroAndTwo}
                              betweenZeroAndMinesTwo={
                                data.BetweenZeroAndMinesTwo
                              }
                              lessThanMinesTwo={data.LessThanMinesTwo}
                              color={theme.palette.color.red}
                              negetive={true}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item className={classes.fulWidth}>
                <table className={classes.table}>
                  <tbody>
                    {sectors.length > 0 ? (
                      <>
                        {sectors.map((data, i) => (
                          <tr key={i}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        {[...Array(28).keys()].map((i) => (
                          <tr key={i}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </Grid>
              <Grid item className={classes.gridXAxis}>
                <Grid container className={classes.itemXAxis}>
                  <Grid item>-100%</Grid>
                  <Grid item>-80%</Grid>
                  <Grid item>-60%</Grid>
                  <Grid item>-40%</Grid>
                  <Grid item>-20%</Grid>
                  <Grid item>0%</Grid>
                  <Grid item>20%</Grid>
                  <Grid item>40%</Grid>
                  <Grid item>60%</Grid>
                  <Grid item>80%</Grid>
                  <Grid item>100%</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.sectorVolume} data-tour="sectorVolume">
            <Grid container className={classes.volumes}>
              {sectors.length > 0 ? (
                <>
                  {sectors.map((data, i) => (
                    <Grid item className={classes.volume} key={i}>
                      {shortenNumber(data.TotalTradeValue)}
                    </Grid>
                  ))}
                </>
              ) : (
                <>
                  {[...Array(28).keys()].map((i) => (
                    <Grid item className={classes.volume} key={i}>
                      0
                    </Grid>
                  ))}
                </>
              )}
              <Grid item className={classes.emptyBox}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SectorSummary;
