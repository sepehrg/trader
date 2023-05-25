import React, { useState, useEffect, useReducer, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  toJalaliDate,
  coloredPercent,
  updateObject,
} from "../../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "../../../components/UI/Table/Table";
import Button from "../../../components/UI/Button/Button";
import DateFilter from "../../../components/UI/dateFilter/dateFilter";
import InstrumentLookup from "../../../components/UI/instrumentLookup/instrumentLookup";
import TseCfaService from "../../../services/tseCfaService";
import Checkbox from "../../../components/UI/checkbox/checkbox";
import SearchIcon from "../../../components/UI/icons/search";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";
import TurnoverItem from "./turnoverItem/turnoverItem";
import Dialog from "../../../components/UI/dialog/dialog";
import FilterIcon from "../../../components/UI/icons/filter";
import Chip from "../../../components/UI/chip/chip";
import Link from "../../../components/UI/Link/Link";
import BankTransferIcon from "../../../components/UI/icons/bankTransfer";
import Accordion from "../../../components/UI/accordion/accordion";
import MoreIcon from "../../../components/UI/icons/more";
import Spinner from "../../../components/UI/spinner/spinner";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
    flexFlow: "nowrap",
  },
  header: {
    padding: 10,
    display: "flex",
    // alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
    paddingTop: 4,
    whiteSpace: "nowrap",
  },
  forScroll: {
    height: "calc(100% - 62px - 44px)",
    overflowY: "scroll",
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
      backgroundColor: theme.palette.background.default,
      // borderBottom: `3px solid ${theme.palette.background.default}`,
    },
    "& thead, & tbody tr": {
      width: "100%",
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
      backgroundColor: theme.palette.action.hover,
    },
  },
  footerClassName: {
    backgroundColor: theme.palette.background.default,
    "&:nth-of-type(even)": {
      borderBottom: `1px solid ${theme.palette.background.paper}`,
    },
    height: 39,
  },
  date: {
    direction: "ltr",
  },
  filter: {
    padding: 12,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  filterBtn: {
    height: "100%",
    width: "100%",
    minWidth: 100,
    padding: 0,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  checkboxes: {
    marginLeft: 30,
    display: "flex",
  },
  checkboxLabel: {
    fontSize: 13,
    color: theme.palette.text.primary,
  },
  main: {
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  searchIcon: {
    fill: theme.palette.primary.main,
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  submit: {
    minWidth: 140,
    maxWidth: 200,
    height: 50,
    marginRight: "auto",
  },
  filterBtn: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    fontSize: 11,
    marginRight: 10,
    "&:before": {
      content: "''",
      width: 2,
      height: 25,
      backgroundColor: theme.palette.border.secondary,
      display: "flex",
      marginLeft: 15,
    },
  },
  containerFilter: {
    display: "flex",
  },
  dialogContent: {
    padding: 16,
  },

  rootMobile: {
    padding: 0,
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
    margin: "auto",
    display: "flex",
  },
  filterChipMobile: {
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
  scrollMobile: {
    height: "100%",
    overflow: "hidden scroll",
    padding: 10,
  },
  filterMobile: {
    height: 42,
  },
  checkboxesMobile: {
    justifyContent: "space-around",
  },
  checkboxLabelMobile: {
    fontSize: 15,
    color: theme.palette.text.secondary,
  },
  footerMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footerItemMobile: {
    display: "flex",
    justifyContent: "space-around",
  },

  boxMobile: {
    // border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.border.bar,
    // borderRadius: 8,
    padding: "3px 9px",
    width: "calc(100% + 20px)",
    position: "sticky",
    bottom: 48,
    margin: "5px -10px 0 -10px",
  },
  mainTotal: {
    flexDirection: "column",
  },
  titleTotal: {
    fontSize: 14,
    padding: "4px 10px",
    textAlign: "right",
  },
  info: {
    // borderTop: `1px solid ${theme.palette.border.primary}`,
  },
  infoInner: {
    padding: "10px 0px",
    flexDirection: "column",
  },
  infoItem: {
    justifyContent: "space-between",
    // backgroundColor: `${theme.palette.border.secondary}99`,
    // borderRadius: 20,
    padding: "1px 10px",
    minHeight: 32,
    alignItems: "center",
    fontSize: 13,
  },
  infoItemNotLastChild: {
    borderBottom: `1px solid ${theme.palette.background.box}`,
  },
  infoItemTitle: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  rootSummary: {
    minHeight: "auto !important",
    flexDirection: "row",
  },
  accordionDetails: {
    backgroundColor: "transparent",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dialogContentMobile: {
    padding: "0 16px 28px 16px",
  },
  searchBtn: {
    height: "100%",
    width: "100%",
    minWidth: 100,
    padding: 0,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },

  fullHeight: {
    height: "100%",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
  },
  boxMobileContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
}));

const Turnover = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();
  const scroller = useRef();

  const [isFetching, setIsFetching] = useInfiniteScroll(getTurnover, scroller);
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [turnover, setTurnover] = useState({});
  const [doneFetching, setDoneFetching] = useState(true);

  const pageSize = Math.round(
    device.isNotMobile
      ? (window.innerHeight - (70 + 20 + 44 + 62 + 36 + 52 + 35)) / 43
      : (window.innerHeight - (45 + 26 + 45 + 48)) / 70
  );

  const initialState = {
    take: pageSize,
    page: 1,
    withDetail: false,
    withPreRemain: false,
    startDate: new Date(new Date().setDate(new Date().getDate() - 31)),
    endDate: new Date(),
    instrument: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "take":
        return updateObject(state, {
          take: action.take,
        });
      case "page":
        return updateObject(state, {
          page: action.page,
        });
      case "startDate":
        return updateObject(state, {
          startDate: action.startDate,
        });
      case "endDate":
        return updateObject(state, {
          endDate: action.endDate,
        });
      case "instrument":
        return updateObject(state, {
          instrument: action.instrument,
        });
      case "withDetail":
        return updateObject(state, {
          withDetail: action.withDetail,
        });
      case "withPreRemain":
        return updateObject(state, {
          withPreRemain: action.withPreRemain,
        });
      case "reset":
        return initialState;
    }
  };

  const [filter, dispatch] = useReducer(reducer, initialState);

  const submitHandler = (event) => {
    event.preventDefault();
    getTurnover();
    setFilterModalIsOpen(false);
  };

  function getTurnover() {
    if (doneFetching) {
      const request = {
        withDetail: filter.withDetail,
        withPreRemain: filter.withPreRemain,
        optionalFilter: {
          take: filter.take,
          page: device.isNotMobile
            ? filter.page
            : (turnover.TurnoverItemModels?.length || 0) / filter.take + 1,
        },
        reportFilter: {
          dateFilter: {
            startDate: filter.startDate,
            endDate: filter.endDate,
          },
          searchItem: filter.instrument
            ? [
                {
                  property: "isin",
                  value: filter.instrument.Isin,
                  operation: 0,
                },
              ]
            : [],
        },
      };
      setLoading(true);
      TseCfaService.getTurnovers(request, (status, data) => {
        if (data?.Success) {
          if (device.isNotMobile) setTurnover(data.Result);
          else {
            setTurnover({
              TurnoverItemModels: [
                ...(turnover.TurnoverItemModels || []),
                ...data.Result.TurnoverItemModels,
              ],
              TurnoverFooterTotalModel: data.Result.TurnoverFooterTotalModel,
              TotalRecords: data.Result.TotalRecords,
            });
            if (
              data.Result.TurnoverItemModels.length === data.Result.TotalRecords
            )
              setDoneFetching(true);
          }
        }
        setLoading(false);
        if (device.isMobile) setIsFetching(false);
      });
    }
  }

  const checkboxChangeHandler = (event) => {
    dispatch({
      type: event.target.name,
      [event.target.name]: event.target.checked,
    });
  };

  const dateChangeHandler = (event, name) => {
    dispatch({ type: name, [name]: event._d });
  };

  const instrumentChangeHandler = (instrument) => {
    dispatch({ type: "instrument", instrument });
  };

  const pageChangeHandler = (page) => {
    dispatch({ type: "page", page });
  };

  const rowsPerPageChangeHandler = (take) => {
    dispatch({ type: "take", take });
  };

  useEffect(() => {
    getTurnover();
  }, [filter.page, filter.take]);

  const schema = {
    columns: [
      {
        field: "EntryDate",
        title: "تاریخ",
        format: (value) => toJalaliDate(value),
      },
      {
        field: "Description",
        title: "شرح",
      },
      {
        field: "Creditor",
        title: "بستانکار",
        format: (value) => coloredPercent(value, theme),
      },
      {
        field: "Debtor",
        title: "بدهکار",
        format: (value) => coloredPercent(value, theme),
      },
      {
        field: "AccountRemaining",
        title: "مانده",
        format: (value) => coloredPercent(value, theme),
      },
    ],
  };

  const filterClose = () => {
    setFilterModalIsOpen(false);
  };

  const filterClear = () => {
    dispatch({ type: "reset" });
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

  const deleteHandler = (field) => {
    dispatch({ type: field, [field]: field === "instrument" ? null : false });
    getTurnover();
  };

  const openFilterModal = () => {
    setFilterModalIsOpen(true);
  };

  const chips = (
    <>
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
      {filter.withDetail && (
        <Chip
          label="با جزئیات"
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("withDetail")}
        />
      )}
      {filter.withPreRemain && (
        <Chip
          label="با نقل از قبل"
          onClick={() => setFilterModalIsOpen(true)}
          onDelete={() => deleteHandler("withPreRemain")}
        />
      )}
    </>
  );

  return (
    <>
      <Grid
        container
        className={clsx(classes.root, device.isMobile && classes.rootMobile)}
      >
        <Grid item className={classes.fullHeight} data-tour="turnover">
          <Grid
            container
            className={clsx(
              device.isNotMobile ? classes.box : classes.boxMobileContainer
            )}
          >
            <Dialog
              title="فیلتر گردش حساب"
              open={filterModalIsOpen}
              onClose={filterClose}
              dialogActions={device.isMobile && dialogActions}
              fullWidth
              maxWidth="xs"
            >
              <form onSubmit={submitHandler}>
                <Grid container className={classes.filter} spacing={6}>
                  <Grid item xs={12}>
                    <InstrumentLookup
                      onInstrumentChange={instrumentChangeHandler}
                      value=""
                      label="جستجوی نماد"
                    ></InstrumentLookup>
                  </Grid>
                  <Grid item xs={12}>
                    <DateFilter
                      onStartDateChange={dateChangeHandler}
                      onEndDateChange={dateChangeHandler}
                      startDate={filter.startDate}
                      endDate={filter.endDate}
                    ></DateFilter>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className={clsx(
                      classes.checkboxes,
                      device.isMobile && classes.checkboxesMobile
                    )}
                  >
                    <Checkbox
                      label="با جزئیات"
                      name="withDetail"
                      checked={filter.withDetail}
                      onChange={checkboxChangeHandler}
                      labelClassName={clsx(
                        classes.checkboxLabel,
                        device.isMobile && classes.checkboxLabelMobile
                      )}
                    ></Checkbox>
                    <Checkbox
                      label="با نقل از قبل"
                      name="withPreRemain"
                      checked={filter.withPreRemain}
                      onChange={checkboxChangeHandler}
                      labelClassName={clsx(
                        classes.checkboxLabel,
                        device.isMobile && classes.checkboxLabelMobile
                      )}
                    ></Checkbox>
                  </Grid>
                  {device.isNotMobile && (
                    <Grid item className={classes.submit}>
                      <Button
                        type="submit"
                        variant="outlined"
                        className={classes.searchBtn}
                      >
                        <SearchIcon className={classes.searchIcon} />
                        جستجو
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Dialog>
            {device.isNotMobile && (
              <Grid item>
                <Grid container className={classes.main}>
                  <Grid item className={classes.header}>
                    <BankTransferIcon
                      className={classes.icon}
                    ></BankTransferIcon>
                    <Typography variant="h2" className={classes.title}>
                      گردش حساب
                    </Typography>
                  </Grid>
                  <Grid item className={classes.containerFilter}>
                    <Grid container>
                      <Grid item className={classes.filterChip}>
                        {chips}
                      </Grid>
                      <Grid item className={classes.filterBtn}>
                        <Link onClick={() => setFilterModalIsOpen(true)}>
                          فیلتر
                          <FilterIcon className={classes.searchIcon} />
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {device.isMobile && (
              <>
                {/* <Dialog
            title="فیلتر گردش حساب"
            open={filterModalIsOpen}
            onClose={filterClose}
            dialogActions={dialogActions}
          >
            <Grid item className={classes.dialogContent}>
              <form onSubmit={submitHandler}>{searchForm}</form>
            </Grid>
          </Dialog> */}
                <Grid item className={classes.filterMobile}>
                  <Grid
                    container
                    className={classes.filterInnerMobile}
                    spacing={6}
                  >
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
                    <Grid item xs={10} className={classes.filterChipMobile}>
                      {chips}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}

            {device.isNotMobile ? (
              <Grid item className={classes.forScroll}>
                <Table
                  className={classes.table}
                  rowClassName={classes.tableRow}
                  schema={schema}
                  data={turnover.TurnoverItemModels}
                  totalRecords={turnover.TotalRecords}
                  loading={loading}
                  paging
                  rowsPerPage={filter.take}
                  onPageChange={pageChangeHandler}
                  onRowsPerPageChange={rowsPerPageChangeHandler}
                  pageSum={turnover.TurnoverFooterPageModel}
                  totalSum={turnover.TurnoverFooterTotalModel}
                  footerClassName={classes.footerClassName}
                  footerMobileClassName={classes.footerMobile}
                  footerItemMobileClassName={classes.footerItemMobile}
                  pageSize={pageSize}
                ></Table>
              </Grid>
            ) : (
              <>
                <Grid item className={classes.scrollMobile} ref={scroller}>
                  {turnover.TurnoverItemModels?.map((item, i) => (
                    <TurnoverItem data={item} key={i} />
                  ))}
                  <div className={classes.spinner}>
                    {doneFetching ? (
                      <span>پایان لیست</span>
                    ) : (
                      isFetching && <Spinner size={40} />
                    )}
                  </div>
                </Grid>
                <Grid item className={classes.boxMobile}>
                  <Grid container className={classes.mainTotal}>
                    <Accordion
                      summaryClassName={classes.rootSummary}
                      detailsClassName={classes.accordionDetails}
                      expandIcon={<MoreIcon className={classes.expandIcon} />}
                    >
                      <Grid item xs={12} className={classes.titleTotal}>
                        جمع کل
                      </Grid>
                      <Grid item xs={12} className={classes.info}>
                        {turnover.TurnoverFooterTotalModel && (
                          <Grid
                            container
                            spacing={2}
                            className={classes.infoInner}
                          >
                            <Grid item>
                              <Grid
                                container
                                className={clsx(
                                  classes.infoItem,
                                  classes.infoItemNotLastChild
                                )}
                              >
                                <Grid item className={classes.infoItemTitle}>
                                  بستانکار
                                </Grid>
                                <Grid item>
                                  {coloredPercent(
                                    turnover.TurnoverFooterTotalModel.Creditor,
                                    theme
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                className={clsx(
                                  classes.infoItem,
                                  classes.infoItemNotLastChild
                                )}
                              >
                                <Grid item className={classes.infoItemTitle}>
                                  بدهکار
                                </Grid>
                                <Grid item>
                                  {coloredPercent(
                                    turnover.TurnoverFooterTotalModel.Debtor,
                                    theme
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid container className={classes.infoItem}>
                                <Grid item className={classes.infoItemTitle}>
                                  مانده
                                </Grid>
                                <Grid item>
                                  {coloredPercent(
                                    turnover.TurnoverFooterTotalModel
                                      .AccountRemaining,
                                    theme
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Accordion>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Tour
        steps={steps.turnover}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Turnover);
