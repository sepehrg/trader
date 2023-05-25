import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const useStyles = makeStyles((theme) => ({
  baseClass: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  buttonTheme: {
    backgroundColor: `${theme.palette.background.box} !important`,
    borderBottom: `1px solid ${theme.palette.border.primary} !important`,
  },
}));

const VirtualKeyboard = (props) => {
  const classes = useStyles();
  const [layout, setLayout] = useState("default");

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };
  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const buttons =
    "` \" 1 2 3 4 5 6 7 8 9 0 - = {bksp} {tab} q w e r t y u i o p [ ] \\ {lock} a s d f g h j k l ; ' {enter} {shift} z x c v b n m , . / {shift} .com @ {space} ~ ! @ # $ % ^ & * ( ) _ + {bksp} {tab} Q W E R T Y U I O P { } | {lock} A S D F G H J K L : {enter} {shift} Z X C V B N M < > ? {shift} .com @ {space}";

  return (
    <Keyboard
      // keyboardRef={props.keyboardRef}
      layoutName={layout}
      onChange={props.onChange}
      onKeyPress={onKeyPress}
      baseClass={classes.baseClass}
      buttonTheme={[
        {
          class: classes.buttonTheme,
          buttons: buttons,
        },
      ]}
      layout={props.layout}
    />
  );
};

export default VirtualKeyboard;
