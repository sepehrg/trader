import React, { useEffect, useState, useReducer, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "../UI/dialog/dialog";
import { comma, toJalaliDate } from "../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Table from "../UI/Table/Table";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import TseBofService from "../../services/tseBofService";
import InstrumentLookup from "../UI/instrumentLookup/instrumentLookup";
import DeleteIcon from "../UI/icons/delete";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import useDevice from "../../hooks/useDevice";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../UI/spinner/spinner";
import ChangeSupervisorBrokerItem from "./changeSupervisorBrokerItem/changeSupervisorBrokerItem";
import ActionDrawer from "../UI/actionDrawer/actionDrawer";
import clsx from "clsx";
import Link from "../UI/Link/Link";
import PlusIcon from "../UI/icons/plus";
import OpenFolderIcon from "../UI/icons/openFolder";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    minHeight: 550,
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
  description: {
    width: "100%",
  },
  descriptionItem: {
    flexGrow: 1,
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

  scrollMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 10,
  },
  rootMobile: {
    height: "100%",
    flexDirection: "column",
  },
  dialogContent: {
    padding: "0 16px 16px 16px",
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
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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

const ChangeSupervisorBroker = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const scroller = useRef();

  const [isFetching, setIsFetching] = useInfiniteScroll(getData, scroller);
  const [doneFetching, setDoneFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [supervisors, setSupervisors] = useState({ Result: [] });

  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);

  const [isin, setIsin] = useState("");
  const [instrumentPersianCode, setInstrumentPersianCode] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  // const [filter, setFilter] = useState({
  //   take: 10,
  //   page: 1,
  // });

  const initialState = {
    take: 10,
    page: 1,
  };
  const reducer = (filter, action) => {
    return {
      take: action.take,
      page: action.page,
    };
  };
  const [filter, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getData();
  }, [filter.page, filter.take]);

  const submitHandler = (event) => {
    event.preventDefault();
    addBroker();
  };

  const addBroker = () => {
    if (!isin) {
      props.notifyError("نماد انتخاب نشده است");
      return;
    }
    TseBofService.addChangeSupervisorBroker(
      { isin, description },
      (status, data) => {
        // console.log(data);
        if (status) {
          props.notifySuccess("درخواست با موفقیت اضافه شد");
          getData();
          setIsin("");
          setInstrumentPersianCode("");
          setDescription("");
        } else props.notifyError(data.Message);
      }
    );
  };

  function getData() {
    const request = {
      optionalFilter: {
        take: filter.take,
        page: filter.page,
      },
    };
    if (
      device.isMobile &&
      (supervisors.Result || []).length === supervisors.TotalRecords
    ) {
      setDoneFetching(true);
      return;
    }
    setIsLoading(true);
    TseBofService.getChangeSupervisorBrokerInfos(request, (status, data) => {
      if (data) {
        if (device.isNotMobile) setSupervisors(data);
        else {
          setSupervisors({
            Result: [...supervisors.Result, ...data.Result],
            TotalRecords: data.TotalRecords,
          });
        }
        setIsFetching(false);
        setIsLoading(false);
      }
    });
  }

  const closeDialog = () => props.onClose();

  const instrumentChangeHandler = (instrument) => {
    // console.log(instrument);
    setIsin(instrument ? instrument.Isin : "");
    setInstrumentPersianCode(instrument ? instrument.PersianCode : "");
  };

  const newRequestCloseHandler = () => {
    setNewRequestModalOpen(false);
    getData();
  };

  const deleteRequest = (row) => {
    TseBofService.deleteChangeSupervisorBroker(row.Id, (status, data) => {
      // console.log(data);
      if (status) {
        getData();
        props.notifySuccess("درخواست با موفقیت حذف شد");
      } else props.notifyError(data.Message);
    });
  };

  const filterClose = () => {
    setNewRequestModalOpen(false);
  };

  const pageChangeHandler = (page) => {
    dispatch({ ...filter, page });
  };

  const rowsPerPageChangeHandler = (take) => {
    dispatch({ ...filter, take });
  };

  const openNewRequestModal = () => {
    setNewRequestModalOpen(true);
  };

  const schema = {
    columns: [
      {
        title: "تاریخ",
        field: "EntryDate",
        format: (value) => toJalaliDate(value),
      },
      {
        title: "نماد",
        field: "InstrumentPersianCode",
      },
      {
        title: "شرح",
        field: "Description",
      },
      {
        title: "وضعیت",
        field: "RequestStatusTitle",
      },
    ],
    operations: [
      {
        title: "حذف ",
        icon: <DeleteIcon className={classes.delete} />,
        tooltipColor: theme.palette.color.red,
        action: (row) => deleteRequest(row),
        hide: (row) => row.RequestStatusId !== 1,
      },
    ],
  };

  const drawerActions = [
    {
      title: "ثبت",
      onClick: submitHandler,
      className: clsx(classes.btnMobile, classes.acceptBtnMobile),
    },
    {
      title: "انصراف",
      onClick: filterClose,
      className: clsx(classes.btnMobile, classes.cancelBtnMobile),
    },
  ];

  const searchForm = (
    <>
      <Grid item xs={device.isMobile && 12}>
        <InstrumentLookup
          label="نماد"
          onInstrumentChange={instrumentChangeHandler}
          value={instrumentPersianCode}
        ></InstrumentLookup>
      </Grid>
      <Grid item className={classes.descriptionItem} xs={device.isMobile && 12}>
        <Input
          label="توضیحات"
          className={classes.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
      </Grid>
    </>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Dialog
          title="تغییر کارگزار ناظر"
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
                      ثبت
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Table
                className={classes.table}
                rowClassName={classes.tableRow}
                data={supervisors.Result}
                totalRecords={supervisors.TotalRecords}
                loading={isLoading}
                schema={schema}
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
            title="درخواست جدید"
            open={newRequestModalOpen}
            onClose={filterClose}
            onOpen={filterClose}
            actions={drawerActions}
          >
            <Grid item className={classes.dialogContent}>
              <form onSubmit={submitHandler}>
                <Grid container spacing={6}>
                  {searchForm}
                </Grid>
              </form>
            </Grid>
          </ActionDrawer>
          <Grid container className={classes.rootMobile}>
            <Grid item className={classes.scrollMobile} ref={scroller}>
              {supervisors.Result?.length > 0 ? (
                <>
                  {supervisors.Result?.map((item, i) => (
                    <ChangeSupervisorBrokerItem
                      data={item}
                      key={i}
                      operations={item.operations}
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
                onClick={() => setNewRequestModalOpen(true)}
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

export default connect(null, mapDispatchToProps)(ChangeSupervisorBroker);
