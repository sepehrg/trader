import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { comma } from "../../../../shared/utility";
import ArrowTop from "../../../UI/icons/arrowTop";
import ArrowBottom from "../../../UI/icons/arrowBottom";
import ArrowToTop from "../../../UI/icons/arrowToTop";
import ArrowToBottom from "../../../UI/icons/arrowToBottom";
import PaperClip from "../../../UI/icons/paperClip";
import CutIcon from "../../../UI/icons/cut";
import clsx from "clsx";
import Link from "../../../UI/Link/Link";
import { connect } from "react-redux";
import useDevice from "../../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  arrow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  arrowMobile: {
    height: 48,
  },
  icon: {
    height: 20,
    width: 20,
    fill: "#FFF",
    // cursor: "default",
    verticalAlign: "middle",
    // "&:hover": {
    //   fill: theme.palette.primary.main,
    // },
  },
  paperClip: {
    height: 18,
    margin: "auto",
    width: 18,
    fill: theme.palette.text.secondary,
  },
  cut: {
    height: 18,
    margin: "auto",
    width: 18,
    fill: theme.palette.text.secondary,
  },
  adornment: {
    display: "flex",
    paddingLeft: 4,
    alignItems: "center",
  },
  btn: {
    textAlign: "center",
    // backgroundColor: `${theme.palette.icon.primary}77`,
    // borderRadius: 4,
    display: "flex",
    alignItems: "center",
    height: 28,
    width: 28,
  },

  btnMobile: {
    // backgroundColor: `${theme.palette.icon.primary}77`,
    // borderRadius: 8,
    height: 48,
    width: 48,
  },
  adornmentMobile: {
    alignItems: "flex-end",
    padding: 0,
  },
  paperClipMobile: {
    width: 22,
    height: 22,
    color: "#FFF",
  },
  cutMobile: {
    width: 22,
    height: 22,
    color: "#FFF",
  },
  buttonActive: {
    fill: theme.palette.primary.main,
  },
  adornmentMinMax: {
    backgroundColor: theme.palette.border.primary,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    marginRight: 3,
    justifyContent: "center",
    color: theme.palette.text.secondary,
    fontSize: 11,
    minWidth: 44,
    height: 18,
  },
  adornmentMinMaxMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    color: "#FFF",
    borderRadius: 6,
    fontSize: 13,
    height: 21,
    marginRight: 7,
  },
}));

const TradeAdornment = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const device = useDevice();
  const [dividedOrder, setDividedOrder] = useState(false);
  const [lockToLast, setLockToLast] = useState(null);

  const divideOrderHandler = () => {
    setDividedOrder(!dividedOrder);
    props.onDivideOrder(!dividedOrder);
  };

  const lockToLastHandler = () => {
    setLockToLast(!lockToLast);
    props.onLockToLast(!lockToLast);
  };

  useEffect(() => {
    if (
      props.bidAsk &&
      props.bidAsk.InstrumentId === props.instrumentId &&
      lockToLast
    ) {
      const row = props.bidAsk.BidAskAggregates.filter(
        (item) => item.RowPlace === 0
      );
      if (row[0]) {
        props.onValueChange(
          props.orderSide === 1 ? row[0].BidPrice : row[0].AskPrice
        );
      }
    }
  }, [props.bidAsk, lockToLast, props.instrumentId]);

  // console.log("adornment", props);

  return (
    <div
      className={clsx(
        classes.adornment,
        device.isMobile && classes.adornmentMobile
      )}
    >
      {props.type === "price" && !props.ipo && (
        <Link
          tooltipPlacement="top"
          title={device.isNotMobile && "لینک به قیمت آخرین معامله"}
          onClick={lockToLastHandler}
          className={clsx(classes.btn, device.isMobile && classes.btnMobile)}
        >
          <PaperClip
            className={clsx(
              classes.icon,
              classes.paperClip,
              lockToLast && classes.buttonActive,
              device.isMobile && classes.paperClipMobile
            )}
          ></PaperClip>
        </Link>
      )}
      {props.type === "quantity" && !props.ipo && (
        <Link
          tooltipPlacement="top"
          title={device.isNotMobile && "تقسیم سفارش"}
          onClick={divideOrderHandler}
          className={clsx(classes.btn, device.isMobile && classes.btnMobile)}
        >
          <CutIcon
            className={clsx(
              classes.icon,
              classes.cut,
              dividedOrder && classes.buttonActive,
              device.isMobile && classes.cutMobile
            )}
          ></CutIcon>
        </Link>
      )}
      {/* {!props.hideMinMax && (
        <Grid item className={classes.arrow}>
          <Link
            tooltipPlacement="top"
            title="افزایش یک واحد"
            onClick={props.onIncreaseOne}
          >
            <ArrowTop className={classes.icon}></ArrowTop>
          </Link>
          <Link
            tooltipPlacement="bottom"
            title="کاهش یک واحد"
            onClick={props.onDecreaseOne}
          >
            <ArrowBottom className={classes.icon}></ArrowBottom>
          </Link>
        </Grid>
      )} */}
      <Grid
        item
        className={clsx(classes.arrow, device.isMobile && classes.arrowMobile)}
      >
        <Link
          // tooltipPlacement="top"
          // title={comma(props.max)}
          onClick={props.onSetMax}
          className={clsx(
            classes.adornmentMinMax,
            device.isMobile && classes.adornmentMinMaxMobile
          )}
        >
          {/* <ArrowToTop className={classes.icon}></ArrowToTop> */}
          {comma(props.max)}
        </Link>
        <Link
          // tooltipPlacement="bottom"
          // title={comma(props.min)}
          onClick={props.onSetMin}
          className={clsx(
            classes.adornmentMinMax,
            device.isMobile && classes.adornmentMinMaxMobile
          )}
        >
          {/* <ArrowToBottom className={classes.icon}></ArrowToBottom> */}
          {comma(props.min)}
        </Link>
      </Grid>
    </div>
  );
});

const mapStateToProps = (state, ownProps) => {
  return {
    bidAsk:
      ownProps.type === "price" && ownProps.lockToLast
        ? state.app.bidAsk
        : null,
  };
};

export default React.memo(connect(mapStateToProps)(TradeAdornment));
