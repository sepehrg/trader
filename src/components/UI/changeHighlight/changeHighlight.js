import React from "react";
import { default as ReactChangeHighlight } from "react-change-highlight";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  // "@keyframes pulse": {
  //   "0%": {
  //     textShadow:
  //       "1px 1px 1px #00000000, 0 0 2px #00000000, 0 0 5px #ffffff00, 0 0 8px #ffffff00, 0 0 10px #ffffff00",
  //   },
  //   "20%": {
  //     textShadow:
  //       "1px 1px 1px #00000099, 0 0 2px #00000099, 0 0 5px #ffffff99, 0 0 8px #ffffff99, 0 0 10px #ffffff99",
  //   },
  //   "70%": {
  //     textShadow:
  //       "1px 1px 1px #00000000, 0 0 2px #00000000, 0 0 5px #ffffff00, 0 0 8px #ffffff00, 0 0 10px #ffffff00",
  //   },
  //   "100%": {
  //     textShadow:
  //       "1px 1px 1px #00000000, 0 0 2px #00000000, 0 0 5px #ffffff00, 0 0 8px #ffffff00, 0 0 10px #ffffff00",
  //   },
  // },
  highlight: {
    // textShadow: `1px 1px 1px ${theme.palette.background.default}, 0 0 2px ${theme.palette.background.default}, 0 0 5px ${theme.palette.text.primary}, 0 0 8px ${theme.palette.text.primary}, 0 0 10px ${theme.palette.text.primary}`,

    textShadow:
      theme.palette.type === "dark"
        ? // ? "1px 1px 1px #000, 0 0 2px #000, 0 0 5px #fff, 0 0 8px #fff, 0 0 9px #fff"
          "1px 1px 1px #000, 0 0 1px #000, 0 0 3px #fff, 0 0 2px #fff, 0 0 4px #fff"
        : "-1px -1px 1px #ffd50033, 1px -1px 1px #ffd50033, -1px 1px 1px #ffd50033, 1px 1px 1px #ffd50033",
    // transition: "1s cubic-bezier(0.4, 0, 1, 1)",
    // animation: `$pulse 2s`,
  },
}));

const ChangeHighlight = (props) => {
  const classes = useStyles();

  return (
    <ReactChangeHighlight
      highlightClassName={classes.highlight}
      showAfter={0}
      hideAfter={1000}
      containerClassName={props.containerHighlight}
    >
      {props.children}
    </ReactChangeHighlight>
  );
};

export default ChangeHighlight;
