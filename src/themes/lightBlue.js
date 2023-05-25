import { createMuiTheme } from "@material-ui/core/styles";
import "../index.css";
import shared from "./shared";

export const lightBlueTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#00d5ff",
    },
    secondary: {
      main: "#F15977",
    },
    background: {
      default: "#F2F7FF",
      box: "#E9F1FF",
      paper: "#DFECFF",
    },
    text: {
      primary: "#143C77",
      secondary: "#7E9FD1",
    },
    icon: {
      primary: "#3D619C",
    },
    border: {
      primary: "#D6E6FF",
      secondary: "#dceaff",
      bar: "#C3DBFF",
    },
    color: {
      red: "#fc326a",
      green: "#30c296",
      blue: "#22A7F2",
      yellow: "#ecaf00",
    },
  },
  ...shared,
});
