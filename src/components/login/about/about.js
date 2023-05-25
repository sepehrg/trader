import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import withWidth from "@material-ui/core/withWidth";
import ShieldBlockIcon from "../../UI/icons/shieldBlock";
import Fade from "@material-ui/core/Fade";
// import Slide from "@material-ui/core/Slide";
import mockup from "../../../assets/images/mockup.png";
import mockup2 from "../../../assets/images/mockup2.png";
import style from "../../../shared/style";
import FeaturesFast from "../../UI/icons/featuresFast";
import FeaturesSafe from "../../UI/icons/featuresSafe";
import FeaturesModern from "../../UI/icons/featuresModern";
import { Typography } from "@material-ui/core";
import ReactPageScroller from "react-page-scroller";
// import { Pager } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import ScrollPager from "../components/UI/scrollPager/scrollPager";

const useStyles = makeStyles((theme) => ({
  // ...style(theme),
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0px",
    },
  },
  root: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  slide: {
    backgroundColor: "#1F2229f5",
  },
  controls: {
    position: "fixed",
    left: 0,
    top: "50%",
    display: "flex",
    flexDirection: "column",
  },
  pagination: {
    position: "fixed",
    left: 0,
    top: "45%",
    flexDirection: "column",
  },
}));

const LoginForm = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [slide, setSlide] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    setSlide(value - 1);
    // console.log(value);
  };

  const scrollChange = (number) => {
    setPage(number + 1);
    setSlide(number);
    // console.log(number);
  };

  return (
    <React.Fragment>
      <ReactPageScroller
        containerWidth="100%"
        containerHeight="100%"
        customPageNumber={slide}
        pageOnChange={scrollChange}
      >
        <div>11111111111</div>
        <div>22222222</div>
        <div>333333333333</div>
      </ReactPageScroller>
      {/* <Pagination
        count={3}
        page={page}
        onChange={handleChange}
        classes={{ ul: classes.paginationUl }}
        variant="outlined"
      /> */}
      <ScrollPager
        count={3}
        page={page}
        onChange={handleChange}
        paginationClassName={classes.pagination}
      />
    </React.Fragment>
  );
};

export default withWidth()(LoginForm);
