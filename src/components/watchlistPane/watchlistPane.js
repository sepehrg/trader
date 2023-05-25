import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import useDevice from "../../hooks/useDevice";
import { connect } from "react-redux";
import DefaultWatchlistPane from "./views/default";
import MobileWatchlistPane from "./views/mobile";
import WidgetWatchlistPane from "./views/widget";
import AdvancedWatchlistPane from "./views/advanced";

const WatchlistPane = (props) => {
  const theme = useTheme();
  const device = useDevice();

  const [searchOpen, setSearchOpen] = useState(false);
  const [hotListOpen, setHotListOpen] = useState(false);
  const [expand, setExpand] = useState(
    window.innerWidth < theme.breakpoints.values.md ? false : true
  );

  const toggleCollapse = () => {
    setExpand(!expand);
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  };

  useEffect(() => {
    setExpand(isWidthUp("md", props.width));
  }, [props.width]);

  const defaultProps = {
    title: props.title,
    searchOpen,
    setSearchOpen,
    hotListOpen,
    setHotListOpen,
  };

  return (
    <>
      {device.isMobile ? (
        <MobileWatchlistPane {...defaultProps} />
      ) : props.widget ? (
        <WidgetWatchlistPane {...defaultProps} />
      ) : props.advanced ? (
        <AdvancedWatchlistPane {...defaultProps} />
      ) : (
        <DefaultWatchlistPane
          {...defaultProps}
          expand={expand}
          toggleCollapse={toggleCollapse}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.app.watchlistTitle,
  };
};

export default withWidth()(connect(mapStateToProps)(WatchlistPane));
