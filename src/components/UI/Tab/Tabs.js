import React from "react";
import { default as MuiTabs } from "@material-ui/core/Tabs";
import { useTheme, ThemeProvider } from "@material-ui/core/styles";

const Tabs = (props) => {
  const theme = { ...useTheme(), direction: "rtl" };

  return (
    <ThemeProvider theme={theme}>
      <MuiTabs
        orientation={props.orientation}
        variant={props.variant}
        value={props.value}
        onChange={props.onChange}
        className={props.className || "primary"}
        indicatorColor={props.indicatorColor}
        classes={props.classes}
      >
        {props.children}
      </MuiTabs>
    </ThemeProvider>
  );
};

export default React.memo(Tabs);
