import useDevice from "../hooks/useDevice";

export default (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "4px",
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      borderRadius: "4px",
      background: "transparent",
    },
    [theme.breakpoints.down("sm")]: {
      "*::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
  scrollbarY: {
    overflowY: "auto",
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.text.secondary,
      },
      scrollbarColor: `${theme.palette.border.primary} transparent`,
    },
    scrollbarWidth: "thin",
  },
});
