import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const purpleTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#c27aff",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#2D2E5C",
      box: "#323362",
      paper: "#363868",
    },
    text: {
      primary: "#edebf7",
      secondary: "#cfcce2",
    },
    icon: {
      primary: "#cfcce2",
    },
    border: {
      primary: "#3F4374",
      secondary: "#363767",
      bar: "#44487A",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#ffd500",
    },
  },
  ...shared,
});
