import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import MessageTypes from "../../enums/messageTypes";
import Components from "../../enums/components";
import TseBofService from "../../services/tseBofService";
import { removeItemAtIndex } from "../../shared/utility";
import useDevice from "../../hooks/useDevice";
import { useHistory } from "react-router-dom";
import DefaultWatchlist from "./views/default";
import MobileWatchlist from "./views/mobile";
import WidgetWatchlist from "./views/widget";
import AdvancedWatchlist from "./views/advanced";

const Watchlist = (props) => {
  const device = useDevice();
  const history = useHistory();

  const [instruments, setInstruments] = useState(null);

  useEffect(() => {
    setInstruments(props.watchlistInstruments);
  }, [props.watchlistInstruments]);

  useEffect(() => {
    if (instruments && instruments.length > 0) {
      if (device.isNotMobile) props.setInstrument(instruments[0].Isin);
      const instrumentIds = instruments.map((i) => i.InstrumentId);
      props.subscribeAll(
        instrumentIds,
        MessageTypes.Trade,
        Components.Watchlist
      );
      props.subscribeAll(
        instrumentIds,
        MessageTypes.InstrumentStateChange,
        Components.Watchlist
      );
    }
    return () => {
      if (instruments && instruments.length > 0) {
        const instrumentIds = instruments.map((i) => i.InstrumentId);
        props.unsubscribeAll(
          instrumentIds,
          MessageTypes.Trade,
          Components.Watchlist
        );
        props.unsubscribeAll(
          instrumentIds,
          MessageTypes.InstrumentStateChange,
          Components.Watchlist
        );
      }
    };
  }, [instruments]);

  const deleteItem = (id) => {
    TseBofService.deleteUserWatchListItem(id, (status, data) => {
      if (status) {
        const index = instruments.findIndex((item) => item.Id === id);
        setInstruments(removeItemAtIndex(instruments, index));
        props.notifySuccess("با موفقیت حذف شد");
      }
    });
  };

  const instrumentClickHandler = (ins) => {
    if (device.isMobile) {
      localStorage.setItem("instrument", ins.Isin);
      props.setInstrument(null);
      history.push("/tse");
      props.setBackButton(true);
    }
    props.setInstrument(ins.Isin);
  };

  const defaultProps = {
    instruments: instruments,
    title: props.title,
    setHotListOpen: props.setHotListOpen,
    setSearchOpen: props.setSearchOpen,
    onClick: instrumentClickHandler,
    onDelete: deleteItem,
  };

  return (
    <>
      {device.isMobile ? (
        <MobileWatchlist {...defaultProps} />
      ) : props.widget ? (
        <WidgetWatchlist {...defaultProps} />
      ) : props.advanced ? (
        <AdvancedWatchlist {...defaultProps} />
      ) : (
        <DefaultWatchlist {...defaultProps} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    watchlistInstruments: state.app.watchlistInstruments,
    title: state.app.watchlistTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInstrument: (isin) => dispatch(actions.setInstrument(isin)),
    subscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.subscribeAll(instrumentIds, messageType, component)),
    unsubscribeAll: (instrumentIds, messageType, component) =>
      dispatch(actions.unsubscribeAll(instrumentIds, messageType, component)),
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
    setBackButton: (state) => dispatch(actions.setBackButton(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
