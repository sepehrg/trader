import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const lavenderTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22A7F2",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#F4F5FC",
      box: "#EDEFFA",
      paper: "#E6E9F8",
    },
    text: {
      primary: "#1A2380",
      secondary: "#5A6AC1",
    },
    icon: {
      primary: "#7986CA",
    },
    border: {
      primary: "#DFE2F5",
      secondary: "#e5e8f8",
      bar: "#D1D6F1",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#ff8d00",
    },
  },
  ...shared,
});
