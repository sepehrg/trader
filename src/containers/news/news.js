import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import NewsItem from "../../components/newsItem/newsItem";
import style from "../../shared/style";
import clsx from "clsx";
import CmdTseService from "../../services/cmdTseService";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Spinner from "../../components/UI/spinner/spinner";
import NewsIcon from "../../components/UI/icons/news";
import useDevice from "../../hooks/useDevice";
import Link from "../../components/UI/Link/Link";
import MoreLeftIcon from "../../components/UI/icons/moreLeft";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Tour from "../../components/UI/tour/tour";
import steps from "../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
  root: {
    padding: "0px 12%",
    paddingBottom: 20,
    overflow: "hidden auto",
    height: "100%",
    marginLeft: "0",
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.text.secondary,
      },
      scrollbarColor: `${theme.palette.border.primary} transparent`,
    },
    scrollbarWidth: "thin",
  },
  titleHeader: {
    alignItems: "center",
    margin: 20,
  },
  pageTitle: {
    marginRight: 10,
    fontSize: 16,
  },
  main: {
    height: "calc(100% - 68px)",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  mainMobile: {
    height: "100%",
  },
  rootMobile: {
    overflow: "hidden auto",
    height: "100%",
  },
  scrollTopBtn: {
    position: "absolute",
    bottom: 15,
    right: 10,
    opacity: 0,
    transition: "right 0.3s, opacity 0.3s",
  },
  scrollTopBtnMobile: {
    bottom: 60,
  },
  scrollTopBtnShow: {
    right: 140,
    opacity: 1,
  },
  scrollTopBtnShowMobile: {
    right: 15,
    opacity: 1,
  },
  moreLeftIcon: {
    height: 42,
    width: 42,
    backgroundColor: theme.palette.primary.main,
    fill: "#FFF",
    borderRadius: 50,
    padding: 12,
    strokeWidth: 2,
    stroke: "#FFF",
  },
}));

let cache = [];
let previousScrollPosition = 0;

const News = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const scroller = useRef();

  const [news, setNews] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFetching, setIsFetching, scrollPosition] = useInfiniteScroll(
    fetchNews,
    scroller
  );
  const [isLoading, setIsLoading] = useState(false);

  //news page title do not appear on refresh

  function fetchNews() {
    const pageSize = 16;
    const filter = {
      OptionalFilter: {
        take: pageSize,
        page: news.length / pageSize + 1,
      },
    };
    setIsLoading(true);
    CmdTseService.getNews(filter, (status, data) => {
      setNews([...news, ...data.Result]);
      cache = [...news, ...data.Result];
      setIsFetching(false);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    if (cache.length > 0) setNews(cache);
    else fetchNews();
    scrollToPosition(previousScrollPosition);
  }, []);

  const scrollChange = () => {
    if (scroller.current.scrollTop > 100) {
      setShowBackToTop(true);
    } else setShowBackToTop(false);
  };

  const scrollToPosition = (position, smooth) => {
    setTimeout(function () {
      scroller.current.scrollTo({
        top: position,
        behavior: smooth,
      });
    }, 10);
  };

  useEffect(() => {
    if (scrollPosition > 0) previousScrollPosition = scrollPosition;
  }, [scrollPosition]);

  return (
    <>
      <Grid container className={classes.container}>
        {device.isNotMobile && (
          <Grid item>
            <Grid container className={classes.titleHeader}>
              <Grid item>
                <NewsIcon className={classes.seoIcon}></NewsIcon>
              </Grid>
              <Grid item className={classes.pageTitle}>
                اخبار
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid
          item
          className={device.isNotMobile ? classes.main : classes.mainMobile}
        >
          <Grid
            container
            className={clsx(
              device.isNotMobile ? classes.root : classes.rootMobile,
              classes.scrollbarY
            )}
            ref={scroller}
            onScroll={scrollChange}
          >
            {news.map((item) => (
              <NewsItem item={item} key={item.Id} />
            ))}
            <div className={classes.spinner}>
              {(isFetching || isLoading) && <Spinner size={40} />}
            </div>
          </Grid>
        </Grid>
        <Grid
          item
          className={clsx(
            classes.scrollTopBtn,
            device.isMobile && classes.scrollTopBtnMobile,
            showBackToTop && device.isNotMobile && classes.scrollTopBtnShow,
            showBackToTop && device.isMobile && classes.scrollTopBtnShowMobile
          )}
        >
          <Link onClick={() => scrollToPosition(0, "smooth")}>
            <MoreLeftIcon className={classes.moreLeftIcon} />
          </Link>
        </Grid>
      </Grid>
      <Tour
        steps={steps.news}
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

export default connect(mapStateToProps, mapDispatchToProps)(News);
