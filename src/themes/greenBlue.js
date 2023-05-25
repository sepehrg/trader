import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const greenBlueTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#022336",
      box: "#022B3D",
      paper: "#023343",
    },
    text: {
      primary: "#E5FFF9",
      secondary: "#3C9AA3",
    },
    icon: {
      primary: "#305F6E",
    },
    border: {
      primary: "#024450",
      secondary: "#023243",
      bar: "#024C57",
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
