import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const whiteTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#047df7",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#FFFfff",
      paper: "#EEEeee",
      box: "#F6F6F6",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    icon: {
      primary: "#666666",
    },
    border: {
      primary: "#ebebeb",
      secondary: "#f1f1f1",
      bar: "#e6e6e6",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#ffaa00",
    },
  },
  ...shared,
});
