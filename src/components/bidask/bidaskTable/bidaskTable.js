import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../UI/Table/Table";
import { comma, replaceItemAtIndex } from "../../../shared/utility";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: theme.palette.background.box,
    height: "100%",
    "& $td, & $th": {
      border: "none",
      fontSize: "inherit",
      textAlign: "center",
    },
    "& $th": {
      color: theme.palette.text.secondary,
      paddingBottom: 0,
    },
    "& $td.blue": {
      color: theme.palette.color.blue,
    },
    "& $td.red": {
      color: theme.palette.color.red,
    },
    "& $td.disable": { color: "#a9a9a9" },
  },
  bidColor: {
    color: theme.palette.color.red,
  },
  askColor: {
    color: theme.palette.color.blue,
  },
  disable: {
    color: "#a9a9a9",
  },
  tableHead: {
    borderBottom: `1px solid ${theme.palette.border.secondary}`,
  },
}));

const BidaskTable = (props) => {
  const classes = useStyles(props);
  const [bidAskTable, setBidAskTable] = useState(null);

  useEffect(() => {
    if (props.instrument) setBidAskTable(props.instrument.BidAsks);
  }, [props.instrument]);

  useEffect(() => {
    if (props.bidAsk) {
      let newBidAskTable = bidAskTable;
      props.bidAsk.BidAskAggregates.forEach((row) => {
        const index = newBidAskTable.findIndex(
          (item) => item.RowPlace === row.RowPlace
        );
        newBidAskTable = replaceItemAtIndex(newBidAskTable, index, row);
      });
      setBidAskTable(newBidAskTable);
    }
  }, [props.bidAsk]);

  const formatBidAsk = (value, price, side) => {
    if (
      price >= props.instrument?.LowerStaticThreshold &&
      price <= props.instrument?.UpperStaticThreshold
    )
      if (value === undefined)
        return <div className={classes[`${side}Color`]}>{comma(price)}</div>;
      else return comma(value);
    else
      return (
        <div className={classes.disable}>
          {value === undefined ? comma(price) : comma(value)}
        </div>
      );
  };

  const schema = {
    columns: [
      {
        field: "AskNumber",
        title: "تعداد",
        format: (value, price) => formatBidAsk(value, price, "ask"),
        additionals: ["AskPrice"],
        width: "15%",
      },
      {
        field: "AskQuantity",
        title: "حجم",
        format: (value, price) => formatBidAsk(value, price, "ask"),
        additionals: ["AskPrice"],
        width: "18%",
      },
      {
        field: "AskPrice",
        title: "قیمت",
        format: (price) => formatBidAsk(undefined, price, "ask"),
        // className: "blue",
        width: "17%",
      },
      {
        field: "BidPrice",
        title: "قیمت",
        format: (price) => formatBidAsk(undefined, price, "bid"),
        // className: "red",
        width: "17%",
      },
      {
        field: "BidQuantity",
        title: "حجم",
        format: (value, price) => formatBidAsk(value, price, "bid"),
        additionals: ["BidPrice"],
        width: "18%",
      },
      {
        field: "BidNumber",
        title: "تعداد",
        format: (value, price) => formatBidAsk(value, price, "bid"),
        additionals: ["BidPrice"],
        width: "15%",
      },
    ],
  };

  const tempTable = [...Array(5).keys()].map((i) => ({
    AskNumber: 0,
    AskPrice: 0,
    AskQuantity: 0,
    BidNumber: 0,
    BidPrice: 0,
    BidQuantity: 0,
  }));

  return (
    <Table
      className={classes.table}
      data={bidAskTable || tempTable}
      schema={schema}
      tableHeadClassName={classes.tableHead}
      highlight
    ></Table>
  );
};

export default BidaskTable;
