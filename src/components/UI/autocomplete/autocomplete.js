import React from "react";
import { useTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { default as MuiAutocomplete } from "@material-ui/lab/Autocomplete";
import Input from "../Input/Input";
import Link from "../../UI/Link/Link";
import CloseIcon from "../../UI/icons/close";

const useStyles = makeStyles((theme) => ({
  listbox: {
    fontSize: 11,
  },
  adornment: {
    width: 20,
    height: 20,
    padding: 4,
    borderRadius: 50,
    marginLeft: 7,
    cursor: "pointer",
    backgroundColor: theme.palette.border.primary,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
}));

const Autocomplete = (props) => {
  // const theme = { ...useTheme(), direction: "rtl" };
  const theme = { ...useTheme() };
  const classes = useStyles();

  const clearInput = () => {
    props.onInputChange("");
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiAutocomplete
        placeholder={props.placeholder}
        getOptionLabel={(option) => option[props.getOptionLabel]}
        filterOptions={(x) => x}
        options={props.options}
        autoComplete
        filterSelectedOptions
        freeSolo
        value={props.value}
        inputValue={props.inputValue}
        autoHighlight
        onChange={(event, value) => props.onChange(value)}
        onInputChange={(event, value) => props.onInputChange(value)}
        renderOption={props.renderOption}
        renderInput={(params) => {
          return (
            <Input
              {...params}
              label={props.label}
              placeholder={props.placeholder}
              fullWidth
              inputLabelClassName={props.inputLabelClassName}
              inputProps={{
                ...params.inputProps,
              }}
              endAdornment={
                <Link onClick={clearInput}>
                  <CloseIcon className={classes.adornment}></CloseIcon>
                </Link>
              }
            />
          );
        }}
        classes={{ listbox: classes.listbox }}
      />
    </ThemeProvider>
  );
};

export default Autocomplete;
