import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import MessageTypes from "../../enums/messageTypes";
import Components from "../../enums/components";
import WidgetTypes from "../../enums/widgetTypes";
import CmdTseService from "../../services/cmdTseService";
import useDevice from "../../hooks/useDevice";
import DefaultInstrument from "./views/default";
import MobileInstrument from "./views/mobile";
import WidgetInstrument from "./views/widget";

const Instrument = (props) => {
  const buyRef = useRef();
  const sellRef = useRef();
  const device = useDevice();

  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.length > 1)
      CmdTseService.searchInstrument(searchInput, (status, data) => {
        setSearchResults(data.Result);
      });
    else setSearchResults([]);
  }, [searchInput]);

  const subscribe = (id) => {
    props.subscribe(MessageTypes.Trade, id, Components.Instrument);
    props.subscribe(MessageTypes.ClosingPrice, id, Components.Instrument);
    props.subscribe(
      MessageTypes.InstrumentStateChange,
      id,
      Components.Instrument
    );
    props.subscribe(MessageTypes.StaticThreshold, id, Components.Instrument);
  };

  const unsubscribe = (id) => {
    props.unsubscribe(MessageTypes.Trade, id, Components.Instrument);
    props.unsubscribe(MessageTypes.ClosingPrice, id, Components.Instrument);
    props.unsubscribe(
      MessageTypes.InstrumentStateChange,
      id,
      Components.Instrument
    );
    props.unsubscribe(MessageTypes.StaticThreshold, id, Components.Instrument);
  };

  useEffect(() => {
    if (props.instrument) subscribe(props.instrument.InstrumentId);
    return () => {
      if (props.instrument) unsubscribe(props.instrument.InstrumentId);
    };
  }, [props.instrument]);

  const openTradeModalBuy = useCallback(() => {
    if (props.instrument) props.openTradeModal(props.instrument.Isin, 0);
  }, [props.instrument]);

  const openTradeModalSell = useCallback(() => {
    if (props.instrument) props.openTradeModal(props.instrument.Isin, 1);
  }, [props.instrument]);

  const openTradeWidgetBuy = () => {
    if (props.instrument) {
      props.setTradeSide(0);
      props.addWidgetItem(WidgetTypes.Trade);
    }
  };

  const openTradeWidgetSell = () => {
    if (props.instrument) {
      props.setTradeSide(1);
      props.addWidgetItem(WidgetTypes.Trade);
    }
  };

  const closeSearchHandler = () => {
    setSearchIsOpen(false);
    setSearchResults([]);
  };

  useEffect(() => {
    setSearchIsOpen(false);
  }, [props.instrument]);

  const openSearchHandler = () => {
    setSearchIsOpen(!searchIsOpen);
    setSearchResults([]);
  };

  return (
    <>
      {device.isMobile ? (
        <MobileInstrument />
      ) : props.widget ? (
        <WidgetInstrument
          instrument={props.instrument}
          onTradeModalBuyOpen={openTradeWidgetBuy}
          onTradeModalSellOpen={openTradeWidgetSell}
        />
      ) : (
        <DefaultInstrument
          ref={{ buyRef, sellRef }}
          instrument={props.instrument}
          openedModals={props.openedModals}
          searchResults={searchResults}
          onSearchClose={closeSearchHandler}
          onSearchValueChange={setSearchInput}
          onInstrumentChange={props.onInstrumentChange}
          onSearchOpen={openSearchHandler}
          onTradeModalBuyOpen={openTradeModalBuy}
          onTradeModalSellOpen={openTradeModalSell}
          searchIsOpen={searchIsOpen}
          closeTradeModal={props.closeTradeModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    openedModals: state.app.openedModals,
    permissions: state.account.permissions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (messageType, instrumentId, component) =>
      dispatch(actions.subscribe(messageType, instrumentId, component)),
    unsubscribe: (messageType, instrumentId, component) =>
      dispatch(actions.unsubscribe(messageType, instrumentId, component)),
    openTradeModal: (isin, side) =>
      dispatch(actions.openTradeModal(isin, side)),
    closeTradeModal: (key) => dispatch(actions.closeTradeModal(key)),
    onInstrumentChange: (isin) => dispatch(actions.setInstrument(isin)),
    addWidgetItem: (item) => dispatch(actions.addWidgetItem(item)),
    setTradeSide: (tradeSide) => dispatch(actions.setTradeSide(tradeSide)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Instrument);
