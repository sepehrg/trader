import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { usePagination } from "@material-ui/lab/Pagination";
import ExpandMoreIcon from "../icons/expandMore";

const useStyles = makeStyles((theme) => ({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
  },
  ulVerticle: {
    flexDirection: "column",
    marginLeft: 10,
  },
  ulHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  counter: {
    width: 14,
    height: 14,
    margin: "5px auto",
    backgroundColor: "transparent",
    border: `1px solid ${theme.palette.text.primary}66`,
    borderRadius: 50,
    cursor: "pointer",
    transition: "0.1s",
    transitionDelay: "0.1s",
    "&:hover": {
      backgroundColor: `${theme.palette.text.primary}22`,
    },
  },
  counterHorizontal: {
    margin: 3,
    width: 10,
    height: 10,
  },
  previous: {
    width: 24,
    height: 24,
    margin: 5,
    cursor: "pointer",
    transform: "rotate(90deg)",
  },
  next: {
    width: 24,
    height: 24,
    margin: 5,
    cursor: "pointer",
    transform: "rotate(-90deg)",
  },
  btn: {
    border: "none",
    backgroundColor: "transparent",
  },
}));

const ScrollPager = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { items } = usePagination({
    ...props,
  });

  return (
    <nav className={props.paginationClassName}>
      <ul
        className={clsx(
          classes.ul,
          props.verticle && classes.ulVerticle,
          props.horizontal && classes.ulHorizontal
        )}
      >
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;
          if (type === "page") {
            children = (
              <div
                style={{
                  backgroundColor: selected
                    ? theme.palette.primary.main
                    : undefined,
                }}
                {...item}
                className={clsx(
                  classes.counter,
                  props.horizontal && classes.counterHorizontal
                )}
              ></div>
            );
          } else {
            if (props.leftRightBtn) {
              if (type === "next")
                children = (
                  <div {...item} className={classes.btn}>
                    <ExpandMoreIcon className={classes.next} />
                  </div>
                );
              else
                children = (
                  <div {...item} className={classes.btn}>
                    <ExpandMoreIcon {...item} className={classes.previous} />
                  </div>
                );
            }
          }

          return <li key={index}>{children}</li>;
        })}
      </ul>
    </nav>
  );
};

export default ScrollPager;
