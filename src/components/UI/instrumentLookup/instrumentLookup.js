import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Autocomplete from "../autocomplete/autocomplete";
import Grid from "@material-ui/core/Grid";
import CmdTseService from "../../../services/cmdTseService";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px 10px 5px 5px",
  },
  instrumentLabel: {
    transform: "translate(-14px, -6px) scale(0.75)",
  },
}));

const InstrumentLookup = (props) => {
  const classes = useStyles();
  // const theme = { ...useTheme(), direction: "rtl" };
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length > 1)
      CmdTseService.searchInstrument(inputValue, (status, data) => {
        if (status === 200) setOptions(data.Result);
      });
    else setOptions([]);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  const instrumentChangeHandler = (value) => {
    if (!props.widget) props.onInstrumentChange(value);
    props.setGlobalInstrument(value.Isin);
  };

  const instrumentInputChangeHandler = (value) => {
    setInputValue(value);
    if (!value && !props.widget) {
      props.onInstrumentChange(null);
    }
  };

  return (
    <Grid item className={clsx(props.widget && classes.root)}>
      <Autocomplete
        getOptionLabel="PersianCode"
        options={options}
        inputValue={inputValue}
        autoHighlight
        onChange={instrumentChangeHandler}
        onInputChange={instrumentInputChangeHandler}
        renderOption={(option) => (
          <React.Fragment>
            {option.PersianCode} - {option.Title}
          </React.Fragment>
        )}
        label={props.label}
        placeholder={props.placeholder}
        inputLabelClassName={classes.instrumentLabel}
      />
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalInstrument: (isin) => dispatch(actions.setInstrument(isin)),
  };
};

export default connect(null, mapDispatchToProps)(InstrumentLookup);
