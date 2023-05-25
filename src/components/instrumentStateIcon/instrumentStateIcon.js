import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Tooltip from "../UI/Tooltip/Tooltip";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ShieldBlockIcon from "../UI/icons/shieldBlock";
import { connect } from "react-redux";
import clsx from "clsx";
import MessageTypes from "../../enums/messageTypes";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: "19px",
  },
  yellowStroke: {
    fill: theme.palette.color.yellow,
  },
  redStroke: {
    fill: theme.palette.color.red,
  },
}));

const InstrumentStateIcon = (props) => {
  const classes = useStyles();
  const [stateId, setStateId] = useState(1);
  const theme = useTheme();

  useEffect(() => {
    setStateId(props.instrument.InstrumentStateId);
  }, [props.instrument, theme]);

  props.socket.on(
    MessageTypes.InstrumentStateChange,
    (instrumentStateChange) => {
      if (instrumentStateChange.InstrumentId === props.instrument.InstrumentId)
        setStateId(instrumentStateChange.InstrumentStateId);
    }
  );

  return (
    <>
      {stateId !== 1 && (
        <Tooltip
          placement="bottom"
          title={
            [2, 3, 4].includes(stateId)
              ? "مجاز / محفوظ"
              : [5, 6, 7, 8].includes(stateId)
              ? "ممنوع / متوقف"
              : ""
          }
        >
          <Grid item className={props.className}>
            <ShieldBlockIcon
              className={clsx(
                classes.icon,
                [2, 3, 4].includes(stateId)
                  ? classes.yellowStroke
                  : classes.redStroke
              )}
            ></ShieldBlockIcon>
          </Grid>
        </Tooltip>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    socket: state.app.socket,
  };
};

export default connect(mapStateToProps)(InstrumentStateIcon);