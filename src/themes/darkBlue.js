import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const darkBlueTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00d5ff",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#0d1a26",
      box: "#122434",
      paper: "#172b3d",
    },
    text: {
      primary: "#d8d8d8",
      secondary: "#6e8193",
    },
    icon: {
      primary: "#6e8193",
    },
    border: {
      primary: "#21374b",
      secondary: "#182c3e",
      bar: "#21374b",
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
