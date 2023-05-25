import React from "react";
import Watchlist from "../../watchlist/watchlist";
import HotList from "../../hotList/hotList";

const WidgetWatchlistPane = (props) => {
  return (
    <>
      <Watchlist
        widget
        title={props.title}
        setHotListOpen={props.setHotListOpen}
      />
      <HotList
        widget
        hotListOpen={props.hotListOpen}
        setHotListOpen={props.setHotListOpen}
      ></HotList>
    </>
  );
};

export default WidgetWatchlistPane;
