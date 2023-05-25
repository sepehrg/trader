import React from "react";
import DatePicker from "../DatePicker/DatePicker";
import Grid from "@material-ui/core/Grid";
import useDevice from "../../../hooks/useDevice";

const DateFilter = (props) => {
  const device = useDevice();

  return (
    <Grid container spacing={6}>
      <Grid
        item
        sm={6}
        xs={device.isMobile && 6}
        className={props.inputClassName}
      >
        <DatePicker
          name="startDate"
          label="از تاریخ"
          onChange={(event) => props.onStartDateChange(event, "startDate")}
          value={props.startDate}
        ></DatePicker>
      </Grid>
      <Grid
        item
        sm={6}
        xs={device.isMobile && 6}
        className={props.inputClassName}
      >
        <DatePicker
          name="endDate"
          label="تا تاریخ"
          onChange={(event) => props.onEndDateChange(event, "endDate")}
          value={props.endDate}
        ></DatePicker>
      </Grid>
    </Grid>
  );
};

export default DateFilter;
