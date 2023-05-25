import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const lightGrayTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0B90FF",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#fafafa",
      paper: "#FBFCFD",
      box: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#818794",
    },
    icon: {
      primary: "#565a63",
    },
    border: {
      primary: "#e5e6e6",
      secondary: "#F0F0F3",
      bar: "#E8E9EC",
    },
    color: {
      red: "#FE3957",
      green: "#0CAF82",
      blue: "#0B90FF",
      yellow: "#F9801C",
    },
  },
  ...shared,
});
