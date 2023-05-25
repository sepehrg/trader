import React, { useEffect, useState, useReducer, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "../UI/dialog/dialog";
import { comma, toJalaliDate } from "../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Table from "../UI/Table/Table";
import Button from "../UI/Button/Button";
import DateFilter from "../UI/dateFilter/dateFilter";
import TseBofService from "../../services/tseBofService";
import NewRequest from "./newRequest/newRequest";
import DeleteIcon from "../UI/icons/delete";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import clsx from "clsx";
import useDevice from "../../hooks/useDevice";
import ActionDrawer from "../UI/actionDrawer/actionDrawer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Chip from "../UI/chip/chip";
import Link from "../UI/Link/Link";
import PlusIcon from "../UI/icons/plus";
import FilterIcon from "../UI/icons/filter";
import Spinner from "../UI/spinner/spinner";
import PaymentRequestItem from "./paymentRequestItem/paymentRequestItem";
import OpenFolderIcon from "../UI/icons/openFolder";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    minHeight: 400,
    padding: theme.spacing(6),
  },
  table: {
    marginTop: 10,
    "& td, & th": {
      border: "none",
      fontSize: 11,
    },
    "& th": {
      backgroundColor: theme.palette.background.default,
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
  delete: {
    width: 20,
    height: 20,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  filterBtn: {
    minWidth: 100,
    height: "100%",
    fontSize: 12,
  },

  addNew: {
    position: "absolute",
    bottom: 70,
    left: 20,
  },
  addNewBtn: {
    border: "none",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 50,
    width: 60,
    minWidth: 60,
    height: 60,
    "&:hover": {
      border: "none",
      backgroundColor: theme.palette.primary.main,
    },
  },
  plusIcon: {
    fill: "#FFF",
    strokeWidth: 1,
    stroke: "#FFF",
  },

  filterMobile: {
    height: 42,
  },
  filterInnerMobile: {
    backgroundColor: theme.palette.background.box,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    padding: "0px 10px",
    flexWrap: "nowrap",
  },
  filterChip: {
    alignItems: "center",
    display: "flex",
    overflow: "auto hidden",
    flexWrap: "nowrap",
  },
  filterBtnMobile: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    fontSize: 12,
  },
  scrollMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 10,
  },
  rootMobile: {
    height: "calc(100% - 42px)",
    flexDirection: "column",
  },

  dialogContent: {
    padding: "0 16px 16px 16px",
  },
  filterMobile: {
    height: 42,
  },
  filterInnerMobile: {
    backgroundColor: theme.palette.background.box,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    padding: "0px 10px",
    flexWrap: "nowrap",
  },
  filterChip: {
    alignItems: "center",
    display: "flex",
    overflow: "auto hidden",
    flexWrap: "nowrap",
  },
  filterBtnMobile: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    fontSize: 12,
  },
  btnMobile: {
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
  deleteMobile: {
    fill: theme.palette.color.red,
    height: 28,
    width: 28,
    strokeWidth: 1,
    stroke: theme.palette.color.red,
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dialogContentContainer: {
    flexDirection: "column",
  },

  emptyList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  emptyBodyIcon: {
    height: 36,
    width: 36,
    fill: `${theme.palette.icon.primary}66`,
  },
}));

const PaymentRequest = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const scroller = useRef();

  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(getPayments, scroller);
  const [doneFetching, setDoneFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState({ Result: [] });
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  // const [filter, setFilter] = useState({
  //   take: 10,
  //   page: 1,
  //   startDate: new Date(new Date().setDate(new Date().getDate() - 31)),
  //   endDate: new Date(),
  // });
  const [newRequestOpen, setNewRequestOpen] = useState(false);

  const initialState = {
    take: 10,
    page: 1,
    startDate: new Date(new Date().setDate(new Date().getDate() - 610)),
    endDate: new Date(),
  };
  const reducer = (filter, action) => {
    return {
      take: action.take,
      page: action.page,
      startDate: action.startDate,
      endDate: action.endDate,
    };
  };
  const [filter, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getPayments();
  }, [filter.page, filter.take]);

  const submitHandler = (event) => {
    event.preventDefault();
    getPayments();
    if (device.isMobile) setFilterModalIsOpen(false);
  };

  function getPayments() {
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
      },
    };
    if (
      device.isMobile &&
      (payments.Result || []).length === payments.TotalRecords
    ) {
      setDoneFetching(true);
      return;
    }
    setIsLoading(true);
    TseBofService.getPaymentRequestInfos(request, (status, data) => {
      if (data) {
        if (device.isNotMobile) setPayments(data);
        else {
          setPayments({
            Result: [...payments.Result, ...data.Result],
            TotalRecords: data.TotalRecords,
          });
        }
        setIsFetching(false);
        setIsLoading(false);
      }
    });
  }

  const closeDialog = () => props.onClose();

  const dateChangeHandler = (event, name) => {
    dispatch({ ...filter, [name]: event._d });
  };

  const pageChangeHandler = (page) => {
    dispatch({ ...filter, page });
  };

  const rowsPerPageChangeHandler = (take) => {
    dispatch({ ...filter, take });
  };

  const newRequestCloseHandler = () => {
    setNewRequestOpen(false);
    getPayments();
  };

  const deleteRequest = (row) => {
    TseBofService.deletePaymentRequest(row.Id, (status, data) => {
      if (status) getPayments();
      else props.notifyError(data.Message);
    });
  };

  const filterClose = () => {
    setFilterModalIsOpen(false);
  };

  const filterClear = () => {
    dispatch(initialState);
    setFilterModalIsOpen(false);
  };

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  };

  const deleteHandler = (e) => {
    dispatch({ ...filter, [e]: "" });
  };

  const schema = {
    columns: [
      {
        title: "تاریخ",
        field: "EntryDate",
        format: (value) => toJalaliDate(value),
      },
      {
        title: "مبلغ",
        field: "Amount",
        format: (value) => comma(value),
      },
      {
        title: "شماره حساب",
        field: "AccountNumber",
      },
      {
        title: "وضعیت",
        field: "RequestStatusTitle",
      },
      {
        title: "شرح",
        field: "Description",
      },
      {
        title: "پرداخت به تاریخ",
        field: "PaymentDate",
        format: (value) => toJalaliDate(value),
      },
    ],
    operations: [
      {
        title: "حذف درخواست",
        icon: (
          <DeleteIcon
            className={clsx(
              classes.delete,
              device.isMobile && classes.deleteMobile
            )}
          />
        ),
        tooltipColor: theme.palette.color.red,
        action: (row) => deleteRequest(row),
      },
    ],
  };

  const drawerActions = [
    {
      title: "اعمال فیلتر",
      onClick: submitHandler,
      className: clsx(classes.btnMobile, classes.acceptBtnMobile),
    },
    {
      title: "حذف فیلترها و بستن",
      onClick: filterClear,
      className: clsx(classes.btnMobile, classes.cancelBtnMobile),
    },
  ];

  const searchForm = (
    <>
      <Grid item>
        <DateFilter
          onStartDateChange={dateChangeHandler}
          onEndDateChange={dateChangeHandler}
          startDate={filter.startDate}
          endDate={filter.endDate}
        ></DateFilter>
      </Grid>
    </>
  );

  return (
    <>
      {/* {newRequestOpen && ( */}
      <NewRequest open={newRequestOpen} onClose={newRequestCloseHandler} />
      {/* )} */}
      {device.isNotMobile ? (
        <Dialog
          title="درخواست پرداخت"
          open={props.open}
          onClose={closeDialog}
          fullWidth
          maxWidth="md"
        >
          <Grid container className={classes.root}>
            <Grid item>
              <form onSubmit={submitHandler}>
                <Grid container className={classes.filter} spacing={6}>
                  {searchForm}
                  <Grid item>
                    <Button
                      type="submit"
                      variant="outlined"
                      className={classes.filterBtn}
                      color="primary"
                    >
                      جستجو
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      type="button"
                      variant="outlined"
                      className={classes.filterBtn}
                      color="primary"
                      onClick={() => setNewRequestOpen(true)}
                    >
                      درخواست جدید
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Table
                className={classes.table}
                rowClassName={classes.tableRow}
                schema={schema}
                data={payments.Result}
                totalRecords={payments.TotalRecords}
                loading={isLoading}
                paging
                rowsPerPage={filter.take}
                onPageChange={pageChangeHandler}
                onRowsPerPageChange={rowsPerPageChangeHandler}
              ></Table>
            </Grid>
          </Grid>
        </Dialog>
      ) : (
        <>
          <ActionDrawer
            title="فیلتر درخواست پرداخت"
            open={filterModalIsOpen}
            onClose={filterClose}
            onOpen={filterClose}
            actions={drawerActions}
          >
            <Grid item className={classes.dialogContent}>
              <form onSubmit={submitHandler}>
                <Grid
                  container
                  spacing={6}
                  className={classes.dialogContentContainer}
                >
                  {searchForm}
                </Grid>
              </form>
            </Grid>
          </ActionDrawer>
          <Grid item className={classes.filterMobile}>
            <Grid container className={classes.filterInnerMobile} spacing={6}>
              <Grid item className={classes.filterBtnMobile} xs={2}>
                <Link onClick={openFilterModal}>
                  <Grid
                    container
                    className={classes.filterBtnMobile}
                    spacing={2}
                  >
                    <Grid item>
                      <FilterIcon />
                    </Grid>
                    <Grid item className={classes.filterBtnMobile}>
                      فیلتر
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid item xs={10} className={classes.filterChip}>
                <Chip
                  label={"از: " + toJalaliDate(filter.startDate)}
                  onClick={() => setFilterModalIsOpen(true)}
                />
                <Chip
                  label={"تا: " + toJalaliDate(filter.endDate)}
                  onClick={() => setFilterModalIsOpen(true)}
                />
                {filter.instrument && (
                  <Chip
                    label={filter.instrument.PersianCode}
                    onClick={() => setFilterModalIsOpen(true)}
                    onDelete={() => deleteHandler("instrument")}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.rootMobile}>
            <Grid item className={classes.scrollMobile} ref={scroller}>
              {payments.Result?.length > 0 ? (
                <>
                  {payments.Result.map((item, i) => (
                    <PaymentRequestItem
                      data={item}
                      operations={schema.operations}
                      key={i}
                    />
                  ))}
                  <div className={classes.spinner}>
                    {doneFetching ? (
                      <span>پایان لیست</span>
                    ) : (
                      (isFetching || isLoading) && <Spinner size={40} />
                    )}
                  </div>
                </>
              ) : (
                <Grid container className={classes.emptyList}>
                  <OpenFolderIcon className={classes.emptyBodyIcon} />
                  لیست خالی میباشد
                </Grid>
              )}
            </Grid>
            <Grid item className={classes.addNew}>
              <Button
                type="button"
                variant="outlined"
                className={classes.addNewBtn}
                color="primary"
                onClick={() => setNewRequestOpen(true)}
              >
                <PlusIcon className={classes.plusIcon} />
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(PaymentRequest);
