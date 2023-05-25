// import { lightGrayTheme } from "./lightGray";
import { blackTheme } from "./black";
import { purpleTheme } from "./purple";
import { darkBlueTheme } from "./darkBlue";
import { whiteTheme } from "./white";
import { nightBlueTheme } from "./nightBlue";
import { NavyBlueTheme } from "./navyBlue";
import { maroonTheme } from "./maroon";
import { greenBlueTheme } from "./greenBlue";
import { darkGrayTheme } from "./darkGray";
import { lightBlueTheme } from "./lightBlue";
import { aquamarineTheme } from "./aquamarine";
import { goldTheme } from "./gold";
import { pinkTheme } from "./pink";
import { lavenderTheme } from "./lavender";
import { beigeTheme } from "./beige";
import { lightGrayTheme } from "./lightGray";

export function themeCreator(themeName, customTheme) {
  let themeObject = themeMap[themeName];
  if (customTheme) {
    themeObject = {
      ...themeObject,
      palette: {
        ...themeObject.palette,
        ...getCustomPrimaryMain(customTheme),
      },
      typography: {
        ...themeObject.typography,
        ...getCustomTypography(themeObject, customTheme),
      },
    };
  }
  return themeObject;
}

export const themes = [
  { name: "blackTheme", color: "#1F2229" },
  { name: "darkGrayTheme", color: "#363c45" },
  { name: "lightGrayTheme", color: "#F8F9FA" },
  { name: "whiteTheme", color: "#FFF" },
  // { name: "lightGrayTheme", color: "#EEF5F7" },
  { name: "NavyBlueTheme", color: "#2b364f" },
  { name: "darkBlueTheme", color: "#172b3d" },
  { name: "lightBlueTheme", color: "#D7E7FF" },
  { name: "aquamarineTheme", color: "#CDE6E6" },
  { name: "nightBlueTheme", color: "#07304B" },
  { name: "greenBlueTheme", color: "#023C4A" },
  { name: "goldTheme", color: "#E8D0B6" },
  { name: "pinkTheme", color: "#CFBED9" },
  { name: "purpleTheme", color: "#343665" },
  { name: "maroonTheme", color: "#37071C" },
  { name: "lavenderTheme", color: "#D1D6F1" },
  { name: "beigeTheme", color: "#e5e8dd" },
];

export const fonts = [
  { text: "ایران سنس (IRANSans)", value: "IRANSansWeb" },
  { text: "شبنم (Shabnam)", value: "Shabnam" },
  { text: "فونت پیشفرض (Arial)", value: "3" },
];

const themeMap = {
  lightGrayTheme,
  blackTheme,
  whiteTheme,
  purpleTheme,
  darkBlueTheme,
  nightBlueTheme,
  NavyBlueTheme,
  maroonTheme,
  greenBlueTheme,
  darkGrayTheme,
  lightBlueTheme,
  aquamarineTheme,
  goldTheme,
  pinkTheme,
  lavenderTheme,
  beigeTheme,
};

export default themeMap;

const getCustomTypography = (theme, customTheme) => {
  if (customTheme.font) {
    const fontName = customTheme.font + (customTheme.numbers || "");
    const fontFamily = { fontFamily: fontName };
    return {
      ...fontFamily,
      body1: { ...theme.typography.body1, ...fontFamily },
      body2: { ...theme.typography.body2, ...fontFamily },
      button: { ...theme.typography.button, ...fontFamily },
      caption: { ...theme.typography.caption, ...fontFamily },
      subtitle1: { ...theme.typography.subtitle1, ...fontFamily },
      subtitle2: { ...theme.typography.subtitle2, ...fontFamily },
      overline: { ...theme.typography.overline, ...fontFamily },
      h1: { ...theme.typography.h1, ...fontFamily },
      h2: { ...theme.typography.h2, ...fontFamily },
      h3: { ...theme.typography.h3, ...fontFamily },
      h4: { ...theme.typography.h4, ...fontFamily },
      h5: { ...theme.typography.h5, ...fontFamily },
      h6: { ...theme.typography.h6, ...fontFamily },
    };
  } else return {};
};

const getCustomPrimaryMain = (customTheme) => {
  if (customTheme.primaryMain)
    return { primary: { main: customTheme.primaryMain } };
  else return {};
};
