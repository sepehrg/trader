import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ArrowIcon from "../UI/icons/arrow";
import Link from "../UI/Link/Link";
import SearchResult from "./searchResult/searchResult";
import CmdTseService from "../../services/cmdTseService";
import * as actions from "../../store/actions/index";
import { useTheme, ThemeProvider } from "@material-ui/core/styles";
import InstrumentSearch from "../instrumentSearch/instrumentSearch";
import useDevice from "../../hooks/useDevice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  search: {
    flexFlow: "column nowrap",
    position: "absolute",
    top: 0,
    right: "-100%",
    height: "100%",
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    visibility: "visible",
    transition: "0.3s",
    padding: (props) => (props.isMobile ? 10 : 20),
    overflow: "hidden",
    maxWidth: "100%",
  },
  open: {
    right: 0,
  },
  top: {
    flexWrap: "nowrap",
    alignItems: "center",
  },
  searchItem: {
    flexGrow: 1,
  },
  searchInput: {
    backgroundColor: theme.palette.background.box,
  },
  backItem: {
    "&:hover $close": {
      fill: theme.palette.primary.main,
      transform: "translateX(-5px)",
    },
  },
  close: {
    height: 40,
    width: 20,
    transition: "0.3s",
    justifyContent: "flex-end",
  },
  resultItem: {
    height: (props) =>
      props.isMobile ? "calc(100% - 90px)" : "calc(100% - 40px)",
    overflowY: "auto",
  },
  result: {
    paddingTop: 10,
    flexDirection: "column",
    overflowY: "auto",
  },
}));

const Search = (props) => {
  const device = useDevice();
  const classes = useStyles({ isMobile: device.isMobile });
  const history = useHistory();

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  let previousInputValue;
  useEffect(() => {
    inputValueChangeHandler();
    return () => {
      previousInputValue = inputValue;
    };
  }, [inputValue]);

  const inputValueChangeHandler = () => {
    if (inputValue.length > 1) {
      CmdTseService.searchInstrument(inputValue, (status, data) => {
        if (previousInputValue !== inputValue) setOptions(data.Result);
      });
    } else setOptions([]);
  };

  const theme = { ...useTheme(), direction: "ltr" };

  const searchResultClickHandler = (ins) => {
    props.onInstrumentChange(ins.Isin);
    if (device.isMobile) {
      props.setSearchOpen(false);
      if (history.location.pathname !== "/tse") history.push("/tse");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={clsx(
          classes.search,
          props.searchOpen && classes.open,
          props.className
        )}
      >
        <Grid item>
          <Grid container spacing={6} className={classes.top}>
            <Grid item className={classes.searchItem}>
              <InstrumentSearch
                label={props.label}
                inputClassName={clsx(
                  device.isNotMobile
                    ? classes.searchInput
                    : classes.searchInputMobile
                )}
                onChange={setInputValue}
                autoFocus={true}
              ></InstrumentSearch>
            </Grid>
            <Grid item className={classes.backItem}>
              <Link
                component={<ArrowIcon className={classes.close} />}
                onClick={() => props.setSearchOpen(false)}
              ></Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.resultItem}>
          <Grid container className={classes.result}>
            {options?.map((ins, i) => (
              <SearchResult
                key={i}
                persianCode={ins.PersianCode}
                title={ins.Title}
                onClick={() => searchResultClickHandler(ins)}
              ></SearchResult>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInstrumentChange: (isin) => dispatch(actions.setInstrument(isin)),
  };
};

export default connect(null, mapDispatchToProps)(Search);
