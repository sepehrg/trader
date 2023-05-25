import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MessageTypes from "../../../enums/messageTypes";
import Link from "../../UI/Link/Link";
import style from "../../../shared/style";
import Skeleton from "@material-ui/lab/Skeleton";
import MoreIcon from "../../UI/icons/more";
import {
  coloredPercent,
  comma,
  replaceItemAtIndex,
  shortenNumber,
} from "../../../shared/utility";
import Table from "../../UI/Table/Table";
import PersianCode from "../../persianCode/persianCode";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  top: {
    padding: "10px 13px",
  },
  title: {
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  link: {
    padding: `0 ${theme.spacing(3)}px`,
    "&:hover $icon": {
      fill: theme.palette.primary.main,
    },
  },
  icon: {},
  moreIcon: {
    transform: "rotate(-90deg)",
    width: 16,
    height: 16,
  },
  main: {
    flexDirection: "column",
    overflowX: "hidden",
    padding: "0 10px 10px",
    direction: "ltr",
  },
  watchlistContainer: {
    height: "100%",
    flexFlow: "column nowrap",
    direction: "rtl",
  },
  watchListBtn: {
    display: "flex",
    alignItems: "center",
  },
  table: {
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.box,
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `4px solid ${theme.palette.background.box}`,
    transition: "0.3s",
    height: 39,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },

  tradePrice: {
    justifyContent: "center",
  },
  numDirection: {
    direction: "ltr",
  },
}));

const AdvancedWatchlist = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [instruments, setInstruments] = useState(null);

  useEffect(() => {
    setInstruments(props.instruments);
  }, [props.instruments]);

  useEffect(() => {
    if (instruments && instruments.length > 0) {
      props.socket.on(MessageTypes.Trade, listenTrade);
    }
    return () => {
      if (instruments && instruments.length > 0) {
        props.socket.off(MessageTypes.Trade, listenTrade);
      }
    };
  }, [instruments]);

  const listenTrade = (trade) => {
    const index = instruments.findIndex(
      (i) =>
        i.InstrumentId === trade.InstrumentId &&
        i.LastTradePrice !== trade.LastTradePrice
    );
    if (index !== -1)
      setInstruments(
        replaceItemAtIndex(instruments, index, {
          ...instruments[index],
          LastTradePrice: trade.LastTradePrice,
          PriceVariationPercentage: trade.PriceVariationPercentage,
        })
      );
  };

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

  const tradePriceVariation = (value, variation) => {
    return (
      <Grid container className={classes.tradePrice} spacing={2}>
        <Grid item>{coloredPercent(value, theme, true, true)}</Grid>
        <Grid item>{coloredPercent(variation, theme)}</Grid>
      </Grid>
    );
  };

  const numDirection = (value) => {
    return <div className={classes.numDirection}>{shortenNumber(value)}</div>;
  };

  const schema = {
    columns: [
      {
        field: "PersianCode",
        title: "نماد",
        format: formatPersianCode,
        additionals: ["InstrumentStateId", "InstrumentId"],
      },
      {
        field: "Title",
        title: "نام شرکت",
      },
      {
        field: "TotalNumberOfTrades",
        title: "تعداد معاملات",
        format: (value) => numDirection(value),
      },
      {
        field: "TotalNumberOfSharesTraded",
        title: "حجم معاملات",
        format: (value) => numDirection(value),
      },
      {
        field: "TotalTradeValue",
        title: "ارزش معاملات",
        format: (value) => numDirection(value),
      },
      {
        field: "LastTradePrice",
        title: "آخرین قیمت",
        format: (value) => comma(value),
      },
      {
        field: "PriceVariationPercentage",
        title: "درصد تغییر قیمت",
        format: (value, variation) => tradePriceVariation(value, variation),
        additionals: ["PriceVariation"],
      },
      {
        field: "ClosingPrice",
        title: "قیمت پایانی",
        format: (value) => comma(value),
      },
      {
        field: "ClosingPriceVariationPercentage",
        title: "درصد تغییر پایانی",
        format: (value, variation) => tradePriceVariation(value, variation),
        additionals: ["ClosingPriceVariation"],
      },
    ],
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.top}>
        <Grid container className={classes.title}>
          <Grid item className={classes.watchListBtn}>
            <Link
              tooltipPlacement="bottom"
              title="دیده بان ها"
              onClick={() => props.setHotListOpen(true)}
              className={classes.link}
            >
              <MoreIcon className={clsx(classes.icon, classes.moreIcon)} />
              {props.title ? (
                props.title
              ) : (
                <Skeleton
                  animation="wave"
                  variant="text"
                  height={25}
                  width={50}
                />
              )}
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.main, classes.scrollbarY)}>
        <Grid container className={classes.watchlistContainer}>
          {instruments ? (
            <Table
              className={classes.table}
              rowClassName={classes.tableRow}
              data={instruments}
              schema={schema}
              onRowClick={props.onClick}
            ></Table>
          ) : (
            [...Array(10).keys()].map((i) => (
              <Skeleton key={i} animation="wave" variant="text" height={100} />
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInstrument: (isin) => dispatch(actions.setInstrument(isin)),
    subscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.subscribeAll(instrumentIds, messageType, component)),
    unsubscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.unsubscribeAll(instrumentIds, messageType, component)),
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    setBackButton: (state) => dispatch(actions.setBackButton(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedWatchlist);
