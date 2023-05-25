import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const goldTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#FAF6F0",
      box: "#F7F0E7",
      paper: "#F5EADF",
    },
    text: {
      primary: "#3F1F08",
      secondary: "#A46427",
    },
    icon: {
      primary: "#4e4133",
    },
    border: {
      primary: "#F2E5D6",
      secondary: "#f4eadd",
      bar: "#EDD9C5",
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
