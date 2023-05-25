import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "../../components/UI/grid/grid";
import Link from "../../components/UI/Link/Link";
import AddIcon from "../../components/UI/icons/add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import GridLayout from "./gridLayout";
import widgets from "./widgets";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";
import DeleteIcon from "../../components/UI/icons/delete";
import clsx from "clsx";
import FadeTransition from "../../components/UI/transition/fade";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Dialog from "../../components/UI/dialog/dialog";
import templates from "../../enums/widgetTemplates";
import TemplateIcon from "../../components/UI/icons/template";
import Tour from "../../components/UI/tour/tour";
import steps from "../../enums/tourSteps";

const useStyles = makeStyles((theme) => ({
  setting: {
    padding: "5px 10px",
    backgroundColor: theme.palette.background.box,
    color: theme.palette.text.secondary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    position: "relative",
  },
  deleteBtnIcon: {
    height: 18,
    width: 18,
    marginLeft: 5,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  addBtnIcon: {
    height: 22,
    width: 22,
    marginLeft: 5,
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  addBtnIconActive: {
    fill: theme.palette.primary.main,
  },
  widgetsZone: {
    height: "calc(100% - 32px)",
    overflow: "auto",
  },

  widgetList: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: 10,
    width: 420,
    top: 36,
    "&:after": {
      content: "''",
      position: "absolute",
      top: -10,
      right: 8,
      borderBottom: `9px solid ${theme.palette.primary.main}`,
      borderRight: `9px solid transparent`,
      borderLeft: `9px solid transparent`,
    },
  },
  widgetBtn: {
    height: 80,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.border.secondary}`,
    color: theme.palette.text.primary,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}02`,
    },
  },
  widgetBtnIcon: {
    height: 26,
    width: 26,
    fill: theme.palette.border.primary,
  },
  emptyGridContainer: {
    padding: 20,
    height: "100%",
  },
  emptyGrid: {
    border: `2px dashed ${theme.palette.text.secondary}66`,
    width: "100%",
    height: "100%",
    borderRadius: 15,
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: 14,
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: `${theme.palette.background.box}99`,
    },
  },
  addWidgetLink: {
    width: "100%",
  },
  emptyGridAddBtnIcon: {
    width: 40,
    height: 40,
    fill: theme.palette.border.primary,
    marginBottom: 10,
  },
  confirm: {
    padding: 15,
  },

  acceptBtn: {
    color: theme.palette.color.blue,
    borderColor: theme.palette.color.blue,
  },
  cancelBtn: {
    color: theme.palette.color.red,
    borderColor: theme.palette.color.red,
  },
}));

let templateChanged = false;

const Personalize = (props) => {
  const classes = useStyles();
  const addWidgetRef = useRef(null);
  const templatesRef = useRef(null);

  const [settingOpen, setSettingOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [layouts, setLayouts] = useState(
    JSON.parse(localStorage.getItem("widgetLayouts")) || {}
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [template, setTemplate] = useState(null);

  const layoutChangeHandler = (layout, layouts) => {
    localStorage.setItem("widgetLayouts", JSON.stringify(layouts));
    setLayouts(layouts);
  };

  const closeSettingHandler = (event) => {
    if (addWidgetRef.current && addWidgetRef.current.contains(event.target)) {
      return;
    }
    setSettingOpen(false);
  };

  const closeTemplateHandler = (event) => {
    if (templatesRef.current && templatesRef.current.contains(event.target)) {
      return;
    }
    setTemplatesOpen(false);
  };

  useEffect(() => {
    props.setWidgetItems(props.widgetItems);
  }, [props.widgetItems]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1);
  }, []);

  const templateSelectHandler = (item) => {
    setTemplate(item);
  };

  useEffect(() => {
    if (template) {
      if (templateChanged) setConfirmOpen(true);
      else changeTemplate();
    }
  }, [template]);

  const changeTemplate = () => {
    props.setWidgetItems(template.widgets);
    localStorage.setItem("widgetLayouts", JSON.stringify(template.layouts));
    setLayouts(template.layouts);
    templateChanged = false;
    setConfirmOpen(false);
  };

  const addWidgetHandler = (widget) => {
    props.addWidgetItem(widget);
    templateChanged = true;
  };

  const closeConfirmHandler = () => setConfirmOpen(false);

  const dragWidgetHandler = () => (templateChanged = true);

  const clearModalHandler = () => {
    if (props.widgetItems.length) {
      setClearOpen(true);
      setTemplate();
    } else clearLayout();
  };

  const closeClearHandler = () => setClearOpen(false);

  const clearLayout = () => {
    props.setWidgetItems([]);
    closeClearHandler();
  };

  const confirmActions = [
    {
      title: "تایید",
      onClick: changeTemplate,
      className: classes.acceptBtn,
    },
    {
      title: "انصراف",
      onClick: closeConfirmHandler,
      className: classes.cancelBtn,
    },
  ];

  const clearActions = [
    {
      title: "تایید",
      onClick: clearLayout,
      className: classes.acceptBtn,
    },
    {
      title: "انصراف",
      onClick: closeClearHandler,
      className: classes.cancelBtn,
    },
  ];

  return (
    <>
      <Dialog
        open={confirmOpen}
        onClose={closeConfirmHandler}
        dialogActions={confirmActions}
      >
        <Grid container className={classes.confirm}>
          <Grid item>
            قالب جدید جایگزین قالب فعلی خواهد شد. آیا مطمئن هستید؟
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={clearOpen}
        onClose={closeClearHandler}
        dialogActions={clearActions}
      >
        <Grid container className={classes.confirm}>
          <Grid item>تمام ویجت‌ها حذف خواهد شد. آیا مطمئن هستید؟</Grid>
        </Grid>
      </Dialog>
      <Grid container className={classes.setting}>
        <Grid item>
          <Grid container spacing={8}>
            <ClickAwayListener onClickAway={closeSettingHandler}>
              <Grid
                item
                className={classes.addBtn}
                data-tour="personalizeAddBtn"
              >
                <Link
                  ref={addWidgetRef}
                  onClick={() => setSettingOpen(!settingOpen)}
                >
                  <AddIcon
                    className={clsx(
                      classes.addBtnIcon,
                      settingOpen && classes.addBtnIconActive
                    )}
                  />
                  افزودن ویجت
                </Link>
                {settingOpen && (
                  <Grid container className={classes.widgetList} spacing={7}>
                    {widgets.map((item, i) => (
                      <FadeTransition
                        timeout={400}
                        delay={i * 60}
                        key={item.title}
                      >
                        <Grid item xs={3}>
                          <Link onClick={() => addWidgetHandler(item.i)}>
                            <Grid
                              container
                              className={classes.widgetBtn}
                              spacing={4}
                            >
                              <Grid item>
                                <AddIcon className={classes.widgetBtnIcon} />
                              </Grid>
                              <Grid item>{item.title}</Grid>
                            </Grid>
                          </Link>
                        </Grid>
                      </FadeTransition>
                    ))}
                  </Grid>
                )}
              </Grid>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={closeTemplateHandler}>
              <Grid
                item
                className={classes.addBtn}
                data-tour="personalizeTemplates"
              >
                <Link
                  ref={templatesRef}
                  onClick={() => setTemplatesOpen(!templatesOpen)}
                >
                  <TemplateIcon
                    className={clsx(
                      classes.addBtnIcon,
                      templatesOpen && classes.addBtnIconActive
                    )}
                  />
                  قالب‌های آماده
                </Link>
                {templatesOpen && (
                  <Grid container className={classes.widgetList} spacing={7}>
                    {templates.map((item, i) => (
                      <FadeTransition
                        timeout={400}
                        delay={i * 60}
                        key={item.title}
                      >
                        <Grid item xs={3}>
                          <Link onClick={() => templateSelectHandler(item)}>
                            <Grid
                              container
                              className={classes.widgetBtn}
                              spacing={4}
                            >
                              <Grid item>
                                <TemplateIcon
                                  className={classes.widgetBtnIcon}
                                />
                              </Grid>
                              <Grid item>{item.title}</Grid>
                            </Grid>
                          </Link>
                        </Grid>
                      </FadeTransition>
                    ))}
                  </Grid>
                )}
              </Grid>
            </ClickAwayListener>
          </Grid>
        </Grid>
        <Grid item data-tour="personalizeClear">
          <Link onClick={() => clearModalHandler()}>
            <DeleteIcon className={classes.deleteBtnIcon} />
            حذف همه ویجت‌ها
          </Link>
        </Grid>
      </Grid>
      <div className={classes.widgetsZone} data-tour="personalizeLayout">
        {props.widgetItems.length !== 0 ? (
          <GridLayout
            items={props.widgetItems}
            onRemoveItem={props.removeWidgetItem}
            layouts={layouts}
            onLayoutChange={layoutChangeHandler}
            onDrag={dragWidgetHandler}
          />
        ) : (
          <Grid container className={classes.emptyGridContainer}>
            <Link
              ref={addWidgetRef}
              onClick={() => setSettingOpen(!settingOpen)}
              className={classes.addWidgetLink}
            >
              <Grid item className={classes.emptyGrid}>
                <AddIcon className={classes.emptyGridAddBtnIcon} />
                ویجت دلخواه خود را اضافه کنید
              </Grid>
            </Link>
          </Grid>
        )}
      </div>
      <Tour
        steps={steps.personalize}
        isOpen={props.isTourOpen}
        onRequestClose={() => props.setIsTourOpen(false)}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    widgetItems: state.app.widgetItems,
    isTourOpen: state.app.isTourOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addWidgetItem: (item) => dispatch(actions.addWidgetItem(item)),
    removeWidgetItem: (item) => dispatch(actions.removeWidgetItem(item)),
    setWidgetItems: (items) => dispatch(actions.setWidgetItems(items)),
    setIsTourOpen: (state) => dispatch(actions.setIsTourOpen(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personalize);
