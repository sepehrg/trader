import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { widget } from "../../charting_library/charting_library.min";
import { toJalaliDate } from "../../shared/utility";

const serviceUrls = JSON.parse(localStorage.getItem("urls"));

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const TradingView = (props) => {
  let [symbol, setSymbol] = useState(props.symbol);
  let [tvWidget, setTvWidget] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setTimeout(function () {
      const widgetOptions = {
        symbol: symbol,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
        interval: props.interval,
        container_id: props.containerId,
        library_path: props.libraryPath,
        locale: getLanguageFromURL() || "en",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_symbol_search",
          "widget_logo",
          // "timeframes_toolbar",
          // "header_settings",
          // "header_chart_type",
          // "header_indicators", "header_compare", "compare_symbol",
          "header_screenshot",
          "header_widget_dom_node",
          "header_saveload",
        ],
        // enabled_features: ["study_templates"],
        charts_storage_url: props.chartsStorageUrl,
        charts_storage_api_version: props.chartsStorageApiVersion,
        client_id: props.clientId,
        user_id: props.userId,
        fullscreen: props.fullscreen,
        autosize: props.autosize,
        studies_overrides: props.studiesOverrides,
        // timezone: "Asia/Tehran",
        timeframe: "fa",
        toolbar_bg: theme.palette.background.default,
        loading_screen: { backgroundColor: theme.palette.background.default },
        overrides: {
          "paneProperties.background": theme.palette.background.default,
          "paneProperties.vertGridProperties.color":
            theme.palette.border.secondary,
          "paneProperties.horzGridProperties.color":
            theme.palette.border.secondary,
          "scalesProperties.textColor": theme.palette.text.secondary,
          "paneProperties.crossHairProperties.color":
            theme.palette.primary.main,
          "mainSeriesProperties.candleStyle.upColor": theme.palette.color.green,
          "mainSeriesProperties.candleStyle.downColor": theme.palette.color.red,
          "chartproperties.dataWindowProperties.font": "IRANSans",
        },
        customFormatters: {
          dateFormatter: {
            format(date) {
              return toJalaliDate(date);
              // const options = {
              //   year: "numeric",
              //   month: "long",
              //   day: "numeric",
              // };
              // return date.toLocaleDateString("fa-IR") + " " + days[date.getDay() - 1]
              // return date.toLocaleDateString("fa-IR", options);
            },
            formatLocal(date) {
              return toJalaliDate(date);
            },
          },
          timeFormatter: {
            format(date) {
              // return toJalaliDateTime(date).split(" ")[1];
              const time = new Date(date);
              return (
                (time.getMinutes() - 30 >= 0
                  ? time.getHours() - 3 < 10
                    ? "0" + (time.getHours() - 3)
                    : time.getHours() - 3
                  : time.getHours() - 4) +
                ":" +
                (time.getMinutes() - 30 > 0
                  ? time.getMinutes() - 30 < 10
                    ? "0" + (time.getMinutes() - 30)
                    : time.getMinutes() - 30
                  : time.getMinutes() - 30 === 0
                  ? "00"
                  : time.getMinutes() + 30) +
                ":" +
                (time.getSeconds() < 10
                  ? "0" + time.getSeconds()
                  : time.getSeconds())
              );
            },
            formatLocal(date) {
              // return toJalaliDateTime(date).split(" ")[1];
              const time = new Date(date);
              return (
                (time.getMinutes() - 30 >= 0
                  ? time.getHours() - 3 < 10
                    ? "0" + (time.getHours() - 3)
                    : time.getHours() - 3
                  : time.getHours() - 4) +
                ":" +
                (time.getMinutes() - 30 > 0
                  ? time.getMinutes() - 30 < 10
                    ? "0" + (time.getMinutes() - 30)
                    : time.getMinutes() - 30
                  : time.getMinutes() - 30 === 0
                  ? "00"
                  : time.getMinutes() + 30) +
                ":" +
                (time.getSeconds() < 10
                  ? "0" + time.getSeconds()
                  : time.getSeconds())
              );
            },
          },
        },
        theme: theme.palette.type,
        custom_css_url: "./custom.css",
      };

      const tvWidgetOption = new widget(widgetOptions);

      // tvWidgetOption.onChartReady(() => {
      //   tvWidgetOption.addCustomCSSFile("./custom.css");
      // });

      // tvWidgetOption.onChartReady(() => {
      //   tvWidgetOption.load();
      // });

      setTvWidget(tvWidgetOption);

      // tvWidgetOption.onChartReady(() => {
      //   // tvWidget.headerReady().then(() => {
      //   const button = tvWidgetOption
      //     .createButton()
      //     .attr("title", "Click to show a notification popup")
      //     .addClass("apply-common-tooltip")
      //     .on("click", () =>
      //       tvWidgetOption.showNoticeDialog({
      //         title: "Notification",
      //         body: "TradingView Charting Library API works correctly",
      //         callback: () => {
      //           console.log("Noticed!");
      //         },
      //       })
      //     );
      //   button[0].innerHTML = "Check API";
      // });

      return () => {
        if (tvWidget !== null) {
          tvWidget.remove();
          tvWidget = null;
        }
      };
    }, 1000);
  }, [theme]);

  useEffect(() => {
    if (symbol != props.symbol) {
      setSymbol(props.symbol);
      tvWidget.setSymbol(props.symbol, props.interval, () => {});
    }
  }, [props.symbol]);

  return <div id={props.containerId} className={props.className} />;
};

TradingView.defaultProps = {
  symbol: "فولاد",
  interval: "D",
  containerId: "tv_chart_container",
  datafeedUrl: serviceUrls?.CmdTseUrl + "/CmdTse",
  libraryPath: "/charting_library/",
  chartsStorageUrl: "https://saveload.tradingview.com",
  chartsStorageApiVersion: "1.1",
  clientId: "tradingview.com",
  userId: "public_user_id",
  fullscreen: false,
  autosize: true,
  studiesOverrides: {},
  custom_css_url: "./custom.css",
};
export default TradingView;
