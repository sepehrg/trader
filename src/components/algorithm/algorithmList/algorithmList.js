import React, { useEffect, useState, useReducer } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { toJalaliDateTime, updateObject } from "../../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "../../UI/icons/info";
import DeleteIcon from "../../UI/icons/delete";
import EditIcon from "../../UI/icons/edit";
import Table from "../../UI/Table/Table";
import CodeListIcon from "../../UI/icons/codeList";
import Console from "../console/console";
import AlgorithmService from "../../../services/algorithmService";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Link from "../../UI/Link/Link";
import Button from "../../UI/Button/Button";
import CodeAddIcon from "../../UI/icons/codeAdd";
import clsx from "clsx";
import Splitter from "../../UI/splitter/splitter";
import PlayIcon from "../../UI/icons/play";
import StopIcon from "../../UI/icons/stop";
import style from "../../../shared/style";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
    flexFlow: "nowrap",
    justifyContent: "space-between",
    // overflow: "hidden auto",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  boxContainer: {
    height: "100%",
  },
  header: {
    padding: 10,
    display: "flex",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
    paddingTop: 4,
    whiteSpace: "nowrap",
  },
  table: {
    borderCollapse: "collapse",
    flexWrap: "nowrap",
    "& td, & $th": {
      border: "none",
      fontSize: "inherit",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.default,
    },
    "& thead, & tbody tr": {
      width: "100%",
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.box,
    height: 39,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  date: {
    direction: "ltr",
  },
  main: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  operationsIcon: {
    width: 20,
  },
  startIcon: {
    fill: theme.palette.color.green,
  },
  stopIcon: {
    fill: theme.palette.color.red,
  },
  addContainer: {
    display: "flex",
    alignItems: "center",
  },
  addBtn: {
    minWidth: 100,
    height: 38,
    fontSize: 12,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}80`,
    padding: "5px 15px",
    borderRadius: 4,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}14`,
    },
    "&:hover $addIcon": {
      fill: theme.palette.primary.main,
    },
  },
  addIcon: {
    marginLeft: 5,
    height: 24,
    width: 24,
  },
  console: {
    flex: 1,
    minHeight: 100,
  },
  grid: {
    height: "calc(100% - 48px)",
    overflow: "hidden auto",
  },
}));

const AlgorithmList = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [algorithms, setAlgorithms] = useState([]);

  const pageSize = Math.round(
    (window.innerHeight - (70 + 20 + 48 + 40 + 150 + 40)) / 40
  );

  const initialState = {
    optionalFilter: {
      take: pageSize,
      page: 1,
    },
    reportFilter: {
      dateFilter: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 3650)),
        endDate: new Date(),
      },
      searchItem: [],
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "changePage":
        return updateObject(state, {
          optionalFilter: updateObject(state.optionalFilter, {
            page: action.payload,
          }),
        });
      case "changeTake":
        return updateObject(state, {
          optionalFilter: updateObject(state.optionalFilter, {
            take: action.payload,
          }),
        });
    }
  };

  const [filter, dispatch] = useReducer(reducer, initialState);

  const getAlgorithms = () => {
    setIsLoading(true);
    AlgorithmService.getUserAlgorithmInfos(filter, (status, data) => {
      setIsLoading(false);
      if (data?.Success) {
        setAlgorithms(data);
      }
    });
  };

  const changeAlgorithmStatus = (row, status) => {
    AlgorithmService.changeAlgorithmStatus(
      { id: row.Id, status },
      (status, data) => {
        if (data?.Success) getAlgorithms();
        else props.notifyError(data.Message);
      }
    );
  };

  const editAlgorithm = (row) => {
    history.push(`/algorithm/edit/${row.Id}`);
  };

  const deleteAlgorithm = (row) => {
    AlgorithmService.deleteAlgorithmById({ id: row.Id }, (status, data) => {
      if (data?.Success) {
        props.notifySuccess(data.Message);
        getAlgorithms();
      } else {
        props.notifyError(data.Message);
      }
    });
  };

  useEffect(() => {
    getAlgorithms();
  }, [filter]);

  const formatDate = (date) => {
    return <div className={classes.date}>{toJalaliDateTime(date)}</div>;
  };

  const schema = {
    columns: [
      {
        title: "عنوان الگوریتم",
        field: "Title",
      },
      {
        title: "کد الگوریتم",
        field: "Code",
      },
      {
        title: "کاربر ایجاد کننده",
        field: "IdentityTitle",
      },
      {
        title: "زبان برنامه نویسی",
        field: "AlgorithmLanguageTitle",
      },
      {
        title: "تاریخ ایجاد",
        field: "EntryJalaliDate",
        format: (value) => formatDate(value),
      },
      {
        title: "توضیحات",
        field: "Description",
      },
      {
        title: "وضعیت",
        field: "AlgorithmStatusTitle",
      },
    ],
    operations: [
      {
        title: (row) => (row.AlgorithmStatusId === 5 ? "Stop" : "Start"),
        icon: (row) =>
          row.AlgorithmStatusId === 5 ? (
            <StopIcon
              className={clsx(classes.operationsIcon, classes.stopIcon)}
            />
          ) : (
            <PlayIcon
              className={clsx(classes.operationsIcon, classes.startIcon)}
            />
          ),
        action: (row) =>
          row.AlgorithmStatusId === 5
            ? changeAlgorithmStatus(row, 7)
            : changeAlgorithmStatus(row, 5),
        tooltipColor: (row) =>
          row.AlgorithmStatusId === 5
            ? theme.palette.color.red
            : theme.palette.color.green,
      },
      {
        title: "ویرایش",
        icon: <EditIcon className={classes.operationsIcon} />,
        action: (row) => editAlgorithm(row),
      },
      {
        title: "حذف",
        icon: <DeleteIcon className={classes.operationsIcon} />,
        action: (row) => deleteAlgorithm(row),
      },
    ],
  };

  return (
    <Grid container className={classes.root}>
      <Splitter
        split="horizontal"
        defaultSize={140}
        primary="second"
        pane1Style={{ overflow: "hidden" }}
        pane2Style={{ width: "100%", minHeight: 100, maxHeight: "65%" }}
      >
        <Grid item className={classes.boxContainer}>
          <Grid container className={classes.box}>
            <Grid item>
              <Grid container className={classes.main}>
                <Grid item className={classes.header}>
                  <CodeListIcon className={classes.icon}></CodeListIcon>
                  <Typography variant="h2" className={classes.title}>
                    لیست الگوریتم
                  </Typography>
                </Grid>
                <Grid item className={classes.addContainer}>
                  <Link className={classes.addBtn} link={"/algorithm/new"}>
                    <CodeAddIcon
                      className={clsx(classes.icon, classes.addIcon)}
                    />
                    الگوریتم جدید
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={clsx(classes.grid, classes.scrollbarY)}>
              <Table
                className={classes.table}
                rowClassName={classes.tableRow}
                schema={schema}
                data={algorithms.Result}
                totalRecords={algorithms.TotalRecords}
                loading={isLoading}
                paging
                rowsPerPage={filter.optionalFilter.take}
                pageSize={pageSize}
                onPageChange={(page) =>
                  dispatch({ type: "changePage", payload: page })
                }
                onRowsPerPageChange={(take) =>
                  dispatch({ type: "changeTake", payload: take })
                }
              ></Table>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.console}>
          <Console />
        </Grid>
      </Splitter>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(AlgorithmList);
