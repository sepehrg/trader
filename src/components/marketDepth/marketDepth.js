import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { comma } from "../../shared/utility";
import style from "../../shared/style";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    height: "100%",
    padding: "0 8px 4px 2px",
    height: "100%",
    overflowY: "scroll",
  },
  table: {
    width: "100%",
    // backgroundColor: theme.palette.background.box,
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
      textAlign: "center",
      padding: 6,
    },
    "& th": {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.box,
      paddingBottom: 0,
      position: "sticky",
      top: 0,
    },
    "& td.blue": {
      color: theme.palette.color.blue,
    },
    "& td.red": {
      color: theme.palette.color.red,
    },
    "& td.disabled": { color: "#a9a9a9" },
    "& tbody": {
      // height: 300,
      // overflow: "scroll",
    },
  },
  tableHead: {
    borderBottom: `1px solid ${theme.palette.border.primary}66`,
  },
  stickyHeader: {
    backgroundColor: theme.palette.background.box,
    position: "sticky",
    top: 0,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    width: "100%",
    "& $th": {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.box,
      padding: "6px 6px 2px 6px",
      fontWeight: "normal",
    },
  },
  main: {
    height: "100%",
  },
  fullHeight: {
    height: "100%",
  },
}));

const MarketDepth = (props) => {
  const classes = useStyles(props);
  const buyRef = useRef();
  const sellRef = useRef();

  const data = useRef();

  useEffect(() => {
    props.authenticate();
    setTimeout(function () {
      if (props.instrument) props.subscribe(props.instrument.Isin);
    }, 500);

    return () => {
      setTimeout(function () {
        props.logout();
      }, 100);
    };
  }, []);

  useEffect(() => {
    if (props.marketDepth) {
      createTable("Bid", props.marketDepth.SellQueue.Orders, sellRef);
      createTable("Ask", props.marketDepth.BuyQueue.Orders, buyRef);
      data.current = props.marketDepth;
    }
  }, [props.marketDepth]);

  useEffect(() => {
    if (props.instrument) props.subscribe(props.instrument.Isin);
    return () => {
      if (props.instrument) props.unsubscribe(props.instrument.Isin);
    };
  }, [props.instrument]);

  useEffect(() => {
    const { marketDepthUpdate } = props;
    if (marketDepthUpdate && data.current) {
      const setting =
        marketDepthUpdate.OrderSide === 1
          ? { queue: "BuyQueue", side: "Ask", ref: buyRef }
          : { queue: "SellQueue", side: "Bid", ref: sellRef };
      const sideOrders = data.current[setting.queue].Orders;
      const newOrder = {
        Id: marketDepthUpdate.OrderId,
        OriginalPrice: marketDepthUpdate.OriginalPrice,
        DisplayedPrice: marketDepthUpdate.DisplayedPrice,
        DisplayedQuantity: marketDepthUpdate.DisplayedQuantity,
        RemainingQuantity: marketDepthUpdate.RemainingQuantity,
      };
      const comparison = (o) =>
        setting.side === "Bid"
          ? o.OriginalPrice <= newOrder.OriginalPrice
          : o.OriginalPrice >= newOrder.OriginalPrice;

      if (
        marketDepthUpdate.MessageType ===
        "ProLab.Base.InfraStructure.Messaging.Model.Tse.OrderCreationMessage"
      ) {
        switch (marketDepthUpdate.OrderType) {
          case 1: //creation
          case 3: //rebroadcasting
            if (!sideOrders.some((o) => o.Id === marketDepthUpdate.OrderId)) {
              const index = sideOrders.slice().reverse().findIndex(comparison);
              data.current = {
                ...data.current,
                [setting.queue]: {
                  Orders: [
                    ...sideOrders.slice(0, sideOrders.length - index),
                    newOrder,
                    ...sideOrders.slice(sideOrders.length - index),
                  ],
                },
              };
            }
            break;
          case 2: //modification
            const index = sideOrders.findIndex(
              (o) => o.Id === marketDepthUpdate.OrderId
            );
            data.current = {
              ...data.current,
              [setting.queue]: {
                Orders: [
                  ...sideOrders.slice(0, index),
                  newOrder,
                  ...sideOrders.slice(index + 1),
                ],
              },
            };
            break;
        }
      } else if (
        marketDepthUpdate.MessageType ===
        "ProLab.Base.InfraStructure.Messaging.Model.Tse.OrderDeletionMessage"
      ) {
        switch (marketDepthUpdate.OrderDeletionType) {
          case 1: //specific order
            data.current = {
              ...data.current,
              [setting.queue]: {
                Orders: sideOrders.filter(
                  (o) => o.Id !== marketDepthUpdate.OrderId
                ),
              },
            };
            break;
          case 2: //all previous orders
            const index = sideOrders.findIndex(
              (o) => o.Id === marketDepthUpdate.OrderId
            );
            data.current = {
              ...data.current,
              [setting.queue]: {
                Orders: [...sideOrders.slice(index + 1)],
              },
            };
            break;
          case 3: //all orders
            data.current = {
              ...data.current,
              [setting.queue]: {
                Orders: [],
              },
            };
            break;
        }
      }
      createTable(
        setting.side,
        data.current[setting.queue].Orders,
        setting.ref
      );
    }
  }, [props.marketDepthUpdate]);

  const createTable = (side, data, tableRef) => {
    // console.log(side, data);
    const grouped = groupBy(data, "OriginalPrice");

    const result = [];
    Object.keys(grouped).forEach((el, key) => {
      result.push({
        Price: parseInt(el),
        Quantity: grouped[el]
          .map((item) => item.DisplayedQuantity)
          .reduce((a, b) => a + b, 0),
        Number: grouped[el].length,
      });
    });
    if (side === "Ask") result.sort(compare);

    if (tableRef.current) {
      tableRef.current.innerHTML = "";
      result.forEach((row) => {
        const tableRow = createTableRow(row, side);
        tableRef.current.append(tableRow);
      });
    }
  };

  function compare(a, b) {
    if (a.Price > b.Price) {
      return -1;
    }
    if (a.Price < b.Price) {
      return 1;
    }
    return 0;
  }

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const createTableRow = (row, side) => {
    const tableRow = document.createElement("tr");

    const numberTd = document.createElement("td");
    const quantityTd = document.createElement("td");
    const priceTd = document.createElement("td");

    numberTd.innerHTML = comma(row[`Number`]);
    quantityTd.innerHTML = comma(row[`Quantity`]);
    priceTd.innerHTML = comma(row[`Price`]);

    numberTd.style = "width: 30%";
    quantityTd.style = "width: 36%";
    priceTd.style = "width: 34%";

    if (side === "Ask") {
      if (
        row.Price >= props.instrument?.LowerStaticThreshold &&
        row.Price <= props.instrument?.UpperStaticThreshold
      ) {
        priceTd.className = "blue";
      } else {
        numberTd.className = "disabled";
        quantityTd.className = "disabled";
        priceTd.className = "disabled";
      }
      tableRow.append(numberTd);
      tableRow.append(quantityTd);
      tableRow.append(priceTd);
    } else {
      if (
        row.Price <= props.instrument?.UpperStaticThreshold &&
        row.Price >= props.instrument?.LowerStaticThreshold
      ) {
        priceTd.className = "red";
      } else {
        numberTd.className = "disabled";
        quantityTd.className = "disabled";
        priceTd.className = "disabled";
      }
      tableRow.append(priceTd);
      tableRow.append(quantityTd);
      tableRow.append(numberTd);
    }
    return tableRow;
  };

  const getSchema = (side) => {
    let schema = {
      columns: [
        {
          field: "Number",
          title: "تعداد",
          format: (value) => comma(value),
          width: "15%",
        },
        {
          field: "Quantity",
          title: "حجم",
          format: (value) => comma(value),
          width: "18%",
        },
        {
          field: "Price",
          title: "قیمت",
          format: (value) => comma(value),
          className: side === "buy" ? "blue" : "red",
          width: "17%",
        },
      ],
    };
    if (side === "sell") schema = { columns: schema.columns.reverse() };
    return schema;
  };

  return (
    <Grid container className={clsx(classes.root)}>
      <Grid item className={classes.fullHeight}>
        <Grid container className={clsx(classes.main, classes.scrollbarY)}>
          <Grid item xs={6}>
            <table className={classes.stickyHeader}>
              <thead>
                <tr>
                  {getSchema("buy").columns.map((col) => (
                    <th key={col.field} style={{ width: col.width }}>
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <table className={classes.table}>
              <tbody ref={buyRef} className={classes.scrollbarY}></tbody>
            </table>
          </Grid>
          <Grid item xs={6}>
            <table className={classes.stickyHeader}>
              <thead>
                <tr>
                  {getSchema("sell").columns.map((col) => (
                    <th key={col.field} style={{ width: col.width }}>
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            <table className={classes.table}>
              <tbody ref={sellRef} className={classes.scrollbarY}></tbody>
            </table>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    marketDepth: state.app.marketDepth,
    marketDepthUpdate: state.app.marketDepthUpdate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(actions.mkdPusherAuthenticate()),
    logout: () => dispatch(actions.mkdPusherLogout()),
    subscribe: (isin) => dispatch(actions.mkdPusherSubscribe(isin)),
    unsubscribe: (isin) => dispatch(actions.mkdPusherUnsubscribe(isin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketDepth);
