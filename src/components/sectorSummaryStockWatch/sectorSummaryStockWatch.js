import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../shared/style";
import CmdTseService from "../../services/cmdTseService";
import { shortenNumber, coloredPercent, comma } from "../../shared/utility";
import clsx from "clsx";
import Table from "../../components/UI/Table/Table";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: 10,
    // flexDirection: "column",

    height: "calc(100% + 12px)",
  },
  main: {
    // position: "relative",
    // flexWrap: "nowrap",
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
    // width: "100%",
    // flex: 1,
    // height: 200,
    height: "100%",
    overflow: "hidden auto",
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
      backgroundColor: theme.palette.background.box,
    },
    "& thead, & tbody tr": {
      width: "100%",
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `3px solid ${theme.palette.background.box}`,
    transition: "0.3s",
    height: 39,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  tradePrice: {
    justifyContent: "center",
  },
  direction: {
    direction: "ltr",
  },
  forScroll: {
    width: "100%",
    height: "calc(100% - 40px)",
  },
}));

const SectorSummaryStockWatch = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const [data, setData] = useState([]);

  // let isSubscribed = true;

  useEffect(() => {
    CmdTseService.getStockWatchSimpleInfosBySectorId(
      props.sectorId,
      (status, data) => {
        if (status) {
          setData(data);
        }
      }
    );
  }, [props.sectorId]);

  // useEffect(() => {
  //   getStockWatchSimpleInfosBySectorId();
  //   return () => (isSubscribed = false);
  // }, []);

  // const getStockWatchSimpleInfosBySectorId = () => {
  //   CmdTseService.getStockWatchSimpleInfosBySectorId((status, data) => {
  //     if (data.Result && isSubscribed) {
  //       setData(data.Result);
  //     }
  //     console.log(data);
  //   });
  // };

  const tradePrice = (value, variation, percentage) => {
    return (
      <Grid container className={classes.tradePrice} spacing={2}>
        <Grid item>{coloredPercent(percentage, theme, true, true)}</Grid>
        <Grid item>{coloredPercent(variation, theme, false, false)}</Grid>
        <Grid item>{comma(value)}</Grid>
      </Grid>
    );
  };

  const schema = {
    columns: [
      {
        field: "PersianCode",
        title: "نماد",
      },
      {
        field: "Title",
        title: "شرکت",
      },
      {
        field: "LastTradePrice",
        title: "قیمت آخرین معامله",
        format: (value, variation, percentage) =>
          tradePrice(value, variation, percentage),
        additionals: ["PriceVariation", "PriceVariationPercentage"],
      },
      {
        field: "ClosingPrice",
        title: "قیمت پایانی",
        format: (value, variation, percentage) =>
          tradePrice(value, variation, percentage),
        additionals: [
          "ClosingPriceVariation",
          "ClosingPriceVariationPercentage",
        ],
      },
      {
        field: "TotalNumberOfSharesTraded",
        title: "حجم معامله",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
      },
      {
        field: "TotalNumberOfTrades",
        title: "تعداد معامله",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
      },
      {
        field: "TotalTradeValue",
        title: "ارزش معاملات",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
      },
      // {
      //   field: "BuyIndividualVolume",
      //   title: "معاملات حقیقی (حجم)",
      //   format: (value, SellIndividualVolume) => (
      //     <Volume buy={value} sell={SellIndividualVolume}></Volume>
      //   ),
      //   additionals: ["SellIndividualVolume"],
      // },
      // {
      //   field: "BuyFirmVolume",
      //   title: "معاملات حقوقی (حجم)",
      //   format: (value, SellFirmVolume) => (
      //     <Volume buy={value} sell={SellFirmVolume}></Volume>
      //   ),
      //   additionals: ["SellFirmVolume"],
      // },
    ],
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.header}>
        دیده‌بان صنایع
        {props.sectorTitle && ` (${props.sectorTitle}) `}
      </Grid>
      <Grid item className={clsx(classes.forScroll, classes.scrollbarY)}>
        <Table
          className={classes.table}
          rowClassName={classes.tableRow}
          schema={schema}
          data={data.Result}
        ></Table>
      </Grid>
    </Grid>
  );
};

export default React.memo(SectorSummaryStockWatch);
