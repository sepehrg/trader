import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SectorSummary from "../../../components/sectorSummary/sectorSummary";
import SectorSummaryPieChart from "../../../components/sectorSummaryPieChart/sectorSummaryPieChart";
import SectorSummaryStockWatch from "../../../components/sectorSummaryStockWatch/sectorSummaryStockWatch";
import CmdTseService from "../../../services/cmdTseService";
import useDevice from "../../../hooks/useDevice";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    height: "100%",
  },
  root: {
    padding: 10,
    paddingBottom: 0,
    height: "100%",
  },
  main: {
    height: "100%",
    overflow: "hidden auto",
  },
  height100: {
    height: "100%",
  },
  details: {
    height: "100%",
  },
  pieChart: {
    height: 400,
  },
  stockWatch: {
    height: "calc(100% - 400px)",
  },

  sectorSummaryPieChartMobile: {
    height: "100%",
    padding: 10,
  },
}));

const Industries = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const chartContainer = useRef();

  const [sectorId, setSectorId] = useState(0);
  const [sectorTitle, setSectorTitle] = useState("");
  const [chartWidth, setChartWidth] = useState(0);

  let isSubscribed = true;

  useEffect(() => {
    getSectorsSummary();
    return () => (isSubscribed = false);
  }, []);

  const getSectorsSummary = () => {
    CmdTseService.getSectorsSummary((status, data) => {
      if (data.Result && isSubscribed) {
        setSectorId(data.Result[0]?.SectorId);
        setSectorTitle(data.Result[0]?.SectorTitle);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();

    return () => {
      isSubscribed = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  let timer;
  const resize = () => {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (isSubscribed) {
        setChartWidth(chartContainer.current?.offsetWidth);
      }
    }, 200);
  };

  return (
    <>
      <Grid container className={classes.container}>
        {device.isNotMobile ? (
          <Grid item className={classes.root}>
            <Grid container className={classes.main} spacing={6}>
              <Grid
                item
                sm={6}
                className={classes.height100}
                data-tour="sectorSummary"
              >
                <SectorSummary
                  setSectorId={setSectorId}
                  sectorId={sectorId}
                  setSectorTitle={setSectorTitle}
                />
              </Grid>
              <Grid item sm={6} className={classes.height100}>
                <Grid container spacing={6} className={classes.details}>
                  <Grid
                    item
                    sm={12}
                    className={classes.pieChart}
                    ref={chartContainer}
                    data-tour="sectorSummaryPieChart"
                  >
                    <SectorSummaryPieChart width={chartWidth} />
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    className={classes.stockWatch}
                    data-tour="sectorSummaryStockWatch"
                  >
                    <SectorSummaryStockWatch
                      sectorId={sectorId}
                      sectorTitle={sectorTitle}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            item
            className={classes.sectorSummaryPieChartMobile}
            ref={chartContainer}
          >
            <SectorSummaryPieChart width={chartWidth} />
          </Grid>
        )}
      </Grid>
      <Tour
        steps={steps.SectorSummary}
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

export default connect(mapStateToProps, mapDispatchToProps)(Industries);
