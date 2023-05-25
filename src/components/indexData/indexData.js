import React, { useEffect, useState, useReducer, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CmdTseService from "../../services/cmdTseService";
import {
  coloredPercent,
  comma,
  shortenNumber,
  toJalaliDateTime,
} from "../../shared/utility";
import TimeIcon from "../UI/icons/time";
import Skeleton from "@material-ui/lab/Skeleton";
import LineChart from "../UI/lineChart/lineChart";
import clsx from "clsx";
import useDevice from "../../hooks/useDevice";
import CandleChartIcon from "../UI/icons/candleChart";
import LineChartIcon from "../UI/icons/lineChart";

const useStyles = makeStyles((theme) => ({
  marketItem: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: 10,
    height: "100%",

    justifyContent: "space-between",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  marketItemValue: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
  marketItemValueNumber: {
    fontSize: 20,
  },
  marketItemInfo: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6,
    padding: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stockBackground: {
    position: "absolute",
    top: -60,
    left: -60,
  },
  bodyChart: {
    display: "flex",
    // flex: 1,
    // maxHeight: 370,
    minHeight: 235,
    position: "relative",
    flexDirection: "column",
    marginTop: 10,
  },
  chart: {
    zIndex: 1,
    color: theme.palette.text.secondary,
    margin: "auto",
  },
  line: {
    fill: "none",
    stroke: theme.palette.color.blue,
    strokeWidth: 2,
  },
  marketValues: {
    display: "flex",
    alignItems: "center",
    zIndex: 1,
  },
  marketTitle: {
    color: theme.palette.text.secondary,
  },
  marketNumber: {
    alignItems: "baseline",
  },
  eventDate: {
    position: "absolute",
    top: 10,
    left: 10,
    color: theme.palette.text.secondary,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
  },
  clockIcon: {
    width: 16,
    height: 16,
  },
  numDirection: {
    direction: "ltr",
  },
  action: {
    position: "absolute",
    zIndex: 3,
    right: 0,
    top: -42,
    justifyContent: "flex-end",
  },
  actionItem: {
    display: "flex",
    justifyContent: "flex-end",
  },
  timeFrameBtn: {
    fontSize: 9,
    margin: 3,
    backgroundColor: `${theme.palette.border.secondary}`,
    borderRadius: 6,
    padding: 2,
    minWidth: 32,
    textAlign: "center",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  timeFrameBtnActive: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: `#fff !important`,
    backgroundColor: `${theme.palette.primary.main}`,
  },
  model: {
    marginRight: 20,
  },
  marketItemMobile: {
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
  },
  percentageMobile: {
    fontSize: 12,
  },
  modelIcon: {
    marginLeft: 5,
    height: 24,
    widht: 24,
  },
}));

const IndexData = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const device = useDevice();
  const [market, setMarket] = useState({});
  const [marketData, setMarketData] = useState([]);
  const [chartData, setChartData] = useState();
  const [chartWidth, setChartWidth] = useState(0);
  const [chartModel, setChartModel] = useState("linear");
  const chartContainer = useRef();
  const [timeFrameValue, setTimeFrameValue] = useState("oneYear");

  const initialState = {
    count: 1,
    model: "Year",
    timeFrame: "OneDay",
  };
  const reducer = (chartValues, action) => {
    return {
      count: action.count,
      model: action.model,
      timeFrame: action.timeFrame,
    };
  };
  const [chartValues, dispatch] = useReducer(reducer, initialState);

  let isSubscribed = true;

  useEffect(() => {
    getMarketActivity();
    resize();
    window.addEventListener("resize", resize);
    return () => {
      isSubscribed = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    getMarketActivityHistoryByTimeUnit();
    return () => (isSubscribed = false);
  }, [chartValues, props.tabValue]);

  const getMarketActivity = () => {
    CmdTseService.getMarketActivity((status, data) => {
      if (isSubscribed && data) {
        setMarket(data.Result[props.flowId - 1]);
        setMarketData(data.Result[props.flowId - 1]);
      }
    });
  };

  const getMarketActivityHistoryByTimeUnit = () => {
    const request = {
      FlowId: props.flowId,
      TimeFrameModel: chartValues.timeFrame,
      TimeUnitCount: chartValues.count,
      TimeUnitModel: chartValues.model,
    };

    CmdTseService.getMarketActivityHistoryByTimeUnit(
      request,
      (status, data) => {
        if (isSubscribed && data) setChartData(data.Result);
      }
    );
  };

  let timer;
  const resize = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      setChartWidth(chartContainer.current?.offsetWidth - 22);
    }, 200);
  };

  const timeChangehandler = (value) => {
    dispatch(timeFrameValues[value]);
    setTimeFrameValue(value);
  };

  const timeFrameOptions = [
    {
      title: "1 روز",
      value: "oneDay",
    },
    {
      title: "1 ماه",
      value: "oneMonth",
    },
    {
      title: "1 سال",
      value: "oneYear",
    },
    {
      title: "2 سال",
      value: "twoYears",
    },
  ];

  const timeFrameValues = {
    oneDay: {
      count: 1,
      model: "Day",
      timeFrame: "FiveMin",
    },
    oneMonth: {
      count: 1,
      model: "Month",
      timeFrame: "OneDay",
    },
    oneYear: {
      count: 1,
      model: "Year",
      timeFrame: "OneDay",
    },
    twoYears: {
      count: 2,
      model: "Year",
      timeFrame: "OneDay",
    },
  };

  const chartModelOptions = [
    {
      value: "candle",
      title: (
        <div>
          {device.isMobile && <CandleChartIcon className={classes.modelIcon} />}
          شمعی
        </div>
      ),
    },
    {
      value: "linear",
      title: (
        <div>
          {device.isMobile && <LineChartIcon className={classes.modelIcon} />}
          خطی
        </div>
      ),
    },
  ];

  return (
    <Grid
      container
      className={clsx(
        classes.marketItem,
        device.isMobile && classes.marketItemMobile
      )}
      // spacing={5}
      ref={chartContainer}
    >
      <Grid item>
        <Grid container>
          <Grid item className={classes.stockBackground}>
            {props.flowIconBackground}
          </Grid>
          <Grid item>{props.flowIcon}</Grid>
          <Grid item className={classes.marketValues} data-tour="market">
            <Grid container className={classes.marketItemValue}>
              <Grid item className={classes.marketTitle}>
                {props.flowTitle}
              </Grid>
              <Grid item>
                <Grid container className={classes.marketNumber}>
                  <Grid item className={classes.marketItemValueNumber}>
                    {market.LastIndexLevel ? (
                      comma(parseInt(market.LastIndexLevel))
                    ) : (
                      <Skeleton
                        animation="wave"
                        variant="text"
                        height={30}
                        width={100}
                      />
                    )}
                  </Grid>
                  <Grid item className={clsx(classes.percentageMobile)}>
                    {coloredPercent(
                      parseFloat(
                        market.LastIndexLevelVariationPercentage || 0
                      ).toFixed(2),
                      theme,
                      true,
                      true
                    )}
                    {comma(
                      coloredPercent(
                        parseInt(market.LastIndexLevelVariation || 0),
                        theme,
                        false,
                        false
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={clsx(classes.eventDate, classes.numDirection)}
            data-tour="marketEntryDate"
          >
            <TimeIcon className={classes.clockIcon} />
            {market.EntryDate ? (
              toJalaliDateTime(market.EntryDate)
            ) : (
              <Skeleton
                animation="wave"
                variant="text"
                height={20}
                width={65}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.bodyChart} data-tour="marketChart">
        <LineChart
          data={chartData}
          width={device.isNotMobile ? props.width / 2 - 30 : props.width - 40}
          height={200}
          tickMarkModel={chartValues.model}
          tickMarkCount={chartValues.count}
          model={chartModel}
          timeFrameValue={timeFrameValue}
          timeFrameAction={timeFrameOptions}
          chartModelAction={chartModelOptions}
          onTimeChange={timeChangehandler}
          onChartModel={setChartModel}
        ></LineChart>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={6} data-tour="marketValue">
            <Grid container className={classes.marketItemInfo}>
              <Grid item>ارزش بازار</Grid>
              <Grid item className={classes.numDirection}>
                {shortenNumber(marketData.MarketValue) || 0}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} data-tour="marketTotalNumberOfTrades">
            <Grid container className={classes.marketItemInfo}>
              <Grid item>تعداد معاملات</Grid>
              <Grid item className={classes.numDirection}>
                {shortenNumber(marketData.TotalNumberOfTrades) || 0}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} data-tour="marketTotalTradeValue">
            <Grid container className={classes.marketItemInfo}>
              <Grid item>ارزش معاملات</Grid>
              <Grid item className={classes.numDirection}>
                {shortenNumber(marketData.TotalTradeValue) || 0}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} data-tour="marketTotalNumberOfSharesTraded">
            <Grid container className={classes.marketItemInfo}>
              <Grid item>حجم معاملات</Grid>
              <Grid item className={classes.numDirection}>
                {shortenNumber(marketData.TotalNumberOfSharesTraded) || 0}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(IndexData);
