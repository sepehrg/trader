import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TseOmsService from "../../../services/tseOmsService";
import Table from "../../UI/Table/Table";
import { toJalaliDateTime } from "../../../shared/utility";
import style from "../../../shared/style";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    // borderRadius: "5px",
    // backgroundColor: theme.palette.background.box,
    // padding: `${theme.spacing(5)}px ${theme.spacing(5)}px`,
  },
  grid: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    // border: `1px solid ${theme.palette.background.box}`,
    borderRadius: 7,
    fontSize: 11,
    marginBottom: 10,
  },
  gridItems: {
    padding: "0 10px",
    border: `1px solid ${theme.palette.background.default}`,
  },
  gridItem: {
    display: "flex",
    minHeight: 32,
    justifyContent: "space-between",
  },
  gridTh: {
    flexDirection: "column",
    textAlign: "right",
    margin: "auto 0",
    color: theme.palette.text.secondary,
  },
  gridTd: {
    flexDirection: "column",
    textAlign: "left",
    margin: "auto 0",
  },
  date: {
    direction: "ltr",
  },
  table: {
    maxHeight: 400,
    width: "100%",
    "& td, & $th": {
      border: "none",
      fontSize: 11,
      textAlign: "right",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.box,
    },
    "& td": {
      minWidth: 120,
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `4px solid ${theme.palette.background.box}`,
    height: 39,
  },
}));

const OrderInfoModal = (props) => {
  const classes = useStyles();
  // const theme = useTheme();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    TseOmsService.getOrderBookHistory(props.orderId, (status, data) => {
      setOrderHistory(data.Result);
    });
  }, []);
  // console.log(data.Result);

  const formatDate = (date) => {
    return <div className={classes.date}>{toJalaliDateTime(date)}</div>;
  };

  const historyFields = [
    {
      field: "InstrumentPersianCode",
      title: "نماد",
    },
    {
      field: "IdentityTitle",
      title: "مشتری",
    },
    {
      field: "OrderSideTitle",
      title: "طرف سفارش",
    },
    {
      field: "OrderStatusTitle",
      title: "وضعیت سفارش",
    },
    {
      field: "EntryDate",
      title: "تاریخ سفارش",
      // format: (value) => {
      //   return <div className={classes.date}>{toJalaliDateTime(value)}</div>;
      // },
      format: (value) => formatDate(value),
    },
    {
      field: "OrderValidityType",
      title: "نوع اعتبار",
    },
  ];
  const schemaDetail = {
    columns: [
      {
        field: "EntryDate",
        title: "تاریخ",
        format: (value) => formatDate(value),
      },
      {
        field: "Description",
        title: "شرح",
      },
    ],
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.grid}>
        <Grid container>
          {historyFields.map((col, i) => (
            <Grid item className={classes.gridItems} sm={4} key={i}>
              <Grid container className={classes.gridItem}>
                <Grid item className={classes.gridTh}>
                  {col.title}
                </Grid>
                <Grid item className={classes.gridTd}>
                  {col.format
                    ? col.format(orderHistory[col.field])
                    : orderHistory[col.field]}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.scrollbarY, classes.table)}>
        <Grid container>
          <Table
            rowClassName={classes.tableRow}
            data={orderHistory.OrderBookHistoryDetailModels}
            schema={schemaDetail}
          ></Table>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderInfoModal;
