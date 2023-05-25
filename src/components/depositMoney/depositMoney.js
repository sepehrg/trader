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
import TickIcon from "../UI/icons/tick";
import CloseIcon from "../UI/icons/close";
import clsx from "clsx";
import useDevice from "../../hooks/useDevice";
import DepositMoneyItem from "./depositMoneyItem/depositMoneyItem";
import Spinner from "../UI/spinner/spinner";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Link from "../UI/Link/Link";
import FilterIcon from "../UI/icons/filter";
import Chip from "../UI/chip/chip";
import PlusIcon from "../UI/icons/plus";
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
  statusIcon: {
    width: 12,
    height: 12,
  },
  statusIconRegistered: {
    fill: theme.palette.color.yellow,
  },
  statusIconConfirmed: {
    fill: theme.palette.color.green,
  },
  statusIconDeleted: {
    fill: theme.palette.color.red,
  },
  statusField: {
    justifyContent: "center",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  statusFieldMobile: {
    borderRadius: 50,
    padding: "1px 2px",
    fontSize: 11,
    flexWrap: "nowrap",
    backgroundColor: (props) => `${props.requestStatusColor}33`,
  },
  requestStatusTitle: {
    whiteSpace: "nowrap",
  },
  statusBackgroundColorYellow: {
    backgroundColor: `${theme.palette.color.yellow}33`,
  },
  statusBackgroundColorGreen: {
    backgroundColor: `${theme.palette.color.green}33`,
  },
  statusBackgroundColorRed: {
    backgroundColor: `${theme.palette.color.red}33`,
  },
  statusTextColorYellow: {
    color: theme.palette.color.yellow,
  },
  statusTextColorGreen: {
    color: theme.palette.color.green,
  },
  statusTextColorRed: {
    color: theme.palette.color.red,
  },
  deleteMobile: {
    fill: theme.palette.color.red,
    height: 28,
    width: 28,
    strokeWidth: 1,
    stroke: theme.palette.color.red,
  },

  dialogContent: {
    padding: "0 16px 28px 16px",
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
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
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

const DepositMoney = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const scroller = useRef();

  const [isFetching, setIsFetching] = useInfiniteScroll(getDeposits, scroller);
  const [doneFetching, setDoneFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deposits, setDeposits] = useState({ Result: [] });
  const [newRequestOpen, setNewRequestOpen] = useState(false);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);

  const initialState = {
    take: Math.round(
      device.isNotMobile
        ? (window.innerHeight - (70 + 20 + 44 + 62 + 36 + 52 + 15)) / 43
        : (window.innerHeight - (45 + 26 + 45 + 48)) / 99
    ),
    page: 1,
    startDate: new Date(new Date().setDate(new Date().getDate() - 310)),
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

  const submitHandler = (event) => {
    // console.log(event);
    event.preventDefault();
    getDeposits();
    if (device.isMobile) setFilterModalIsOpen(false);
  };

  function getDeposits() {
    const request = {
      optionalFilter: {
        take: filter.take,
        page: device.isNotMobile
          ? filter.page
          : deposits.Result?.length / filter.take + 1,
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
      (deposits.Result || []).length === deposits.TotalRecords
    ) {
      setDoneFetching(true);
      return;
    }
    setIsLoading(true);
    TseBofService.getDepositMoneyInfos(request, (status, data) => {
      if (data?.Success) {
        if (device.isNotMobile) setDeposits(data);
        else {
          setDeposits({
            Result: [...deposits.Result, ...data.Result],
            TotalRecords: data.TotalRecords,
          });
        }
        setIsFetching(false);
        setIsLoading(false);
      }
    });
  }

  useEffect(() => {
    getDeposits();
  }, [filter.page, filter.take]);

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
    getDeposits();
  };

  const deleteRequest = (row) => {
    TseBofService.deleteDepositMoney(row.Id, (status, data) => {
      if (status) getDeposits();
      else props.notifyError(data.Message);
    });
  };

  let requestStatusTitle = "";
  let requestStatusIcon = "";
  let requestStatusBackgroundColor = "";
  let requestStatusTextColor = "";

  const requestStatus = (value) => {
    switch (value) {
      case 1:
        requestStatusTitle = "ثبت شده";
        requestStatusIcon = (
          <TickIcon
            className={clsx(classes.statusIcon, classes.statusIconRegistered)}
          />
        );
        requestStatusBackgroundColor = classes.statusBackgroundColorYellow;
        requestStatusTextColor = classes.statusTextColorYellow;
        break;
      case 2:
        requestStatusTitle = "تایید شده";
        requestStatusIcon = (
          <TickIcon
            className={clsx(classes.statusIcon, classes.statusIconConfirmed)}
          />
        );
        requestStatusBackgroundColor = classes.statusBackgroundColorGreen;
        requestStatusTextColor = classes.statusTextColorGreen;
        break;
      case 3:
        requestStatusTitle = "حذف شده";
        requestStatusIcon = (
          <CloseIcon
            className={clsx(classes.statusIcon, classes.statusIconDeleted)}
          />
        );
        requestStatusBackgroundColor = classes.statusBackgroundColorRed;
        requestStatusTextColor = classes.statusTextColorRed;
        break;
      default:
        requestStatusTitle = "نامشخص";
        requestStatusIcon = "";
        requestStatusBackgroundColor = "";
        requestStatusTextColor = "";
        break;
    }

    return (
      <Grid
        container
        className={clsx(
          classes.statusField,
          device.isMobile && classes.statusFieldMobile,
          device.isMobile && requestStatusBackgroundColor
        )}
        spacing={3}
      >
        <Grid item>{requestStatusIcon}</Grid>
        <Grid
          item
          className={clsx(
            device.isMobile && classes.requestStatusTitle,
            device.isMobile && requestStatusTextColor
          )}
        >
          {requestStatusTitle}
        </Grid>
      </Grid>
    );
  };

  const schema = {
    columns: [
      {
        title: "تاریخ ثبت",
        field: "EntryDate",
        format: (value) => toJalaliDate(value),
      },
      {
        title: "مبلغ",
        field: "Amount",
        format: (value) => comma(value),
      },
      {
        title: "شماره فیش",
        field: "ReceiptNumber",
      },
      {
        title: "تاریخ فیش",
        field: "DepositDate",
        format: (value) => toJalaliDate(value),
      },
      {
        title: "حساب بانکی",
        field: "BankTitle",
      },
      {
        title: "وضعیت",
        field: "RequestStatusId",
        format: (value) => requestStatus(value),
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

  const filterClose = () => {
    setFilterModalIsOpen(false);
  };

  const filterClear = () => {
    dispatch(initialState);
    setFilterModalIsOpen(false);
  };

  const dialogActions = [
    {
      title: "اعمال فیلتر",
      onClick: submitHandler,
      className: classes.acceptBtnMobile,
    },
    {
      title: "حذف فیلترها و بستن",
      onClick: filterClear,
      className: classes.cancelBtnMobile,
    },
  ];

  const deleteHandler = (e) => {
    dispatch({ ...filter, [e]: "" });
  };

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  };

  const searchForm = (
    <Grid item>
      <DateFilter
        onStartDateChange={dateChangeHandler}
        onEndDateChange={dateChangeHandler}
        startDate={filter.startDate}
        endDate={filter.endDate}
      ></DateFilter>
    </Grid>
  );

  return (
    <>
      {newRequestOpen && (
        <NewRequest open={newRequestOpen} onClose={newRequestCloseHandler} />
      )}
      {device.isNotMobile ? (
        <>
          <Dialog
            title="واریز وجه"
            open={props.open}
            onClose={closeDialog}
            fullWidth
            maxWidth="md"
          >
            <Grid container className={classes.root}>
              <Grid item>
                <form onSubmit={submitHandler}>
                  <Grid container spacing={6}>
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
                        واریز جدید
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
                  data={deposits.Result}
                  totalRecords={deposits.TotalRecords}
                  loading={isLoading}
                  paging
                  rowsPerPage={filter.take}
                  onPageChange={pageChangeHandler}
                  onRowsPerPageChange={rowsPerPageChangeHandler}
                ></Table>
              </Grid>
            </Grid>
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            title="فیلتر گردش حساب"
            open={filterModalIsOpen}
            onClose={filterClose}
            dialogActions={dialogActions}
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
          </Dialog>
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
              {deposits.Result?.length > 0 ? (
                <>
                  {deposits.Result?.map((item) => (
                    <DepositMoneyItem
                      data={item}
                      key={item.Id}
                      requestStatus={requestStatus}
                      operations={schema.operations}
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

export default connect(null, mapDispatchToProps)(DepositMoney);
