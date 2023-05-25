import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../UI/Input/Input";
import CloseIcon from "../UI/icons/close";
import Link from "../UI/Link/Link";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
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
  adornmentMobile: {
    width: 28,
    height: 28,
    marginLeft: 9,
    padding: 7,
    backgroundColor: `${theme.palette.border.primary}99`,
  },
}));

const InstrumentSearch = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const [input, setInput] = useState("");

  let timer;
  const keyUpHandler = (event) => {
    clearTimeout(timer);
    const res = event.target.value;
    timer = setTimeout(function () {
      props.onChange(res);
    }, 500);
  };

  const clearInput = () => {
    props.onChange("");
    setInput("");
  };

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <Input
      placeholder={props.placeholder}
      label={props.label}
      onKeyUp={keyUpHandler}
      inputClassName={props.inputClassName}
      endAdornment={
        <Link onClick={clearInput}>
          <CloseIcon
            className={clsx(
              classes.adornment,
              device.isMobile && classes.adornmentMobile
            )}
          ></CloseIcon>
        </Link>
      }
      value={input}
      onChange={inputChangeHandler}
      autoFocus={props.autoFocus}
    ></Input>
  );
};

export default InstrumentSearch;
