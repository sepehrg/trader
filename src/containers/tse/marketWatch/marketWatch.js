import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CmdTseService from "../../../services/cmdTseService";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import WatchListIcon from "../../../components/UI/icons/watchList";
import Typography from "@material-ui/core/Typography";
import Table from "../../../components/UI/Table/Table";
import TradePrice from "../../../components/tradePrice/tradePrice";
import PersianCode from "../../../components/persianCode/persianCode";
import Volume from "../../../components/volumeBar/volumeBar";
import { comma, shortenNumber } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import MessageTypes from "../../../enums/messageTypes";
import Components from "../../../enums/components";
import clsx from "clsx";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: 10,
    flexDirection: "column",
  },
  header: {
    padding: 10,
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
  },
  forScroll: {
    height: "calc(100% - 48px)",
    overflowY: "scroll",
  },
  table: {
    borderCollapse: "collapse",
    flexWrap: "nowrap",
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.default,
    },
    "& thead, & tbody tr": {
      width: "100%",
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.box,
    // borderBottom: `3px solid ${theme.palette.background.default}`,
    // transition: "0.3s",
    height: 39,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  date: {
    direction: "ltr",
  },
  filter: {
    padding: theme.spacing(6),
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  filterBtn: {
    minWidth: 100,
    height: "100%",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  toolbarBtn: {
    margin: `auto 3px`,
    cursor: "pointer",
    "&:hover $toolbarIcon": {
      fill: theme.palette.primary.main,
    },
  },
  toolbarIcon: {
    height: 20,
    width: 20,
  },
  direction: {
    direction: "ltr",
  },

  fullHeight: {
    height: "100%",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
  },
}));

const MarketWatch = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const pageSize = Math.round(
    (window.innerHeight - (70 + 20 + 48 + 52 - 40)) / 43
  );

  const [filter, setFilter] = useState({
    take: pageSize,
    page: 1,
    startDate: new Date(new Date().setDate(new Date().getDate() - 31)),
    endDate: new Date(),
    instrument: null,
  });
  const dataRef = React.createRef();
  dataRef.current = data;

  const getData = () => {
    const request = {
      optionalFilter: {
        take: filter.take,
        page: filter.page,
      },
      reportFilter: {
        dateFilter: {
          startDate: filter.startDate,
          endDate: filter.endDate,
        },
        searchItem: filter.instrument
          ? [{ property: "isin", value: filter.instrument.Isin, operation: 0 }]
          : [],
      },
    };
    setLoading(true);
    CmdTseService.getMarketWatchInfos(request, (status, response) => {
      unsubscribeAll(data);
      if (response) {
        setData(response.Result);
        dataRef.current = response.Result;
        setTotalRecords(response.TotalRecords);
        subscribeAll(response.Result);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, [filter.page, filter.take]);

  useEffect(() => {
    return () => {
      unsubscribeAll(dataRef.current);
    };
  }, []);

  const subscribeAll = (data) => {
    const instrumentIds = data.map((i) => i.InstrumentId);
    props.subscribeAll(
      instrumentIds,
      MessageTypes.Trade,
      Components.MarketWatch
    );
    props.subscribeAll(
      instrumentIds,
      MessageTypes.ClosingPrice,
      Components.MarketWatch
    );
    props.subscribeAll(
      instrumentIds,
      MessageTypes.ClientTrade,
      Components.MarketWatch
    );
  };

  const unsubscribeAll = (data) => {
    const instrumentIds = data.map((i) => i.InstrumentId);
    if (instrumentIds.length > 0) {
      props.unsubscribeAll(
        instrumentIds,
        MessageTypes.Trade,
        Components.MarketWatch
      );
      props.unsubscribeAll(
        instrumentIds,
        MessageTypes.ClosingPrice,
        Components.MarketWatch
      );
      props.unsubscribeAll(
        instrumentIds,
        MessageTypes.ClientTrade,
        Components.MarketWatch
      );
    }
  };

  const pageChangeHandler = (page) => {
    setFilter({ ...filter, page });
  };

  const rowsPerPageChangeHandler = (take) => {
    setFilter({ ...filter, take });
  };

  const formatTradePrice = (
    last,
    priceVariation,
    priceVariationPercentage,
    instrumentId,
    type
  ) => (
    <TradePrice
      type={type}
      instrumentId={instrumentId}
      last={last}
      variation={priceVariation}
      percentage={priceVariationPercentage}
    ></TradePrice>
  );

  const formatPersianCode = (value, instrumentStateId, instrumentId) => {
    return (
      <PersianCode
        instrument={{
          PersianCode: value,
          InstrumentStateId: instrumentStateId,
          InstrumentId: instrumentId,
        }}
      ></PersianCode>
    );
  };

  const formatVolume = (value, volume, instrumentId, type) => (
    <Volume
      buy={value}
      sell={volume}
      instrumentId={instrumentId}
      type={type}
    ></Volume>
  );

  const schema = {
    columns: [
      {
        field: "PersianCode",
        title: "نماد",
        format: formatPersianCode,
        additionals: ["InstrumentStateId", "InstrumentId"],
        width: "7.5%",
      },
      {
        field: "Title",
        title: "شرکت",
        width: "12.5%",
      },
      {
        field: "LastTradePrice",
        title: "قیمت آخرین معامله",
        format: (...args) => formatTradePrice(...args, "trade"),
        additionals: [
          "PriceVariation",
          "PriceVariationPercentage",
          "InstrumentId",
        ],
        width: "12.5%",
      },
      {
        field: "ClosingPrice",
        title: "قیمت پایانی",
        format: (...args) => formatTradePrice(...args, "closingPrice"),
        additionals: [
          "ClosingPriceVariation",
          "ClosingPriceVariationPercentage",
          "InstrumentId",
        ],
        width: "12.5%",
      },
      {
        field: "TotalNumberOfSharesTraded",
        title: "حجم معامله",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
        width: "7%",
      },
      {
        field: "TotalNumberOfTrades",
        title: "تعداد معامله",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
        width: "7%",
      },
      {
        field: "TotalTradeValue",
        title: "ارزش معاملات",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
        width: "7%",
      },
      {
        field: "PreviousDayPrice",
        title: "قیمت روز قبل",
        format: (value) => comma(value),
        width: "7%",
      },
      {
        field: "BuyIndividualVolume",
        title: "معاملات حقیقی (حجم)",
        format: (...args) => formatVolume(...args, "Individual"),
        additionals: ["SellIndividualVolume", "InstrumentId"],
        width: "13.5%",
      },
      {
        field: "BuyFirmVolume",
        title: "معاملات حقوقی (حجم)",
        format: (...args) => formatVolume(...args, "Firm"),
        additionals: ["SellFirmVolume", "InstrumentId"],
        width: "13.5%",
      },
    ],
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item className={classes.fullHeight} data-tour="marketWatch">
          <Grid container className={classes.box}>
            <Grid item className={classes.header}>
              <WatchListIcon className={classes.icon}></WatchListIcon>
              <Typography variant="h2" className={classes.title}>
                دیده‌بان بازار
              </Typography>
            </Grid>
            <Grid item className={classes.forScroll}>
              <Table
                className={classes.table}
                rowClassName={classes.tableRow}
                schema={schema}
                data={data}
                totalRecords={totalRecords}
                loading={loading}
                paging
                rowsPerPage={filter.take}
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={rowsPerPageChangeHandler}
                pageSize={pageSize}
                highlight
              ></Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Tour
        steps={steps.marketWatch}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.subscribeAll(instrumentIds, messageType, component)),
    unsubscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.unsubscribeAll(instrumentIds, messageType, component)),
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketWatch);
