import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MarketCloseIcon from "../../UI/icons/marketClose";
import MarketOpenIcon from "../../UI/icons/marketOpen";
import MarketPreOpeningIcon from "../../UI/icons/marketPreOpening";
import Tooltip from "../../UI/Tooltip/Tooltip";
import { connect } from "react-redux";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  headerIcon: {
    padding: `0 ${theme.spacing(5)}px`,
    // "&:hover $icon": {
    //   fill: theme.palette.primary.main,
    // },
  },
  icon: {
    height: 34,
    width: 34,
  },
  red: {
    fill: theme.palette.color.red,
    color: theme.palette.color.red,
  },
  green: {
    fill: theme.palette.color.green,
    color: theme.palette.color.green,
  },
  yellow: {
    fill: theme.palette.color.yellow,
    color: theme.palette.color.yellow,
  },
}));

const MarketIcon = ({ marketActivity }) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [marketState, setMarketState] = useState("");
  const [marketIcon, setMarketIcon] = useState(MarketCloseIcon);
  const [color, setColor] = useState();
  const [tooltipColor, setTooltipColor] = useState();

  const getIcon = (Component, color) => (
    <Component className={clsx(classes.icon, color)} />
  );

  useEffect(() => {
    if (marketActivity.length > 0)
      switch (marketActivity.find((m) => m.Flow === 1)?.MarketState) {
        case "Open":
          setMarketState("بازار باز");
          setMarketIcon(MarketOpenIcon);
          setColor(classes.green);
          setTooltipColor(theme.palette.color.green);
          break;
        case "PreOpening":
          setMarketState("پیش گشایش");
          setMarketIcon(MarketPreOpeningIcon);
          setColor(classes.yellow);
          setTooltipColor(theme.palette.color.yellow);
          break;
        default:
          setMarketState("بازار بسته");
          setMarketIcon(MarketCloseIcon);
          setColor(classes.red);
          setTooltipColor(theme.palette.color.red);
          break;
      }
  }, [marketActivity, theme]);

  return (
    <>
      {device.isNotMobile ? (
        <Tooltip
          placement="bottom"
          title={marketState}
          className={classes.headerIcon}
          color={tooltipColor}
        >
          <span>{getIcon(marketIcon, color)}</span>
        </Tooltip>
      ) : (
        <span className={color}> ● {marketState}</span>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    marketActivity: state.app.marketActivity,
  };
};

export default connect(mapStateToProps)(MarketIcon);
