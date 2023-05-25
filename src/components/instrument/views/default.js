import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TradeModal from "../../tradeModal/tradeModal";
import Tooltip from "../../UI/Tooltip/Tooltip";
import BuyIcon from "../../UI/icons/buy";
import SellIcon from "../../UI/icons/sell";
import Link from "../../UI/Link/Link";
import SearchIcon from "../../UI/icons/search";
import Favorites from "../favorites/favorites";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PriceInfo from "../priceInfo/priceInfo";
import ClosingPriceInfo from "../closingPriceInfo/closingPriceInfo";
import TradeInfo from "../tradeInfo/tradeInfo";
import SearchResult from "../../search/searchResult/searchResult";
import InstrumentSearch from "../../instrumentSearch/instrumentSearch";
import { GlobalHotKeys } from "react-hotkeys";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: 6,
  },
  main: {
    padding: theme.spacing(2),
    paddingTop: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  marketName: {
    fontSize: "11px",
    cursor: "default",
    color: theme.palette.text.secondary,
  },
  info: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    padding: theme.spacing(2),
    borderRadius: "5px 0 5px 5px",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
  finalPrice: {
    margin: "auto",
    fontSize: "11px",
    color: theme.palette.text.primary,
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 180,
    textAlign: "center",
  },
  infoTable: {
    margin: "auto",
    alignItems: "center",
  },
  btnBuySell: {
    alignItems: "center",
  },
  buyBtn: {
    height: 24,
    width: 24,
    verticalAlign: "middle",
    "&:hover": {
      fill: theme.palette.color.blue,
    },
  },
  sellBtn: {
    height: 24,
    width: 24,
    verticalAlign: "middle",
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  alignCenter: {
    alignItems: "center",
  },
  icon: {
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down("xs")]: {
    info: {
      flexWrap: "wrap",
    },
    finalPrice: {
      order: "1",
      margin: 0,
    },
    infoTable: {
      order: "3",
    },
    btnBuySell: {
      order: "2",
      margin: 0,
    },
  },
  contentBtn: {
    marginRight: theme.spacing(2),
  },
  box: {
    textAlign: "center",
  },
  title: {
    flex: 1,
    height: 32,
    marginLeft: 20,
  },
  searchInput: {
    backgroundColor: theme.palette.background.default,
    marginTop: 1,
  },
  searchItem: {
    position: "relative",
  },
  result: {
    backgroundColor: theme.palette.border.secondary,
    position: "absolute",
    zIndex: 10,
    width: "100%",
    padding: "0 15px",
    maxHeight: 383,
    overflowY: "scroll",
  },
  companyTitle: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
    marginLeft: 3,
  },
}));

const DefaultInstrument = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const theme = useTheme();

  const keyMap = {
    BUY_ORDER: "b",
    SELL_ORDER: "s",
  };

  const handlers = {
    BUY_ORDER: () => ref.buyRef.current.click(),
    SELL_ORDER: () => ref.sellRef.current.click(),
  };

  return (
    <>
      {props.openedModals.map((m) => (
        <TradeModal
          key={m.key}
          id={m.key}
          open={true}
          instrument={m.instrument}
          instrumentId={m.instrument.InstrumentId}
          side={m.side}
          onClose={props.closeTradeModal}
          order={m.order}
          isDraftEdit={m.isDraftEdit}
        ></TradeModal>
      ))}
      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
      <Grid container item className={classes.root} spacing={6}>
        <Grid container className={classes.main}>
          <Grid item className={classes.title}>
            {props.searchIsOpen ? (
              <ClickAwayListener onClickAway={props.onSearchClose}>
                <Grid item className={classes.searchItem}>
                  <InstrumentSearch
                    placeholder="جستجوی نماد"
                    inputClassName={classes.searchInput}
                    onChange={props.onSearchValueChange}
                    autoFocus={true}
                  ></InstrumentSearch>
                  {props.searchResults?.length > 0 && (
                    <div className={classes.result}>
                      {props.searchResults.map((ins, i) => (
                        <SearchResult
                          key={i}
                          persianCode={ins.PersianCode}
                          title={ins.Title}
                          onClick={() => {
                            props.onInstrumentChange(ins.Isin);
                          }}
                        ></SearchResult>
                      ))}
                    </div>
                  )}
                </Grid>
              </ClickAwayListener>
            ) : (
              <PriceInfo />
            )}
          </Grid>
          <Grid item>
            <Grid container className={classes.alignCenter}>
              {props.instrument && (
                <>
                  <Typography
                    variant="subtitle2"
                    className={classes.companyTitle}
                  >
                    {props.instrument.Title}
                  </Typography>
                  <Tooltip arrow placement="right" title="نوع بازار:">
                    <Typography
                      variant="subtitle2"
                      className={classes.marketName}
                    >
                      ({props.instrument.ExchangeTitle})
                    </Typography>
                  </Tooltip>
                </>
              )}
              <Grid item data-tour="instrumentSearch">
                <Link
                  tooltipPlacement="bottom"
                  title="جستجوی سریع"
                  onClick={props.onSearchOpen}
                  className={classes.contentBtn}
                >
                  <SearchIcon className={classes.icon}></SearchIcon>
                </Link>
              </Grid>
              <Grid item data-tour="instrumentFavorites">
                <Favorites
                  isin={props.instrument?.Isin}
                  className={classes.contentBtn}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.info}>
          <Grid item className={classes.finalPrice}>
            <ClosingPriceInfo instrument={props.instrument}></ClosingPriceInfo>
          </Grid>
          <Grid item sm={9} className={classes.infoTable}>
            <TradeInfo instrument={props.instrument}></TradeInfo>
          </Grid>
          <Grid item className={classes.btnBuySell} data-tour="buySellModal">
            <Grid container>
              <Grid item sm={12} xs={6}>
                <Link
                  ref={ref.buyRef}
                  tooltipPlacement="left"
                  title="سفارش خرید"
                  onClick={props.onTradeModalBuyOpen}
                  tooltipColor={theme.palette.color.blue}
                  className={classes.box}
                >
                  <BuyIcon className={classes.buyBtn}></BuyIcon>
                </Link>
              </Grid>
              <Grid item sm={12} xs={6}>
                <Link
                  ref={ref.sellRef}
                  tooltipPlacement="left"
                  title="سفارش فروش"
                  onClick={props.onTradeModalSellOpen}
                  tooltipColor={theme.palette.color.red}
                  className={classes.box}
                >
                  <SellIcon className={classes.sellBtn}></SellIcon>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default DefaultInstrument;
