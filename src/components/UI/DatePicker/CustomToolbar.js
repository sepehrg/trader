import React, { useState } from "react";
import PickerToolbar from "@material-ui/pickers/_shared/PickerToolbar";
import ToolbarButton from "@material-ui/pickers/_shared/ToolbarButton";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const CustomToolbar = function (props) {
  const { date, isLandscape, openView, setOpenView, title } = props;

  const handleChangeViewClick = (view) => (e) => {
    setOpenView(view);
  };

  const classes = useStyles();

  return (
    <PickerToolbar
      className={classes.toolbar}
      title={title}
      isLandscape={isLandscape}
    >
      <ToolbarButton
        onClick={handleChangeViewClick("year")}
        variant="h6"
        label={date.format("jYYYY")}
        selected={openView === "year"}
      />
      <ToolbarButton
        onClick={handleChangeViewClick("date")}
        variant="h5"
        selected={openView === "date"}
        label={date.format("LL")}
      />
    </PickerToolbar>
  );
};

export default CustomToolbar;
