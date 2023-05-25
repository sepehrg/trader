import React, {
  useEffect,
  useState,
  useReducer,
  useRef,
  useCallback,
} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import LineChart from "../UI/lineChart/lineChart";
import Link from "../UI/Link/Link";
import clsx from "clsx";
import CmdTseService from "../../services/cmdTseService";
import useDevice from "../../hooks/useDevice";
import CandleChartIcon from "../UI/icons/candleChart";
import LineChartIcon from "../UI/icons/lineChart";

const useStyles = makeStyles((theme) => ({
  rootChart: {
    padding: 6,
    minHeight: 211,
    position: "relative",
  },
  modelIcon: {
    marginLeft: 5,
    height: 24,
    widht: 24,
  },
}));

const TradeChart = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const container = useRef();

  const [chartData, setChartData] = useState();
  const [chartModel, setChartModel] = useState("linear");
  const [timeFrameValue, setTimeFrameValue] = useState("oneMonth");
  const [width, setWidth] = useState(
    !props.widget
      ? device.isNotMobile
        ? props.width - 80
        : props.width - 26
      : props.width
  );
  const [height, setHeight] = useState(
    !props.widget
      ? device.isNotMobile
        ? props.height
        : props.height - 110
      : props.height
  );

  const initialState = {
    count: 1,
    model: "Month",
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
  let previousIsin = "";

  useEffect(() => {
    setTimeout(function () {
      if (props.instrument)
        getInstrumentTradeHistoryByTimeUnit(props.instrument);
    }, 1000);

    return () => {
      previousIsin = props.instrument?.Isin;
    };
  }, [chartValues, props.instrument]);

  useEffect(() => {
    return () => (isSubscribed = false);
  }, []);

  const getInstrumentTradeHistoryByTimeUnit = (instrument) => {
    if (instrument.Isin !== previousIsin) {
      const request = {
        Isin: instrument.Isin,
        TimeFrameModel: chartValues.timeFrame,
        TimeUnitCount: chartValues.count,
        TimeUnitModel: chartValues.model,
      };

      CmdTseService.getInstrumentTradeHistoryByTimeUnit(
        request,
        (status, data) => {
          if (isSubscribed && data) {
            setChartData(data.Result);
          }
        }
      );
    }
  };

  const timeChangehandler = (value) => {
    dispatch(timeFrameValues[value]);
    setTimeFrameValue(value);
  };

  const timeFrameOptions = [
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

  useEffect(() => {
    if (props.widgetSize) {
      const widgetWidth =
        ((document.body.clientWidth - 190) / 12) * props.widgetSize.w;
      const widgetHeight = 15 * props.widgetSize.h;
      setWidth(widgetWidth);
      setHeight(widgetHeight);
    }
  }, [props.widgetSize]);

  return (
    <Grid container className={classes.rootChart}>
      <LineChart
        data={chartData}
        width={width}
        height={height}
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
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
  };
};

export default connect(mapStateToProps)(TradeChart);
