import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const nightBlueTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#000E17",
      box: "#011521",
      paper: "#031C2C",
    },
    text: {
      primary: "#E9F4FF",
      secondary: "#7D9EB2",
    },
    icon: {
      primary: "#4C7C99",
    },
    border: {
      primary: "#062941",
      secondary: "#021c2d",
      bar: "#07304B",
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
