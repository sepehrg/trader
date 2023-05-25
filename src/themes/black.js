import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const blackTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#15181F",
      box: "#1F2229",
      paper: "#292c33",
    },
    text: {
      primary: "#ffffff",
      secondary: "#686a71",
    },
    icon: {
      primary: "#686a71",
    },
    border: {
      primary: "#33363d",
      secondary: "#23262a",
      bar: "#33363d",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#ffd500",
    },
    error: {
      main: "#fc326a",
    },
  },
  ...shared,
});
