import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "../../../components/UI/grid/grid";
import Instrument from "../../../components/instrument/instrument";
import MarketDepth from "../../../components/marketDepth/marketDepth";
import TseAccountSearch from "../../../components/tseAccountSearch/tseAccountSearch";
import Footer from "../../../components/footer/footer";
import ObserverMessage from "../../../components/observerMessage/observerMessage";
import Trade from "../../../components/trade/trade";
import Splitter from "../../../components/UI/splitter/splitter";
import clsx from "clsx";
import useDevice from "../../../hooks/useDevice";
import { connect } from "react-redux";
import AccessKeys from "../../../enums/accessKeys";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
    height: "100%",
    position: "relative",
  },
  right: {
    overflow: "hidden auto",
    height: "100%",
    flex: 1,
  },
  components: {
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap",
    padding: theme.spacing(5),
  },
  footer: {
    height: "100%",
    width: "100%",
  },
  instrument: {
    width: "100%",
  },
  trades: {
    width: "100%",
    height: "calc(100% - 118px)",
    paddingBottom: 0,
  },

  left: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
    marginBottom: 0,
  },
  bodyRows: {
    flexDirection: "column",
    height: "100%",
    flexWrap: "nowrap",
  },
  rightLaptop: {
    paddingLeft: 25,
  },
  fullHeight: {
    height: "100%",
  },
  marketDepth: {
    // height: "calc(100% + 18px)",
    paddingBottom: "0px !important",
  },
  tseAccountSearch: {
    paddingBottom: "0px !important",
  },
  trade: {
    // height: "calc(100% - 187px)",
    paddingBottom: "0px !important",
  },
}));

const OnlineGroup = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const pageContainer = useRef();
  const topSectionContainer = useRef();

  const [accountNumber, setAccountNumber] = useState();
  const [height, setHeight] = useState(window.innerHeight - 591);

  useEffect(() => {
    setHeight(
      pageContainer.current?.offsetHeight -
        topSectionContainer.current?.offsetHeight -
        78
    );
  }, []);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        className={clsx(
          classes.right,
          !device.isBigScreen && classes.rightLaptop
        )}
      >
        <Grid container ref={pageContainer} className={classes.components}>
          <Splitter
            split="horizontal"
            minSize={35}
            defaultSize={height}
            primary="second"
          >
            <Grid item className={classes.fullHeight}>
              <Grid
                container
                spacing={6}
                className={classes.bodyRows}
                ref={topSectionContainer}
              >
                <Grid item className={classes.instrument}>
                  <Instrument></Instrument>
                </Grid>
                <Grid item className={classes.trades}>
                  <Grid
                    container
                    spacing={6}
                    // className={classes.fullHeight}
                  >
                    <Grid item md={6} className={classes.marketDepth}>
                      {props.permissions.includes(
                        AccessKeys.OnlineGroupMarketDepth
                      ) && <MarketDepth />}
                    </Grid>
                    <Grid item md={6} className={classes.tseAccountSearch}>
                      <Grid container className={classes.left} spacing={6}>
                        {props.permissions.includes(
                          AccessKeys.OnlineGroupCustomerList
                        ) && (
                          <Grid item>
                            <TseAccountSearch
                              onAccountNumberChange={setAccountNumber}
                            />
                          </Grid>
                        )}
                        <Grid item className={classes.trade}>
                          {props.permissions.includes(
                            AccessKeys.OnlineGroupRegisterOrder
                          ) && (
                            <Trade
                              onlineGroup={true}
                              accountNumber={accountNumber}
                            ></Trade>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.footer}>
              <Footer onlineGroup={true}></Footer>
            </Grid>
          </Splitter>
        </Grid>
      </Grid>
      <ObserverMessage />
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.account.permissions,
  };
};

export default connect(mapStateToProps)(OnlineGroup);
