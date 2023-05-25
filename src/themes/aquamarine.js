import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const aquamarineTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#B9D2D2",
      box: "#C3DCDC",
      paper: "#CDE6E6",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
    icon: {
      primary: "#666666",
    },
    border: {
      primary: "#e1fafa",
      secondary: "#cde6e6",
      bar: "#d7f0f0",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#dc8e00",
    },
  },
  ...shared,
});
