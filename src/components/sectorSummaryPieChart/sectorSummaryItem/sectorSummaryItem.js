import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../../shared/style";
import clsx from "clsx";
import Tooltip from "../../UI/Tooltip/Tooltip";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: (props) => ({
    width: `${props.sectorWidth}%`,
    backgroundColor: props.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
}));

const SectorSummaryItem = (props) => {
  const theme = useTheme();

  const percent = props.positive
    ? parseInt(
        Math.round(
          (props.mainValue / (props.moreThanTwo + props.betweenZeroAndTwo)) *
            100
        )
      )
    : props.negetive
    ? parseInt(
        Math.round(
          (props.mainValue /
            (props.betweenZeroAndMinesTwo + props.lessThanMinesTwo)) *
            100
        )
      )
    : "";

  const sectorWidth = parseInt(
    Math.round(
      (props.mainValue /
        (props.moreThanTwo +
          props.betweenZeroAndTwo +
          props.betweenZeroAndMinesTwo +
          props.lessThanMinesTwo)) *
        100
    )
  );

  const classes = useStyles({
    sectorWidth,
    ...props,
  });

  return (
    <>
      {sectorWidth > 5 ? (
        <Tooltip
          placement="top"
          title={props.mainValue}
          color={theme.palette.primary.main}
        >
          <div className={clsx(classes.root, classes.moreThanTwo)}>
            <span>{percent}%</span>
          </div>
        </Tooltip>
      ) : (
        <Tooltip
          placement="top"
          title={"(" + percent + "%) " + props.mainValue}
          color={theme.palette.border.bar}
        >
          <div className={clsx(classes.root, classes.moreThanTwo)}></div>
        </Tooltip>
      )}
    </>
  );
};

export default React.memo(SectorSummaryItem);
