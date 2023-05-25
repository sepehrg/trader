import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function useDevice() {
  return {
    isMobile: !useMediaQuery((theme) => theme.breakpoints.up("md"), {
      noSsr: true,
    }),
    isNotMobile: useMediaQuery((theme) => theme.breakpoints.up("md"), {
      noSsr: true,
    }),
    isBigScreen: useMediaQuery((theme) => theme.breakpoints.up("lg"), {
      noSsr: true,
    }),
  };
}
