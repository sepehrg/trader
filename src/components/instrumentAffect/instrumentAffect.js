import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import style from "../../shared/style";
import NextIcon from "../../components/UI/icons/next";
import CmdTseService from "../../services/cmdTseService";
import InstrumentAffectItem from "./instrumentAffectItem/instrumentAffectItem";
import useDevice from "../../hooks/useDevice";
import Tabs from "../../components/UI/Tab/Tabs";
import Tab from "../../components/UI/Tab/Tab";
import TabPanel from "../../components/UI/Tab/TabPanel";
import SwipeableViews from "react-swipeable-views";
import ScrollPager from "../UI/scrollPager/scrollPager";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  rootInstrumentAffect: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: 10,
    height: "100%",
    flexDirection: "column",
  },
  header: {
    width: "100%",
  },
  main: {
    height: "calc(100% - 40px)",
  },
  title: {
    flexWrap: "nowrap",
  },
  mainContent: {},
  instrumentAffectTable: {
    height: "100%",
    overflowX: "hidden",
  },

  mostTitle: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 12,
    margin: 10,
  },
  thirdSectionItemTable: {
    height: "100%",
  },
  thirdSectionIteminner: {
    height: "calc(100% - 45px)",
  },
  nextIcon: {
    width: 20,
    height: 14,
  },
  positiveIcon: {
    transform: "rotate(-90deg)",
    fill: `${theme.palette.color.green}`,
  },
  negetiveIcon: {
    transform: "rotate(90deg)",
    fill: `${theme.palette.color.red}`,
  },
  mostTitlePositive: {
    color: theme.palette.color.green,
  },
  mostGrid: {
    width: "100%",
    zIndex: 1,
  },
  mostRow: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
  },
  mostPositiveStockPrice: {
    color: theme.palette.color.green,
  },
  mostNegetiveStockPrice: {
    color: theme.palette.color.red,
  },
  mostPositiveBar: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundImage: `linear-gradient(to left, ${theme.palette.background.paper}22, ${theme.palette.color.green}99)`,
  },
  mostNegetiveBar: {
    position: "absolute",
    right: 0,
    height: "100%",
    backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper}22, ${theme.palette.color.red}99)`,
  },
  mostRowValue: {
    padding: "5px 10px",
    justifyContent: "space-between",
  },
  mostTitleNegetive: {
    color: theme.palette.color.red,
  },
  width100: {
    width: "100%",
  },
  height100: {
    height: "100%",
  },
  headerMobile: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.box,
  },
  contentMobile: {
    paddingTop: 13,
  },
  rootInstrumentAffectMobile: {
    minHeight: 410,
  },
  mostTitleMobile: {
    fontSize: 12,
  },
  tabs: {
    flexDirection: "column",
  },
  tabMobile: {
    width: "50%",
    zIndex: 1,
    fontSize: 13,
    maxWidth: "none",
  },
  tabPanelItem: {
    width: "100%",
  },
  contentContainerMobile: {
    flexDirection: "column",
    overflow: "hidden",
  },
  swipeableViews: {
    direction: "rtl",
  },
  pagination: {
    direction: "ltr",
    width: "100%",
  },

  contentContainer: {
    flexDirection: "column",
  },
}));

const InstrumentAffect = (props) => {
  const classes = useStyles(props);
  const device = useDevice();

  const [gainer, setGainer] = useState([]);
  const [loser, setLoser] = useState([]);
  const [maxGainer, setMaxGainer] = useState();
  const [maxLoser, setMaxLoser] = useState();
  const [page, setPage] = React.useState(1);

  let isSubscribed = true;

  useEffect(() => {
    getGainerInstruments();
    getLoserInstruments();
    return () => (isSubscribed = false);
  }, []);

  const getGainerInstruments = () => {
    CmdTseService.getGainerInstruments((status, data) => {
      if (data.Result.length > 0 && isSubscribed) {
        setGainer(data.Result);
        if (data.Result[0]) setMaxGainer(Math.abs(data.Result[0].InsAffect));
      }
    });
  };

  const getLoserInstruments = () => {
    CmdTseService.getLoserInstruments((status, data) => {
      if (data.Result.length > 0 && isSubscribed) {
        setLoser(data.Result);
        if (data.Result[0]) setMaxLoser(Math.abs(data.Result[0].InsAffect));
      }
    });
  };

  const scrollChange = (number) => {
    setPage(number + 1);
  };

  const itemGainer = (
    <>
      {device.isMobile && (
        <Grid item className={clsx(classes.header, classes.headerMobile)}>
          <Grid container className={classes.title} spacing={6}>
            <Grid
              item
              className={clsx(
                classes.mostTitle,
                device.isMobile && classes.mostTitleMobile
              )}
              sm={12}
              md={6}
            >
              <NextIcon
                className={clsx(classes.nextIcon, classes.positiveIcon)}
              ></NextIcon>
              بیشترین تاثیر{" "}
              <span className={classes.mostTitlePositive}>مثبت</span> در شاخص
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid
        item
        sm={12}
        md={6}
        className={clsx(device.isMobile && classes.contentMobile)}
        data-tour="Gainers"
      >
        <Grid
          container
          className={clsx(
            device.isMobile && classes.contentContainerMobile,
            device.isNotMobile && classes.contentContainer
          )}
        >
          <Grid item>
            <Grid container spacing={2}>
              {gainer.length > 0 ? (
                <>
                  {gainer
                    .slice(0, device.isNotMobile ? gainer.length : 10)
                    .map((data, i) => (
                      <Grid item className={classes.mostGrid} key={i}>
                        <InstrumentAffectItem
                          insAffect={data.InsAffect}
                          persianCode={data.PersianCode}
                          max={Math.max(maxGainer, maxLoser)}
                          gainer={true}
                        />
                      </Grid>
                    ))}
                </>
              ) : (
                <>
                  {[...Array(device.isNotMobile ? 20 : 10).keys()].map((i) => (
                    <Grid item className={classes.mostGrid} key={i}>
                      <InstrumentAffectItem
                        insAffect={0}
                        persianCode="بدون اطلاعات"
                        max={0}
                        gainer={true}
                      />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const itemLoser = (
    <>
      {device.isMobile && (
        <Grid item className={clsx(classes.header, classes.headerMobile)}>
          <Grid container className={classes.title} spacing={6}>
            <Grid
              item
              className={clsx(
                classes.mostTitle,
                device.isMobile && classes.mostTitleMobile
              )}
              sm={12}
              md={6}
            >
              <NextIcon
                className={clsx(classes.nextIcon, classes.negetiveIcon)}
              ></NextIcon>
              بیشترین تاثیر{" "}
              <span className={classes.mostTitleNegetive}>منفی</span> در شاخص
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid
        item
        sm={12}
        md={6}
        className={clsx(device.isMobile && classes.contentMobile)}
        data-tour="Losers"
      >
        <Grid
          container
          className={clsx(
            device.isMobile && classes.contentContainerMobile,
            device.isNotMobile && classes.contentContainer
          )}
        >
          <Grid item>
            <Grid container spacing={2}>
              {loser.length > 0 ? (
                <>
                  {loser
                    .slice(0, device.isNotMobile ? loser.length : 10)
                    .map((data, i) => (
                      <Grid item className={classes.mostGrid} key={i}>
                        <InstrumentAffectItem
                          insAffect={data.InsAffect}
                          persianCode={data.PersianCode}
                          max={Math.max(maxGainer, maxLoser)}
                          loser={true}
                        />
                      </Grid>
                    ))}
                </>
              ) : (
                <>
                  {[...Array(device.isNotMobile ? 20 : 10).keys()].map((i) => (
                    <Grid item className={classes.mostGrid} key={i}>
                      <InstrumentAffectItem
                        insAffect={0}
                        persianCode="بدون اطلاعات"
                        max={0}
                        loser={true}
                      />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Grid
        container
        className={clsx(
          classes.rootInstrumentAffect,
          device.isMobile && classes.rootInstrumentAffectMobile
        )}
      >
        {device.isNotMobile && (
          <Grid item className={classes.header}>
            <Grid container className={classes.title} spacing={6}>
              <Grid item className={classes.mostTitle} sm={6}>
                <NextIcon
                  className={clsx(classes.nextIcon, classes.positiveIcon)}
                ></NextIcon>
                بیشترین تاثیر{" "}
                <span className={classes.mostTitlePositive}>مثبت</span> در شاخص
              </Grid>
              <Grid item className={classes.mostTitle} sm={6}>
                <NextIcon
                  className={clsx(classes.nextIcon, classes.negetiveIcon)}
                ></NextIcon>
                بیشترین تاثیر{" "}
                <span className={classes.mostTitleNegetive}>منفی</span> در شاخص
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item className={classes.main}>
          <Grid
            container
            className={clsx(
              device.isNotMobile && classes.instrumentAffectTable,
              device.isNotMobile && classes.scrollbarY
            )}
          >
            {device.isNotMobile ? (
              <Grid item>
                <Grid container spacing={6}>
                  <>
                    {itemGainer}
                    {itemLoser}
                  </>
                </Grid>
              </Grid>
            ) : (
              <>
                <SwipeableViews
                  enableMouseEvents
                  onChangeIndex={scrollChange}
                  slideClassName={classes.swipeableViews}
                >
                  {itemGainer}
                  {itemLoser}
                </SwipeableViews>
                <ScrollPager
                  count={2}
                  page={page}
                  paginationClassName={classes.pagination}
                  horizontal
                />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(InstrumentAffect);
