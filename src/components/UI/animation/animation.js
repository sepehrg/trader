import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

export const useStyles = makeStyles((theme) => ({
  "@keyframes ani-slide": {
    "0%": {
      transform: "translatey(-40px)",
      // opacity: 0,
    },
    "70%": {
      transform: "translatey(-40px)",
      // opacity: 0,
    },
    "100%": {
      transform: "translatey(0px)",
      // opacity: 1,
    },
  },
  animation: {
    animation: "$ani-slide 2s",
  },
}));

const Animation = (props) => {
  const classes = useStyles();

  return (
    <Fade in={props.checked} {...(props.checked ? { timeout: 5000 } : {})}>
      <div>
        <Slide
          direction="down"
          in={props.checked}
          {...(props.checked ? { timeout: 2000 } : {})}
        >
          <div>{props.children}</div>
        </Slide>
      </div>
    </Fade>
  );
};

export default Animation;
