import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../services/appContext";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import rtl from "jss-rtl";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  StylesProvider,
  ThemeProvider,
  jssPreset,
  useTheme,
} from "@material-ui/styles";
import { create } from "jss";

import StepConnector from "@material-ui/core/StepConnector";

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
// const theme = createMuiTheme({
//   direction: "rtl",
// });
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
  },
  main: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  step1: {
    borderRadius: "30px",
    backgroundColor: theme.palette.background.box,
  },

  step: {
    color: theme.palette.background.paper,
    width: 30,
    height: 30,
    "& $completed": {
      color: theme.palette.primary.main,
    },
    "& $active": {
      color: theme.palette.primary.main,
      "& $text": {
        color: theme.palette.text.primary,
      },
    },
    "& $disabled": {
      color: theme.palette.text.secondary,
    },
    "& $text": {
      color: theme.palette.text.secondary,
      fontSize: 10,
    },
  },
  alternativeLabel: {},
  active: {
    "& $line": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  line: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  completed: {},
  disabled: {},
  labelContainer: {
    "& $alternativeLabel": {
      marginTop: 10,
      fontSize: 12,
    },
  },
  colorLabel: {
    color: theme.palette.icon.primary,
  },
  stepper: {
    backgroundColor: "transparent",
    minHeight: 100,
  },
}));

function getSteps() {
  return [
    "بررسی اطلاعات",
    "اطلاعات فردی",
    " اطلاعات تماس",
    "اطلاعات شغلی",
    "اطلاعات بانکی",
    "اطلاعات مالی",
    "سجام",
    "بررسی نهایی",
    "ثبت در سجام",
    // 'تصاویر مدارک',
    // ' تایید صلاحیت'
  ];
}
const StepWizard = () => {
  const classes = useStyles();
  const [state] = useContext(AppContext);
  const theme = { ...useTheme(), direction: "rtl" };
  // const [activeStep, setActiveStep] = React.useState(state.stepWizard);
  const steps = getSteps();
  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.main}>
        {/* <StylesProvider jss={jss}> */}
        <ThemeProvider theme={theme}>
          <Stepper
            activeStep={state.stepWizard}
            alternativeLabel
            className={classes.stepper}
            // className={classes.step1}
            // classes={{ line: classes.line }}
          >
            {steps.map((label) => (
              <Step
                key={label}
                className={classes.stepKey}
                classes={{
                  root: classes.step,
                  completed: classes.completed,
                  active: classes.active,
                }}
                StepConnector={{ classes: { line: classes.line } }}
              >
                <StepLabel
                  classes={{
                    alternativeLabel: classes.alternativeLabel,
                    labelContainer: classes.labelContainer,
                  }}
                  StepIconProps={{
                    classes: {
                      root: classes.step,
                      completed: classes.completed,
                      active: classes.active,
                      disabled: classes.disabled,
                      text: classes.text,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </ThemeProvider>
        {/* </StylesProvider> */}
      </Grid>
    </Grid>
  );
};

export default StepWizard;
