import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const pinkTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#c27aff",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#F5F2F7",
      box: "#EDE8F1",
      paper: "#E6DDEB",
    },
    text: {
      primary: "#241B46",
      secondary: "#8270A0",
    },
    icon: {
      primary: "#B194C2",
    },
    border: {
      primary: "#DED3E5",
      secondary: "#e8e0ed",
      bar: "#CFBED9",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#B09061",
    },
  },
  ...shared,
});
