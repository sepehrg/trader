import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const lightGrayTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#eaeaea",
      box: "#F0f0f0",
      paper: "#f7f7f7",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    icon: {
      primary: "#666666",
    },
    border: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
      bar: "#ffffff",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#e49300",
    },
  },
  ...shared,
});
