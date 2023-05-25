import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const beigeTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#d1d4c9",
      box: "#dbded3",
      paper: "#e5e8dd",
    },
    text: {
      primary: "#323330",
      secondary: "#808477",
    },
    icon: {
      primary: "#808477",
    },
    border: {
      primary: "#f9fcf1",
      secondary: "#e2e5da",
      bar: "#eff2e7",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#d68000",
    },
  },
  ...shared,
});
