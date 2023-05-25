import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { comma } from "../../../shared/utility";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "../../../components/UI/Table/Table";
import TseOmsService from "../../../services/tseOmsService";
import Tour from "../../../components/UI/tour/tour";
import steps from "../../../enums/tourSteps";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
  },
  title: {
    padding: 10,
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
}));

const Portfolio = (props) => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    TseOmsService.getIdentityCsdAssetInfos({}, (status, data) => {
      setData(data);
    });
  };

  const schema = {
    columns: [
      {
        field: "InstrumentPersianCode",
        title: "نماد",
      },
      {
        field: "Quantity",
        title: "تعداد",
        format: (value) => comma(value),
      },
      {
        field: "ClosingPrice",
        title: "قیمت پایانی",
        format: (value) => comma(value),
      },
      {
        field: "LastTradePrice",
        title: "قیمت لحظه ای",
        format: (value) => comma(value),
      },
    ],
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item className={classes.fullHeight} data-tour="portfolio">
          <Grid container className={classes.box}>
            <Grid item className={classes.title}>
              <Typography>پرتفوی سپرده‌گذاری</Typography>
            </Grid>
            <Grid item className={classes.forScroll}>
              <Table
                className={classes.table}
                rowClassName={classes.tableRow}
                data={data.Result}
                schema={schema}
              ></Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Tour
        steps={steps.portfolio}
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
