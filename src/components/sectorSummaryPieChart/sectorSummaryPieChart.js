import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../shared/style";
import CmdTseService from "../../services/cmdTseService";
import clsx from "clsx";
import PieChart from "../UI/pieChart/pieChart";
import useDevice from "../../hooks/useDevice";

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
    justifyContent: "center",
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
    // height: 200,
    overflow: "hidden auto",
  },
  pieChart: {
    height: 200,
    width: 200,
  },
  svg: {
    width: "100%",
    height: "100%",
    transform: "rotate(-90deg)",
    borderRadius: "50%",
    backgroundColor: "#ff9800",
  },
  slice1: {
    fill: "transparent",
    stroke: "#9c27b0",
    strokeWidth: 32,
  },
  slice2: {
    fill: "transparent",
    stroke: "#213dab",
    strokeWidth: 32,
  },
  slice3: {
    fill: "transparent",
    stroke: "#27b040",
    strokeWidth: 32,
  },
  section1: {
    transform: "rotate(0deg)",
    transformOrigin: "0 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: "50%",
    "& $div": {
      backgroundColor: "#ff6384",
      width: "100%",
      height: "100%",
    },
  },
  section2: {
    transform: "rotate(0deg)",
    transformOrigin: "0 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: "50%",
    "& $div": {
      backgroundColor: "#36a2eb",
      width: "100%",
      height: "100%",
    },
  },
  section3: {
    transform: "rotate(0deg)",
    transformOrigin: "0 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: "50%",
    "& $div": {
      backgroundColor: "#ffce56",
      width: "100%",
      height: "100%",
    },
  },
  section4: {
    transform: "rotate(0deg)",
    transformOrigin: "0 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: "50%",
    "& $div": {
      backgroundColor: "#f58231",
      width: "100%",
      height: "100%",
    },
  },
  section5: {
    transform: "rotate(0deg)",
    transformOrigin: "0 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: "50%",
    "& $div": {
      backgroundColor: "#76B7B2",
      width: "100%",
      height: "100%",
    },
  },
  section6: {
    transform: "rotate(0deg)",
    transformOrigin: "100% 50%",
    position: "absolute",
    width: "50%",
    height: "100%",
    left: " 0%",
    "& $div": {
      backgroundColor: theme.palette.border.bar,
      width: "100%",
      height: "100%",
    },
  },

  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    padding: "3px 6px",
    flexDirection: "column",
    height: "100%",
  },
  mainMobile: {
    height: 730,
  },
}));

const SectorSummaryPieChart = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const device = useDevice();

  const [data, setData] = useState([]);
  const [sum, setSum] = useState();

  let isSubscribed = true;

  useEffect(() => {
    getSectorsSummary();
    return () => (isSubscribed = false);
  }, []);

  const getSectorsSummary = () => {
    CmdTseService.getSectorsSummary((status, data) => {
      if (data.Result && isSubscribed) {
        setSum(data.Result.reduce((x, y) => (x = x + y.TotalTradeValue), 0));
        setData([
          ...data.Result.slice(0, 13),
          {
            SectorTitle: "سایر صنایع",
            TotalTradeValue: data.Result.slice(13, data.Result.lenght).reduce(
              (x, y) => (x = x + y.TotalTradeValue),
              0
            ),
          },
        ]);
      }
    });
  };

  return (
    <Grid
      container
      className={device.isNotMobile ? classes.root : classes.boxMobile}
    >
      <Grid item className={classes.header}>
        ارزش معاملات صنایع
      </Grid>
      <Grid item className={clsx(classes.items, classes.scrollbarY)}>
        <Grid
          container
          className={clsx(classes.main, device.isMobile && classes.mainMobile)}
        >
          <PieChart
            data={data}
            // width={device.isNotMobile ? 820 : 270}
            width={device.isNotMobile ? props.width : props.width - 30}
            height={300}
            margin={0}
            innerRadius={50}
            outerRadius={100}
            sum={sum}
          ></PieChart>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(SectorSummaryPieChart);
