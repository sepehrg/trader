import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment-jalaali";
import stepLevel from "../../enums/step";

import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import Input from "../../components/UI/Input/Input";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DropDownList from "../../components/UI/DropDownList/DropDownList";
import Select from "@material-ui/core/Select";
import { number } from "prop-types";
import DatePicker from "../../components/UI/DatePicker/DatePicker";
import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
const useStyles = makeStyles((theme) => ({
    root: {
        width:"98%",
   
      },
  header: {
    width: "100%",
  },
  sejamSection: {
    textAlign: "center",
    backgroundColor: "#FFF7EB",
    padding: "30px 0",
    borderRadius: "15px",
    margin: "0 150px",
    border: " 1px solid #F9E1BC",
  },
  paySejam: {
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "20px",

    textDecoration: "none",
    color: "#fff",
    borderRadius: " 10px",
    backgroundColor: "#596739",
    padding: "8px 75px",
    transition: "0.3s",
    width: "40%",
    "&:hover $a": {
      backgroundColor: "#4a5433",
    },
  },
  h: {
    color: " #f92323",
  },
  aPaySejam: {
    marginTop: theme.spacing(20),
  },
  p:{
    marginTop: theme.spacing(8),  
  }
}));

const FinalRegister = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext);
  useEffect(() => {
    dispatch({
      type: "stepWizard",
      payload: stepLevel.finalRegister.id,
    });
  }, []);
//  console.log("state",state.stepWizard)
  return (
    <Grid container>
      <Grid item className={classes.header}>
        <Grid item xs={3}>
          <Typography variant="h6" component="h6">
          اتمام ثبت نام
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
        <Card className={classes.root}>
        <Typography variant="h6" component="h6">
        ثبت اطلاعات شما با موفقیت انجام شده است
          </Typography>
          </Card>
        </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        </Grid>
    </Grid>
  );
};

export default FinalRegister;
