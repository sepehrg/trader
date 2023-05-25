import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const NavyBlueTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#22a7f2",
    },
    secondary: {
      main: "#22a7f2",
    },
    background: {
      default: "#17223b",
      box: "#212c45",
      paper: "#2b364f",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#6e8193",
    },
    icon: {
      primary: "#6e8193",
    },
    border: {
      primary: "#3f4a63",
      secondary: "#27334b",
      bar: "#354059",
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
