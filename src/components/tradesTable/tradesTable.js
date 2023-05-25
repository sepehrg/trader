import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "../UI/Table/Table";
import BuyIcon from "../UI/icons/buy";
import SellIcon from "../UI/icons/sell";
import { comma, toJalaliDateTime } from "../../shared/utility";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import TradesItem from "./tradesItem/tradesItem";
import useDevice from "../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: `0px  ${theme.spacing(4)}px`,
  },
  item: {},
  table: {
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.box,
      color: theme.palette.text.secondary,
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    // borderBottom: `4px solid ${theme.palette.background.box}`,
    // transition: "0.3s",
    height: 39,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.box,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  operationsIcon: {
    width: 23,
    height: 23,
    margin: `0px ${theme.spacing(0.5)}px`,
  },
  buy: {
    "&:hover": {
      fill: theme.palette.color.blue,
    },
  },
  sell: {
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },

  rootMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 0,
  },
  operationsIconMobile: {
    width: 28,
    height: 28,
    "&:hover": {
      fill: "inherit",
    },
  },
  buyMobile: {
    fill: theme.palette.color.blue,
    "&:hover": {
      fill: theme.palette.color.blue,
    },
  },
  sellMobile: {
    fill: theme.palette.color.red,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
}));

const TradesTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const device = useDevice();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchTrades();
  }, []);

  useEffect(() => {
    setLoading(true);
    props.fetchTrades();
  }, [props.refreshClicked]);

  useEffect(() => {
    setLoading(false);
  }, [props.trades]);

  const schema = {
    columns: [
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "TradeSideId",
        title: "طرف معامله",
        format: (value) => (value === 1 ? "خرید" : "فروش"),
      },
      {
        field: "Price",
        title: "قیمت",
        format: (value) => comma(value),
      },
      {
        field: "Quantity",
        title: "تعداد",
        format: (value) => comma(value),
      },
      {
        field: "Amount",
        title: "ارزش معامله",
        format: (value) => comma(value),
      },
      {
        field: "TradeDateTime",
        title: "زمان",
        format: (value) => toJalaliDateTime(value).split(" ")[1],
      },
    ],
    operations: [
      {
        title: "خرید",
        icon: (
          <BuyIcon
            className={clsx(
              classes.operationsIcon,
              device.isMobile && classes.operationsIconMobile,
              device.isNotMobile ? classes.buy : classes.buyMobile
            )}
          />
        ),
        action: (row) => props.openTradeModal(row.Isin, 0),
        tooltipColor: theme.palette.color.blue,
      },
      {
        title: "فروش",
        icon: (
          <SellIcon
            className={clsx(
              classes.operationsIcon,
              device.isMobile && classes.operationsIconMobile,
              device.isNotMobile ? classes.sell : classes.sellMobile
            )}
          />
        ),
        action: (row) => props.openTradeModal(row.Isin, 1),
        tooltipColor: theme.palette.color.red,
      },
    ],
  };

  return (
    <Grid
      container
      className={clsx(classes.root, device.isMobile && classes.rootMobile)}
    >
      {device.isNotMobile ? (
        <Grid item>
          <Table
            className={classes.table}
            rowClassName={classes.tableRow}
            data={props.trades}
            schema={schema}
            loading={loading}
            highlight
          ></Table>
        </Grid>
      ) : (
        <Grid item>
          {props.trades?.map((item, i) => (
            <TradesItem
              data={item}
              key={item.Id}
              operations={schema.operations}
            />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    trades: state.tseOms.trades,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTradeModal: (isin, side) =>
      dispatch(actions.openTradeModal(isin, side)),
    fetchTrades: () => dispatch(actions.fetchTrades()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradesTable);
