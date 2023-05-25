import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NotebookIcon from "../../UI/icons/notebook";
import Console from "../console/console";
import { useForm, Controller } from "react-hook-form";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import DropDownList from "../../UI/DropDownList/DropDownList";
import AlgorithmService from "../../../services/algorithmService";
import Editor from "../../UI/codeEditor/codeEditor";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import Splitter from "../../UI/splitter/splitter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
    padding: 10,
    flexFlow: "nowrap",
    justifyContent: "space-between",
    overflow: "hidden auto",
  },
  box: {
    height: "100%",
    padding: "0 8px 8px 8px",
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    flexWrap: "nowrap",
    minHeight: 210,
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
    flexDirection: "column",
  },
  codeItem: {
    direction: "ltr",
    // minHeight: "70%",
    maxWidth: "calc(100vw - 142px)",
    flex: 1,
  },
  displayNone: {
    display: "none",
  },
  description: {
    height: "100%",
    overflow: "hidden",
  },
  action: {
    borderTop: `1px solid ${theme.palette.border.primary}`,
    padding: "10px 0",
    marginTop: 10,
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

const defaultCode = `namespace ProLab.Bms.Alg.Tse.Runner
{
    public class SampleCode : TseAlgorithm
    {
        public void Main(Data data)
        {
            Init(data);
            Console("Test  Console" );
            CloseAlgo();
        }           
    }
}`;

const AddAlgorithm = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const { register, handleSubmit, errors, control, setValue } = useForm({
    defaultValues: { Script: defaultCode },
  });
  const [algorithmLanguages, setAlgorithmLanguages] = useState();
  const [addCode, setAddCode] = useState(false);
  const [algorithmLanguageTitle, setAlgorithmLanguageTitle] = useState();

  useEffect(() => {
    getAlgorithmTypes();
  }, []);

  const getAlgorithmTypes = () => {
    AlgorithmService.getAlgorithmLanguages((status, data) => {
      if (data?.Result.length > 0) {
        setAlgorithmLanguages(data.Result);
        setValue("AlgorithmLanguageId", data.Result[0].Id);
        setAlgorithmLanguageTitle(data.Result[0].EnTitle.toLowerCase());
      }
    });
  };

  const submitHandler = (data, execute) => {
    AlgorithmService.addAlgorithm({ ...data, execute }, (status, data) => {
      if (status === 200) {
        if (data.Success) {
          props.notifySuccess("افزودن الگوریتم با موفقیت انجام شد.");
          history.push("/algorithm/edit/" + data.Result);
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
                    افزودن {!addCode ? "الگوریتم" : "کد"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.editor}>
              <form className={classes.form}>
                <Grid
                  container
                  className={clsx(
                    classes.fields,
                    addCode && classes.displayNone
                  )}
                >
                  <Grid item>
                    <Grid container spacing={10}>
                      <Grid item xs={4}>
                        <Grid container className={classes.field} spacing={10}>
                          <Grid item>
                            <Input
                              ref={register({ required: true })}
                              name="Title"
                              label="عنوان الگوریتم"
                              error={!!errors.Title}
                              helperText="عنوان الگوریتم الزامی است"
                            ></Input>
                          </Grid>
                          <Grid item>
                            <Controller
                              control={control}
                              rules={{ required: true }}
                              name="AlgorithmLanguageId"
                              render={(props) => (
                                <DropDownList
                                  label="زبان برنامه نویسی"
                                  textField="Title"
                                  valueField="Id"
                                  options={algorithmLanguages}
                                  value={props.value || ""}
                                  onChange={(e) =>
                                    props.onChange(e.target.value)
                                  }
                                  inputLabelOutlined={classes.inputLabel}
                                  error={!!errors.AlgorithmLanguageId}
                                  helperText="زبان برنامه نویسی الزامی است"
                                />
                              )}
                            ></Controller>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={8}>
                        <Input
                          ref={register}
                          name="Description"
                          label="توضیحات"
                          multiline
                          inputClassName={classes.description}
                        ></Input>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.action}>
                    <Button
                      onClick={() => setAddCode(true)}
                      variant="outlined"
                      color="primary"
                      className={classes.actionBtn}
                    >
                      ایجاد
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  className={clsx(
                    classes.fields,
                    !addCode && classes.displayNone
                  )}
                >
                  <Grid item className={classes.codeItem}>
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      name="Script"
                      render={() => (
                        <Editor
                          // height="60vh"
                          value={defaultCode}
                          defaultLanguage={algorithmLanguageTitle}
                          theme={`vs-${theme.palette.type}`}
                          onChange={(e) => setValue("Script", e)}
                        />
                      )}
                    />
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

export default connect(null, mapDispatchToProps)(AddAlgorithm);
