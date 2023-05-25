import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from "../UI/icons/edit";
import DeleteIcon from "../UI/icons/delete";
import ArrowIcon from "../UI/icons/arrow";
import Table from "../UI/Table/Table";
import clsx from "clsx";
import { comma, toJalaliDateTime, getOptions } from "../../shared/utility";
import TseOmsService from "../../services/tseOmsService";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import OrderValidityTypes from "../../enums/orderValidityTypes";
import DraftOrdersItem from "./draftOrdersItem/draftOrdersItem";
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
    width: 20,
    height: 20,
    margin: `0px ${theme.spacing(0.5)}px`,
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  delete: {
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  paperWidthSm: {
    maxWidth: 740,
  },
}));

const DraftOrdersTable = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const device = useDevice();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    props.fetchDraftOrders();
  }, [props.refreshClicked]);

  useEffect(() => {
    setLoading(false);
  }, [props.draftOrders]);

  const editOrder = (row) => {
    const order = getOrderFromRow(row, true);
    props.openTradeModal(row.Isin, row.OrderSideId - 1, order, true);
  };

  const sendOrder = (row) => {
    const request = { OrderId: [row.Id] };
    TseOmsService.sendDraftOrders(request, (status, data) => {
      if (data.Success) props.notifySuccess(" سفارش ارسال شد");
    });
  };

  const getOrderFromRow = (row, includeId) => {
    const order = {
      Price: row.Price,
      Quantity: row.Quantity,
      OrderPaymentGateway: row.OrderPaymentGatewayId,
      OrderValidityType: row.OrderValidityTypeId,
      OrderValidityDate: row.OrderValidityDate,
      DisclosedQuantity: row.DisclosedQuantity,
    };
    if (includeId) order.OrderId = row.Id;
    return order;
  };

  const cancelOrder = (row) => {
    const request = { OrderId: row.Id };
    TseOmsService.deleteDraftOrder(request, (status, data) => {
      if (data.Success) {
        props.notifySuccess("حذف پیش‌نویس انجام شد");
        props.fetchDraftOrders();
      }
    });
  };

  const formatValidityType = (orderValidityTypeId, orderValidityDate) => {
    let type = getOptions(OrderValidityTypes).filter(
      (type) => type.value === orderValidityTypeId
    )[0].text;
    if (orderValidityDate)
      type += "\n" + toJalaliDateTime(orderValidityDate).split(" ")[0];
    return type;
  };

  const schema = {
    columns: [
      {
        field: "Id",
        hide: true,
      },
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "Id",
        title: "ردیف",
        format: (value) => comma(value),
      },
      {
        field: "OrderSideId",
        title: "طرف سفارش",
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
        field: "OrderValidityTypeId",
        title: "اعتبار",
        format: (value, orderValidityDate) =>
          formatValidityType(value, orderValidityDate),
        additionals: ["OrderValidityDate"],
      },
      {
        field: "OrderPaymentGatewayTitle",
        title: "محل تامین اعتبار",
      },
    ],
    operations: [
      {
        title: "ویرایش پیش‌نویس",
        icon: <EditIcon className={classes.operationsIcon} />,
        action: (row) => editOrder(row),
      },
      {
        title: "حذف پیش‌نویس",
        icon: (
          <DeleteIcon
            className={clsx(classes.operationsIcon, classes.delete)}
          />
        ),
        tooltipColor: theme.palette.color.red,
        action: (row) => cancelOrder(row),
      },
      {
        title: "ارسال سفارش",
        icon: <ArrowIcon className={classes.operationsIcon} />,
        action: (row) => sendOrder(row),
      },
    ],
  };

  return (
    <Grid container className={classes.root}>
      {device.isNotMobile ? (
        <Grid item>
          <Table
            className={classes.table}
            rowClassName={classes.tableRow}
            data={props.draftOrders}
            schema={schema}
            operationsWidth={150}
            loading={loading}
            highlight
          ></Table>
        </Grid>
      ) : (
        <Grid item>
          {props.portfolio?.map((item, i) => (
            <DraftOrdersItem data={item} key={item.Id} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    draftOrders: state.tseOms.draftOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openTradeModal: (isin, side, order, isDraftEdit) =>
      dispatch(actions.openTradeModal(isin, side, order, isDraftEdit)),
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    fetchDraftOrders: () => dispatch(actions.fetchDraftOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraftOrdersTable);
