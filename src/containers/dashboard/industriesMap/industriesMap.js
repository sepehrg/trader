import React, { useEffect, useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CmdTseService from "../../../services/cmdTseService";
import clsx from "clsx";
import Table from "../../../components/UI/Table/Table";
import style from "../../../shared/style";
import { shortenNumber, coloredPercent } from "../../../shared/utility";
import Spinner from "../../../components/UI/spinner/spinner";
import useDevice from "../../../hooks/useDevice";
import Accordion from "../../../components/UI/accordion/accordion";
import AccordionSummary from "../../../components/UI/accordion/accordionSummary/accordionSummary";
import AccordionDetails from "../../../components/UI/accordion/accordionDetails/accordionDetails";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: "100%",
    overflow: "hidden auto",
    padding: 15,
  },
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: "5px",
    padding: "10px 10px",
    height: 300,
  },
  header: {
    justifyContent: "space-between",
    height: 26,
    color: theme.palette.text.primary,
  },
  count: {
    color: theme.palette.text.secondary,
    direction: "ltr",
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    display: "flex",
    alignItems: "center",
  },
  table: {
    borderCollapse: "collapse",
    flexWrap: "nowrap",
    "& td, & th": {
      border: "none",
      fontSize: "inherit",
      textAlign: "right",
    },
    "& th": {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.box,
    },
    "& td:nth-child(4)": {
      textAlign: "left",
    },
    "& tbody tr": {
      width: "100%",
    },
  },
  tableRow: {
    borderBottom: `3px solid ${theme.palette.background.box}`,
    transition: "0.3s",
    height: 32,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },
  forScroll: {
    width: "100%",
    height: "calc(100% - 26px - 26px + 4px)",
  },
  bar: {
    width: "100%",
    height: 6,
    backgroundColor: theme.palette.border.bar,
    position: "relative",
    overflow: "hidden",
    borderRadius: 1,
    display: "flex",
  },
  posetiveBar: {
    height: "100%",
    backgroundColor: theme.palette.color.green,
  },
  notChangeBar: {
    height: "100%",
    backgroundColor: theme.palette.text.secondary,
  },
  negetiveBar: {
    height: "100%",
    backgroundColor: theme.palette.color.red,
  },
  posetiveValue: {
    color: theme.palette.color.green,
    textAlign: "right",
    overflow: "hidden",
  },
  notChangeBarValue: {
    color: theme.palette.text.secondary,
    textAlign: "center",
    overflow: "hidden",
  },
  negetiveBarValue: {
    color: theme.palette.color.red,
    textAlign: "left",
    overflow: "hidden",
  },
  direction: {
    direction: "ltr",
  },
  value: {
    paddingTop: 5,
    width: "100%",
  },
  spinner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerValue: {
    justifyContent: "space-between",
  },

  boxMobile: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.bar}`,
    borderRadius: 8,
    padding: 6,
    width: "100%",
    flexDirection: "column",
  },
  rootMobile: {
    padding: 10,
  },
  titleMobile: {
    fontSize: 12,
  },
  headerMobile: {
    height: 34,
  },
  countMobile: {
    fontSize: 12,
  },
  valueMobile: {
    fontSize: 12,
  },
  tableMobile: {
    fontSize: 12,
  },
  barMobile: {
    height: 12,
    borderRadius: 4,
  },
}));

const IndustriesMap = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let isSubscribed = true;

  useEffect(() => {
    getData();
    return () => (isSubscribed = false);
  }, []);

  const getData = () => {
    setLoading(true);
    CmdTseService.getTreeMap((status, data) => {
      if (data && isSubscribed) {
        setData(data);
        setLoading(false);
      }
    });
  };

  const getStyle = (children, condition) => {
    return {
      width: `${(children.filter(condition).length / children.length) * 100}%`,
    };
  };

  const getLabel = (children, condition) => {
    return children.filter(condition).length;
  };

  const schema = {
    columns: [
      {
        field: "name",
      },
      {
        field: "InstrumentTitle",
      },
      {
        field: "rate",
        format: (value) => coloredPercent(value, theme, true, true),
      },
      {
        field: "value",
        format: (value) => (
          <div className={classes.direction}>{shortenNumber(value)}</div>
        ),
      },
    ],
  };

  const Summary = (props) => (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            className={clsx(
              classes.header,
              device.isMobile && classes.headerMobile
            )}
          >
            <Grid
              item
              className={clsx(
                classes.title,
                device.isMobile && classes.titleMobile
              )}
              data-tour="industriesMapSectorTitle"
            >
              {props.item.Sector}
            </Grid>
            <Grid
              item
              className={clsx(
                classes.count,
                device.isMobile && classes.countMobile
              )}
              data-tour="industriesMapValue"
            >
              {shortenNumber(
                props.item.children
                  .map((item) => item.value)
                  .reduce((x, y) => (x = x + y), 0)
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} data-tour="industriesMapChart">
          <Grid container>
            <Grid
              item
              className={clsx(
                classes.bar,
                device.isMobile && classes.barMobile
              )}
            >
              <div
                className={classes.posetiveBar}
                style={getStyle(props.item.children, (c) => c.rate > 0)}
              ></div>
              <div
                className={classes.notChangeBar}
                style={getStyle(props.item.children, (c) => c.rate === 0)}
              ></div>
              <div
                className={classes.negetiveBar}
                style={getStyle(props.item.children, (c) => c.rate < 0)}
              ></div>
            </Grid>
            <Grid
              item
              className={clsx(
                classes.value,
                device.isMobile && classes.valueMobile
              )}
            >
              <Grid container>
                <Grid
                  item
                  className={classes.posetiveValue}
                  style={getStyle(props.item.children, (c) => c.rate > 0)}
                >
                  {getLabel(props.item.children, (c) => c.rate > 0)}
                </Grid>
                <Grid
                  item
                  className={classes.notChangeBarValue}
                  style={getStyle(props.item.children, (c) => c.rate === 0)}
                >
                  {getLabel(props.item.children, (c) => c.rate === 0)}
                </Grid>
                <Grid
                  item
                  className={classes.negetiveBarValue}
                  style={getStyle(props.item.children, (c) => c.rate < 0)}
                >
                  {getLabel(props.item.children, (c) => c.rate < 0)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const Details = (props) => (
    <Grid
      item
      xs={12}
      className={clsx(classes.forScroll, classes.scrollbarY)}
      data-tour="industriesMapGrid"
    >
      <Table
        className={clsx(classes.table, device.isMobile && classes.tableMobile)}
        rowClassName={classes.tableRow}
        schema={schema}
        data={props.item.children}
        hideHeader={true}
      ></Table>
    </Grid>
  );

  return (
    <>
      <Grid
        container
        className={clsx(
          classes.root,
          classes.scrollbarY,
          device.isMobile && classes.rootMobile
        )}
      >
        <Grid item xs={12}>
          <Grid container spacing={6}>
            {data.length > 0
              ? data.map((item, i) => (
                  <Grid item lg={3} md={4} xs={12} key={i}>
                    <Grid
                      container
                      className={clsx(
                        device.isNotMobile ? classes.main : classes.boxMobile
                      )}
                    >
                      {device.isNotMobile ? (
                        <>
                          <Summary item={item} />
                          <Details item={item} />
                        </>
                      ) : (
                        <Accordion>
                          <AccordionSummary>
                            <Summary item={item} />
                          </AccordionSummary>
                          <AccordionDetails>
                            <Details item={item} />
                          </AccordionDetails>
                        </Accordion>
                      )}
                    </Grid>
                  </Grid>
                ))
              : [...Array(12).keys()].map((i) => (
                  <Grid item lg={3} md={4} xs={12} key={i}>
                    <Grid
                      container
                      className={clsx(
                        device.isNotMobile ? classes.main : classes.boxMobile
                      )}
                    >
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid
                              container
                              className={clsx(
                                classes.header,
                                device.isMobile && classes.headerMobile
                              )}
                            >
                              <Grid
                                item
                                className={clsx(
                                  classes.title,
                                  device.isMobile && classes.titleMobile
                                )}
                              >
                                بدون اطلاعات
                              </Grid>
                              <Grid
                                item
                                className={clsx(
                                  classes.count,
                                  device.isMobile && classes.countMobile
                                )}
                              >
                                0
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid
                                item
                                className={clsx(
                                  classes.bar,
                                  device.isMobile && classes.barMobile
                                )}
                              >
                                <div className={classes.posetiveBar}></div>
                                <div className={classes.notChangeBar}></div>
                                <div className={classes.negetiveBar}></div>
                              </Grid>
                              <Grid
                                item
                                className={clsx(
                                  classes.value,
                                  device.isMobile && classes.valueMobile
                                )}
                              >
                                <Grid container className={classes.innerValue}>
                                  <Grid item className={classes.posetiveValue}>
                                    0
                                  </Grid>
                                  <Grid
                                    item
                                    className={classes.notChangeBarValue}
                                  >
                                    0
                                  </Grid>
                                  <Grid
                                    item
                                    className={classes.negetiveBarValue}
                                  >
                                    0
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className={clsx(
                          classes.forScroll,
                          classes.scrollbarY,
                          classes.spinner
                        )}
                      ></Grid>
                    </Grid>
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
      <Tour
        steps={steps.industriesMap}
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

export default connect(mapStateToProps, mapDispatchToProps)(IndustriesMap);
