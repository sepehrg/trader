import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotebookIcon from "../../UI/icons/notebook";
import Console from "../console/console";
import { useForm, Controller } from "react-hook-form";
import Button from "../../UI/Button/Button";
import AlgorithmService from "../../../services/algorithmService";
import Editor from "../../UI/codeEditor/codeEditor";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Splitter from "../../UI/splitter/splitter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
    flexFlow: "nowrap",
    justifyContent: "space-between",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  boxContainer: {
    height: "100%",
    overflow: "hidden auto",
  },
  header: {
    padding: 10,
    display: "flex",
  },
  title: {
    fontSize: 16,
    marginRight: 5,
    paddingTop: 4,
    whiteSpace: "nowrap",
  },
  fields: {
    flexDirection: "column",
    height: "100%",
  },
  field: {
    width: 250,
    padding: 15,
  },
  codeItem: {
    direction: "ltr",
    // minHeight: "70%",
    maxWidth: "calc(100vw - 142px)",
    flex: 1,
  },
  action: {
    borderTop: `1px solid ${theme.palette.border.primary}`,
    padding: "10px 0",
    marginTop: 10,
    position: "sticky",
    bottom: 0,
    backgroundColor: theme.palette.background.box,
  },
  actionBtn: {
    minWidth: 100,
  },
  console: {
    flex: 1,
    minHeight: 100,
  },
  editor: {
    flex: 1,
  },
  form: {
    height: "100%",
  },
}));

const EditAlgorithm = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, control, setValue, reset } = useForm();
  const [algorithmLanguageTitle, setAlgorithmLanguageTitle] = useState();

  useEffect(() => {
    getAlgorithmById(props.match.params.id);
  }, []);

  const getAlgorithmById = (id) => {
    AlgorithmService.getAlgorithmById(id, (status, data) => {
      if (data?.Success) {
        reset(data.Result);
        setValue("Script", data.Result.Script);
        getAlgorithmType(data.Result.AlgorithmLanguageId);
      }
    });
  };

  const getAlgorithmType = (id) => {
    AlgorithmService.getAlgorithmLanguages((status, data) => {
      if (data?.Result.length > 0) {
        setAlgorithmLanguageTitle(
          data.Result.find((a) => a.Id === id).EnTitle.toLowerCase()
        );
      }
    });
  };

  const submitHandler = (data, execute) => {
    AlgorithmService.updateAlgorithm({ ...data, execute }, (status, data) => {
      if (status === 200) {
        if (data.Success) {
          props.notifySuccess("ویرایش با موفقیت انجام شد.");
        } else {
          props.notifyError(data.Message);
        }
      } else props.notifyError(status);
    });
  };

  return (
    <Grid container className={classes.root}>
      <Splitter
        split="horizontal"
        minSize={100}
        defaultSize={150}
        primary="second"
        pane1Style={{ overflow: "hidden", minHeight: 300 }}
      >
        <Grid item className={classes.boxContainer}>
          <Grid container className={classes.box}>
            <Grid item>
              <Grid container className={classes.main}>
                <Grid item className={classes.header}>
                  <NotebookIcon className={classes.icon}></NotebookIcon>
                  <Typography variant="h2" className={classes.title}>
                    ویرایش کد
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.editor}>
              <form className={classes.form}>
                <Grid container className={classes.fields}>
                  <Grid item className={classes.codeItem}>
                    {algorithmLanguageTitle && (
                      <Controller
                        control={control}
                        rules={{ required: true }}
                        name="Script"
                        render={(props) => (
                          <Editor
                            // height="60vh"
                            defaultLanguage={algorithmLanguageTitle}
                            theme={`vs-${theme.palette.type}`}
                            value={props.value}
                            onChange={(e) => setValue("Script", e)}
                          />
                        )}
                      />
                    )}
                    <input
                      type="hidden"
                      name="Id"
                      ref={register}
                      value={props.match.params.id}
                    ></input>
                  </Grid>
                  <Grid item className={classes.action}>
                    {/* <Button
                    onClick={handleSubmit((data) => submitHandler(data, false))}
                    variant="outlined"
                    className={classes.actionBtn}
                  >
                    ذخیره
                  </Button> */}
                    <Button
                      onClick={handleSubmit((data) =>
                        submitHandler(data, true)
                      )}
                      variant="outlined"
                      color="primary"
                      className={classes.actionBtn}
                    >
                      ذخیره و اجرا
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.console}>
          <Console />
        </Grid>
      </Splitter>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (message) => dispatch(actions.notifySuccess(message)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(EditAlgorithm);
