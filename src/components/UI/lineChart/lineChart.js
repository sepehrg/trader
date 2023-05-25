import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { createChart } from "lightweight-charts";
import {
  comma,
  toJalaliDate,
  toJalaliDateTimeNoSecond,
  shortenNumber,
} from "../../../shared/utility";
import Spinner from "../spinner/spinner";
import Grid from "@material-ui/core/Grid";
import Link from "../../UI/Link/Link";
import useDevice from "../../../hooks/useDevice";
import DropDownList from "../../UI/DropDownList/DropDownList";

const useStyles = makeStyles((theme) => ({
  root: {
    // direction: "ltr",
  },
  spinner: {
    margin: "auto",
  },
  tooltip: {
    // width: 80,
    // height: 40,
    position: "absolute",
    display: "none",
    padding: "4px 8px",
    // boxSizing: "border-box",
    fontSize: 14,
    color: theme.palette.text.primary,
    backgroundColor: `${theme.palette.background.box}cc`,
    textAlign: "left",
    zIndex: 1000,
    // top: 12,
    // left: 12,
    // pointerEvents: "none",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },
  tolltipTime: {
    color: theme.palette.text.secondary,
    fontSize: 11,
  },

  // timeFrame Button Styles //
  action: {
    justifyContent: "space-between",
  },
  timeFrameBtn: {
    fontSize: 9,
    color: theme.palette.text.secondary,
    backgroundColor: `${theme.palette.border.secondary}`,
    borderRadius: 6,
    padding: 2,
    minWidth: 32,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeFrameBtnMobile: {
    fontSize: 12,
    backgroundColor: `${theme.palette.text.secondary}22`,
    height: 24,
    borderRadius: 100,
    width: 55,
  },
  timeFrameBtnActive: {
    color: `#fff`,
    backgroundColor: `${theme.palette.primary.main}`,
  },
  rootMobile: {
    order: 1,
  },
  mainMobile: {
    order: 2,
  },
  actionMobile: {
    flexWrap: "nowrap",
    overflow: "scroll hidden",
  },
  modelAction: {
    flexWrap: "nowrap",
  },
  timeFrameAction: {
    flexWrap: "nowrap",
  },
  selectMenuMobile: {
    height: 32,
    fontSize: 12,
  },
  selectIconMobile: {
    width: 28,
    height: 28,
    top: 4,
  },
  containerDropDownMobile: {
    justifyContent: "flex-end",
  },
}));

const LineChart = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = useTheme();
  const myRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (props.data) {
      setLoading(false);
      setTimeout(function () {
        drawChart();
      }, 100);
    }
  }, [
    theme,
    props.width,
    props.height,
    props.data,
    props.model,
    myRef.current,
  ]);

  const drawChart = () => {
    if (myRef.current) {
      myRef.current.innerHTML = "";

      const chart = createChart(myRef.current, {
        width: props.width,
        height: props.height,
        rightPriceScale: {
          scaleMargins: {
            top: 0.2,
            bottom: 0.2,
          },
          borderVisible: false,
        },
        // timeScale: {
        //   borderVisible: true,
        // },
        layout: {
          backgroundColor: "transparent",
          textColor: theme.palette.text.secondary,
          fontSize: 10,
          fontFamily: theme.typography.fontFamily,
        },
        grid: {
          vertLines: {
            color: "rgba(70, 130, 180, 0.5)",
            style: 1,
            visible: false,
          },
          horzLines: {
            color: "rgba(70, 130, 180, 0.5)",
            style: 1,
            visible: true,
          },
        },
        crosshair: {
          vertLine: {
            color: `${theme.palette.text.primary}55`,
            width: 1,
            style: 3,
            visible: true,
            labelVisible: false,
          },
          horzLine: {
            color: `${theme.palette.text.primary}55`,
            width: 1,
            style: 3,
            visible: true,
            labelVisible: true,
          },
          mode: 1,
        },
        priceScale: {
          position: "right",
          // mode: 2,
          // autoScale: false,
          // invertScale: true,
          // alignLabels: false,
          borderVisible: false,
          // borderColor: "#999",
          // scaleMargins: {
          //   top: 0.3,
          //   bottom: 0.25,
          // },
        },
        watermark: {
          // color: "rgba(11, 94, 29, 0.4)",
          // visible: true,
          // text: "TradingView Watermark Example",
          // fontSize: 24,
          // horzAlign: "left",
          // vertAlign: "bottom",
        },
        localization: {
          locale: "fa-IR",
          priceFormatter: function (price) {
            return shortenNumber(price);
          },
          dateFormat: "dd MMMM",
        },
        timeScale: {
          borderVisible: true,
          tickMarkFormatter: (time) => {
            // const date = new Date(time.year, time.month, time.day);
            const date = new Date(time * 1000);
            return props.tickMarkModel === "Day"
              ? date.getHours() +
                  ":" +
                  (date.getMinutes() === 0 ? "00" : date.getMinutes())
              : toJalaliDate(
                  (date.getMonth() === 0
                    ? date.getFullYear() - 1
                    : date.getFullYear()) +
                    "/" +
                    (date.getMonth() === 0 ? 12 : date.getMonth()) +
                    "/" +
                    date.getDate()
                );
          },
        },
        handleScroll: !device.isMobile,
        handleScale: !device.isMobile,
      });

      var areaSeries =
        props.model === "linear"
          ? chart.addAreaSeries({
              topColor: `${theme.palette.primary.main}88`,
              bottomColor: `${theme.palette.primary.main}08`,
              lineColor: theme.palette.primary.main,
              lineWidth: 2,
            })
          : chart.addCandlestickSeries({
              upColor: theme.palette.color.green,
              downColor: theme.palette.color.red,
              borderDownColor: theme.palette.color.red,
              borderUpColor: theme.palette.color.green,
              wickDownColor: theme.palette.color.red,
              wickUpColor: theme.palette.color.green,
            });

      areaSeries.setData(
        [...Array(props.data.length).keys()].map((i) => ({
          time: new Date(props.data[i].TradeDate).getTime() / 1000,
          value: props.data[i].C,
          open: props.data[i].O,
          high: props.data[i].H,
          low: props.data[i].L,
          close: props.data[i].C,
        }))
      );

      chart.timeScale().fitContent();

      const toolTipWidth = 80;
      const toolTipHeight = 50;
      const toolTipMargin = 0;

      const toolTip = document.createElement("div");
      toolTip.className = classes.tooltip;
      myRef.current.appendChild(toolTip);

      // update tooltip
      // props.model === "linear" &&
      chart.subscribeCrosshairMove(function (param) {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > myRef.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > myRef.current.clientHeight
        ) {
          toolTip.style.display = "none";
        } else {
          const dateStr = new Date(param.time * 1000);
          toolTip.style.display = "block";
          const price = param.seriesPrices.get(areaSeries);
          toolTip.innerHTML =
            props.model === "linear"
              ? comma(Math.round(100 * price) / 100) +
                `<br><div class="${classes.tolltipTime}">` +
                (props.tickMarkModel === "Day"
                  ? toJalaliDateTimeNoSecond(dateStr).split(" ")[0]
                  : toJalaliDate(dateStr)) +
                "</div>"
              : (props.tickMarkModel === "Day"
                  ? comma(Math.round(100 * price.close) / 100)
                  : `<span class="${classes.tolltipTime}">O: </span>` +
                    comma(Math.round(100 * price.open) / 100) +
                    `<br><span class="${classes.tolltipTime}">H: </span>` +
                    comma(Math.round(100 * price.high) / 100) +
                    `<br><span class="${classes.tolltipTime}">L: </span>` +
                    comma(Math.round(100 * price.low) / 100) +
                    `<br><span class="${classes.tolltipTime}">C: </span>` +
                    comma(Math.round(100 * price.close) / 100)) +
                `<br><div class="${classes.tolltipTime}">` +
                (props.tickMarkModel === "Day"
                  ? toJalaliDateTimeNoSecond(dateStr).split(" ")[0]
                  : toJalaliDate(dateStr)) +
                "</div>";
          const coordinate = areaSeries.priceToCoordinate(
            props.model === "linear" ? price : price.close
          );
          var shiftedCoordinate = param.point.x - 50;
          if (coordinate === null) {
            return;
          }
          shiftedCoordinate = Math.max(
            0,
            Math.min(
              myRef.current.clientWidth - toolTipWidth,
              shiftedCoordinate
            )
          );
          var coordinateY =
            coordinate - toolTipHeight - toolTipMargin > 0
              ? coordinate - toolTipHeight - toolTipMargin
              : Math.max(
                  0,
                  Math.min(
                    myRef.current.clientHeight - toolTipHeight - toolTipMargin,
                    coordinate + toolTipMargin
                  )
                );
          toolTip.style.left = shiftedCoordinate + "px";
          toolTip.style.top = coordinateY + "px";
        }
      });
    }
  };

  return (
    <>
      {device.isNotMobile ? (
        <Grid
          item
          xs={12}
          className={clsx(device.isMobile && classes.mainMobile)}
        >
          <Grid
            container
            className={clsx(
              classes.action,
              device.isMobile && classes.actionMobile
            )}
            spacing={6}
          >
            <Grid item>
              <Grid container spacing={4} className={classes.timeFrameAction}>
                {props.timeFrameAction.map((action, i) => (
                  <Grid item key={i}>
                    <Link
                      onClick={() => {
                        props.onTimeChange(
                          action.value
                          //   {
                          //   count: action.count,
                          //   model: action.model,
                          //   timeFrame: action.timeFrame,
                          // }
                        );
                      }}
                      className={clsx(
                        classes.timeFrameBtn,
                        device.isMobile && classes.timeFrameBtnMobile,
                        props.timeFrameValue === action.value &&
                          classes.timeFrameBtnActive
                      )}
                    >
                      {action.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={4} className={classes.modelAction}>
                {props.chartModelAction.map((action, i) => (
                  <Grid item key={i}>
                    <Link
                      onClick={() => {
                        props.onChartModel(action.value);
                      }}
                      className={clsx(
                        classes.timeFrameBtn,
                        device.isMobile && classes.timeFrameBtnMobile,
                        props.model === action.value &&
                          classes.timeFrameBtnActive
                      )}
                    >
                      {action.title}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={6} className={classes.containerDropDownMobile}>
          <Grid item>
            <DropDownList
              textField="title"
              valueField="value"
              // className={classes.dropdownlist}
              options={props.timeFrameAction}
              onChange={(e) => {
                props.onTimeChange(e.target.value);
              }}
              value={props.timeFrameValue}
              // inputLabelOutlined={classes.inputLabel}
              selectMenuClassName={classes.selectMenuMobile}
              selectIconClassName={classes.selectIconMobile}
            ></DropDownList>
          </Grid>
          <Grid item>
            <DropDownList
              textField="title"
              valueField="value"
              // className={classes.dropdownlist}
              options={props.chartModelAction}
              onChange={(e) => {
                props.onChartModel(e.target.value);
              }}
              value={props.model}
              // inputLabelOutlined={classes.inputLabel}
              selectMenuClassName={classes.selectMenuMobile}
              selectIconClassName={classes.selectIconMobile}
            ></DropDownList>
          </Grid>
        </Grid>
      )}
      {!loading ? (
        <div
          className={clsx(
            classes.root,
            props.className,
            device.isMobile && classes.rootMobile
          )}
          ref={myRef}
        ></div>
      ) : (
        <Spinner size={32} className={classes.spinner} />
      )}
    </>
  );
};

export default LineChart;
