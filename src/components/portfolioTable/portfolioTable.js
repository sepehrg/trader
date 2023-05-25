import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "../UI/Table/Table";
import BuyIcon from "../UI/icons/buy";
import SellIcon from "../UI/icons/sell";
import { comma } from "../../shared/utility";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import PortfolioItem from "./portfolioItem/portfolioItem";
import useDevice from "../../hooks/useDevice";
import WidgetTypes from "../../enums/widgetTypes";

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
    padding: 0,
    height: "100%",
    overflow: "hidden scroll",
  },
}));

const PortfolioTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const device = useDevice();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.fetchPortfolio();
  }, []);

  useEffect(() => {
    setLoading(true);
    props.fetchPortfolio();
  }, [props.refreshClicked]);

  useEffect(() => {
    setLoading(false);
  }, [props.portfolio]);

  const openTradeBuy = (row) => {
    if (props.widget) {
      props.addWidgetItem(WidgetTypes.Trade);
      props.setInstrument(row.Isin);
      props.setTradeSide(0);
    } else props.openTradeModal(row.Isin, 0);
  };

  const openTradeSell = (row) => {
    if (props.widget) {
      props.addWidgetItem(WidgetTypes.Trade);
      props.setInstrument(row.Isin);
      props.setTradeSide(1);
    } else props.openTradeModal(row.Isin, 1);
  };

  const schema = {
    columns: [
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "InstrumentTitle",
        title: "شرکت",
      },
      {
        field: "Quantity",
        title: "تعداد",
        format: (value) => comma(value),
      },
      {
        field: "ClosingPrice",
        title: "قیمت پایانی",
        format: (value) => comma(value),
      },
      {
        field: "LastTradePrice",
        title: "قیمت لحظه ای",
        format: (value) => comma(value),
      },
    ],
    operations: [
      {
        title: "خرید",
        icon: <BuyIcon className={clsx(classes.operationsIcon, classes.buy)} />,
        action: openTradeBuy,
        tooltipColor: theme.palette.color.blue,
      },
      {
        title: "فروش",
        icon: (
          <SellIcon className={clsx(classes.operationsIcon, classes.sell)} />
        ),
        action: openTradeSell,
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
            data={props.portfolio}
            schema={schema}
            loading={loading}
            highlight
          ></Table>
        </Grid>
      ) : (
        <Grid item>
          {props.portfolio?.map((item, i) => (
            <PortfolioItem data={item} key={item.Id} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    portfolio: state.tseOms.portfolio,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTradeModal: (isin, side) =>
      dispatch(actions.openTradeModal(isin, side)),
    fetchPortfolio: () => dispatch(actions.fetchPortfolio()),
    addWidgetItem: (item) => dispatch(actions.addWidgetItem(item)),
    setInstrument: (isin) => dispatch(actions.setInstrument(isin)),
    setTradeSide: (tradeSide) => dispatch(actions.setTradeSide(tradeSide)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioTable);
