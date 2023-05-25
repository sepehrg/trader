import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Modal from "../UI/modal/modal";
import { themes, fonts } from "../../themes/base";
import * as actions from "../../store/actions/index";
import TickIcon from "../UI/icons/tick";
import DropDownList from "../UI/DropDownList/DropDownList";
import IranFlag from "../UI/icons/iranFlag";
import EngFlag from "../UI/icons/engFlag";
import Radio from "../UI/radio/radio";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";
import ThemeMobile from "../UI/icons/themeMobile";
import Link from "../UI/Link/Link";
import themeMap from "../../themes/base";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    // backgroundColor: theme.palette.background.box,
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(5)}px`,
  },
  main: {
    display: "flex",
  },
  fontSettingContainer: {
    flexDirection: "column",
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    marginBottom: theme.spacing(4),
    display: "flex",
    textAlign: "right",
    width: "100%",
    "&:after": {
      content: '""',
      height: "2px",
      backgroundColor: theme.palette.border.primary,
      flex: "1",
      margin: "auto 0",
      marginRight: theme.spacing(4),
    },
  },
  fontSettingItem: {
    alignItems: "center",
    flexWrap: "nowrap",
    padding: "10px 0",
  },
  fontSettingItemTitle: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    textAlign: "right",
    minWidth: 90,
  },
  circle: {
    width: 31,
    height: 21,
    marginLeft: `${theme.spacing(4)}px`,
    border: `2px solid ${theme.palette.border.primary}`,
    // backgroundColor: "#15181F",
    borderRadius: 50,
  },
  themeBtn: {
    padding: `${theme.spacing(3)}px ${theme.spacing(8)}px`,
    fontSize: 13,
    margin: theme.spacing(2),
    cursor: "pointer",
    alignItems: "center",
    transition: "0.3s",
    borderRadius: 7,
    "&:hover": {
      backgroundColor: theme.palette.background.paper,
    },
  },
  themeColor: {
    width: "23%",
    height: 35,
    margin: 3,
    borderRadius: 12,
    cursor: "pointer",
    transition: "0.4s",
    boxShadow: "inset -16px 0px 0px 0px #0003, inset -32px 0px 0px 0px #0003",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      // border: `1px solid ${theme.palette.text.primary}`,
      boxShadow: "inset 0px 0px 0px 0px #00000033",
    },
  },
  primaryColor: {
    width: 35,
    height: 35,
    margin: 3,
    borderRadius: 12,
    cursor: "pointer",
    transition: "0.4s",
    boxShadow: "inset 0px 0px 0px 3px #00000033",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      // border: `1px solid ${theme.palette.text.primary}`,
      boxShadow: "inset 0px 0px 0px 0px #00000033",
    },
  },
  colorPalette: {
    // borderTop: `2px solid ${theme.palette.border.primary}`,
    padding: "0 5px",
    flex: "1",
    margin: "10px 0px",
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  selectedColor: {
    fill: "#fff",
    height: 14,
    width: 14,
    filter: "drop-shadow(3px 3px 4px #0006)",
  },
  fontSelector: {
    flexWrap: "nowrap",
  },
  dropDownList: {
    // width: 160,
  },
  checkbox: {
    padding: `0 0 0 4px`,
    // margin: "0 5px",
  },
  checkboxRoot: {
    color: theme.palette.text.secondary,
  },
  checkboxColorSecondary: {
    "&$checkboxChecked": {
      color: theme.palette.primary.main,
    },
  },
  checkboxChecked: {},
  checkboxIcon: {
    width: 18,
    height: 18,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
  },
  uncheckedIcon: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  checkedIcon: {
    backgroundColor: theme.palette.primary.main,
  },
  checkedTickIcon: {
    fill: theme.palette.text.primary,
    width: 14,
    height: 14,
    // verticalAlign: "middle",
    margin: "auto",
  },
  checkboxItem: {
    marginLeft: 5,
    minWidth: 90,
    textAlign: "right",
  },
  fontSetting: {
    marginBottom: 15,
    alignItems: "center",
  },
  radio: {
    "&$colorSecondary": {
      "&$checked": {
        color: theme.palette.primary.main,
      },
    },
  },
  checked: {},
  colorSecondary: {},
  formControlLabel: {
    fontSize: 11,
  },
  flag: {
    stroke: "none",
    borderRadius: 15,
    marginLeft: 5,
  },
  rootLabel: {
    display: "none",
  },
  formControl: {
    flex: "1",
    textAlign: "right",
  },
  fontDropDown: {
    textAlign: "right",
  },
  fontDropDownItem: {
    // flexGrow: 1,
    minWidth: 230,
  },
  fullWidth: {
    width: "100%",
  },

  rootMobile: {
    flexDirection: "column",
    flexWrap: "nowrap",
    overflow: "hidden scroll",
    height: "100%",
    padding: "20px 0",
  },
  titleMobile: {
    color: theme.palette.text.secondary,
    fontSize: 12,
    marginBottom: 8,
    padding: "0 15px",
  },
  fontSettingMobile: {
    backgroundColor: theme.palette.background.box,
    padding: "15px 15px",
    marginBottom: 25,
  },
  colorSettingMobile: {
    backgroundColor: theme.palette.background.box,
    padding: "15px 0",
    marginBottom: 25,
  },
  colorMobile: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "scroll",
    padding: "10px 15px",
  },
  primaryColorItemMobile: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 50,
    boxShadow: "inset 0px 0px 0px 9px #00000033",
    marginLeft: 10,
  },
  themeIconItem: {
    minWidth: 72,
    width: 72,
    height: 108,
    marginLeft: 15,
  },
  themeIcon: {
    width: "100%",
    height: "100%",
  },
  themeIconActive: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 9,
  },
  fontDropDownItemMobile: {
    width: "100%",
  },
  selectedPrimaryMobile: {
    border: `2px solid ${theme.palette.text.primary}`,
  },
  formControlLabelRoot: {
    marginLeft: 11,
    height: 38,
  },
}));

const ThemeModal = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const theme = useTheme();

  const [themeName, setThemeName] = useState(props.themeName);
  const [customTheme, setCustomTheme] = useState(props.customTheme);
  const [numbers, setNumbers] = useState("");
  const [font, setFont] = useState("");
  const [primaryMain, setPrimaryMain] = useState("");

  useEffect(() => {
    if (customTheme && customTheme.numbers) setNumbers(customTheme.numbers);
    if (customTheme && customTheme.font) setFont(customTheme.font);
    else {
      setFont(fonts[0].value);
      setCustomTheme({ ...customTheme, font: fonts[0].value });
    }
    if (customTheme && customTheme.primaryMain)
      setPrimaryMain(customTheme.primaryMain);
  }, []);

  const themeNameChangeHandler = (themeName) => {
    setThemeName(themeName);
    props.changeTheme(themeName, customTheme);
  };

  const mainColorChangeHandler = (color) => {
    setPrimaryMain(color);
    const newTheme = {
      ...customTheme,
      primaryMain: color,
    };
    props.changeTheme(themeName, newTheme);
    setCustomTheme(newTheme);
  };

  const fontChangeHandler = (font) => {
    setFont(font);
    const newTheme = {
      ...customTheme,
      font,
    };
    setTimeout(function () {
      props.changeTheme(themeName, newTheme);
      setCustomTheme(newTheme);
    }, 100);
  };

  const numbersChangeHandler = (numbers) => {
    setNumbers(numbers);
    const newTheme = {
      ...customTheme,
      numbers,
    };
    setTimeout(function () {
      props.changeTheme(themeName, newTheme);
      setCustomTheme(newTheme);
    }, 100);
  };

  const mainColors = [
    "#E91E63",
    "#FF6768",
    "#FFC107",
    "#F6EB7B",
    "#7adc38",
    "#4CAF50",
    "#3AC8A9",
    "#14FFEC",
    "#00d5ff",
    "#22A7F2",
    "#3282B8",
    "#065BD5",
    "#EA5AA9",
    "#B030B0",
    "#b2c831",
  ];

  const numOptions = [
    { label: "فارسی", value: "FaNum" },
    { label: "لاتین", value: "" },
  ];

  const mobileThemes = [
    "darkGrayTheme",
    "lightGrayTheme",
    "darkBlueTheme",
    "lightBlueTheme",
    "purpleTheme",
    "pinkTheme",
  ];

  const langOptions = [
    {
      label: (
        <div>
          <IranFlag className={classes.flag} />
          فارسی
        </div>
      ),
      value: 0,
    },
    {
      label: (
        <div>
          <EngFlag className={classes.flag} />
          انگلیسی
        </div>
      ),
      value: 1,
      disabled: true,
    },
  ];

  const content = (
    <Grid
      container
      className={clsx(device.isNotMobile ? classes.root : classes.rootMobile)}
    >
      <Grid item>
        <Grid container className={classes.fontSettingContainer}>
          <Grid
            item
            className={clsx(
              device.isNotMobile ? classes.title : classes.titleMobile
            )}
          >
            تنظیمات فونت
          </Grid>
          <Grid item>
            <Grid
              container
              className={clsx(
                classes.fontSetting,
                device.isMobile && classes.fontSettingMobile
              )}
            >
              <Grid item className={classes.fullWidth}>
                <Grid container className={classes.fontSettingItem}>
                  <Grid item className={classes.fontSettingItemTitle}>
                    انتخاب فونت
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      classes.fontDropDownItem,
                      device.isMobile && classes.fontDropDownItemMobile
                    )}
                  >
                    <DropDownList
                      name="font"
                      textField="text"
                      valueField="value"
                      options={fonts}
                      value={font}
                      className={classes.fontDropDown}
                      onChange={(e) => fontChangeHandler(e.target.value)}
                    ></DropDownList>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <Grid container className={classes.fontSettingItem}>
                  <Grid item className={classes.fontSettingItemTitle}>
                    نمایش اعداد
                  </Grid>
                  <Grid item className={classes.fullWidth}>
                    <Radio
                      name="numbers"
                      options={numOptions}
                      value={numbers}
                      onChange={(e) => numbersChangeHandler(e.target.value)}
                      row
                      formControlLabelRootClassName={clsx(
                        device.isMobile && classes.formControlLabelRoot
                      )}
                    ></Radio>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {device.isNotMobile && (
        <Grid item className={classes.colorPalette}>
          <Grid container>
            <Grid item className={classes.title}>
              انتخاب زبان
            </Grid>
            <Grid item>
              <Radio
                options={langOptions}
                value={0}
                onChange={() => {}}
                row
              ></Radio>
            </Grid>
          </Grid>
        </Grid>
      )}
      {device.isNotMobile && (
        <Grid item>
          <Grid container className={classes.main}>
            <Grid item className={classes.colorPalette} style={{ flex: "2" }}>
              <Grid container>
                <Grid item className={classes.title}>
                  رنگ قالب
                </Grid>
              </Grid>
              <Grid container>
                {themes.map((theme) => {
                  return (
                    <Grid
                      item
                      key={theme.name}
                      onClick={() => themeNameChangeHandler(theme.name)}
                      className={classes.themeColor}
                      style={{ backgroundColor: `${theme.color}` }}
                    >
                      {themeName === theme.name && (
                        <TickIcon className={classes.selectedColor} />
                      )}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item className={classes.colorPalette}>
              <Grid container>
                <Grid item>
                  <Grid container>
                    <Grid item className={classes.title}>
                      رنگ اصلی
                    </Grid>
                  </Grid>
                  <Grid container>
                    {mainColors.map((item) => (
                      <Grid
                        item
                        key={item}
                        className={classes.primaryColor}
                        style={{ backgroundColor: item }}
                        onClick={() => mainColorChangeHandler(item)}
                      >
                        {primaryMain === item && (
                          <TickIcon className={classes.selectedColor} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {device.isMobile && (
        <Grid item>
          <Grid container className={classes.fontSettingContainer}>
            <Grid item className={classes.titleMobile}>
              تنظیمات رنگ
            </Grid>
            <Grid item className={classes.fullWidth}>
              <Grid
                container
                className={clsx(
                  classes.fontSetting,
                  classes.colorSettingMobile
                )}
              >
                <Grid
                  item
                  className={clsx(classes.fullWidth, classes.colorMobile)}
                >
                  {mobileThemes.map((theme) => {
                    return (
                      <Link
                        onClick={() => themeNameChangeHandler(theme)}
                        key={theme}
                        className={classes.themeIconItem}
                      >
                        <ThemeMobile
                          className={clsx(
                            classes.themeIcon,
                            themeName === theme && classes.themeIconActive
                          )}
                          theme={themeMap[theme]}
                        />
                      </Link>
                    );
                  })}
                </Grid>
                <Grid item className={classes.fullWidth}>
                  <Grid container className={classes.colorMobile}>
                    {mainColors.map((item) => (
                      <Grid
                        item
                        key={item}
                        className={clsx(
                          classes.primaryColorItemMobile,
                          primaryMain === item && classes.selectedPrimaryMobile
                        )}
                        style={{ backgroundColor: item }}
                        onClick={() => mainColorChangeHandler(item)}
                      ></Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Modal
          open={props.open}
          onClose={props.onClose}
          width={540}
          hideMinimize
          title="تنظیمات محیط کاربری"
        >
          {content}
        </Modal>
      ) : (
        content
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    themeName: state.app.themeName,
    customTheme: state.app.customTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTheme: (themeName, customTheme) =>
      dispatch(actions.changeTheme(themeName, customTheme)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemeModal);
