import React from "react";
import Watchlist from "../../watchlist/watchlist";
import HotList from "../../hotList/hotList";

const MobileWatchlistPane = (props) => {
  return (
    <>
      <Watchlist title={props.title} setHotListOpen={props.setHotListOpen} />
      <HotList
        hotListOpen={props.hotListOpen}
        setHotListOpen={props.setHotListOpen}
      ></HotList>
    </>
  );
};

export default MobileWatchlistPane;
