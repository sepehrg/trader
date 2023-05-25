import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const maroonTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#2A0F21",
      box: "#2E1325",
      paper: "#321729",
    },
    text: {
      primary: "#FFF5FB",
      secondary: "#9e9398",
    },
    icon: {
      primary: "#7b616d",
    },
    border: {
      primary: "#3A1F31",
      secondary: "#33182a",
      bar: "#3E2335",
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
