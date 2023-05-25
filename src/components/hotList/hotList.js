import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PlusIcon from "../UI/icons/plus";
import AcceptIcon from "../UI/icons/accept";
import Link from "../UI/Link/Link";
import Input from "../UI/Input/Input";
import HotListItem from "./hotListItem/hotListItem";
import CmdTseService from "../../services/cmdTseService";
import TseBofService from "../../services/tseBofService";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ArrowIcon from "../UI/icons/arrow";
import useDevice from "../../hooks/useDevice";
import Button from "../UI/Button/Button";
import TreeItem from "../UI/treeView/treeItem/treeItem";
import TreeView from "../UI/treeView/treeView";
import Drawer from "../UI/drawer/drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexFlow: "column nowrap",
    position: "absolute",
    top: 0,
    right: "-100%",
    height: "100%",
    zIndex: 50,
    backgroundColor: theme.palette.background.paper,
    visibility: "hidden",
    transition: "0.3s",
    padding: theme.spacing(10),
    overflow: "hidden",
    maxWidth: "100%",
  },
  main: {
    overflow: "hidden",
  },
  open: {
    right: 0,
    visibility: "visible",
  },
  top: {
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    marginTop: theme.spacing(0),
  },
  searchInput: {
    backgroundColor: theme.palette.background.box,
  },
  closeItem: {
    "&:hover $close": {
      fill: theme.palette.primary.main,
      transform: "translateX(-5px)",
    },
  },
  close: {
    width: 20,
    transition: "0.3s",
    justifyContent: "flex-end",
  },
  addItem: {
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    padding: "8px 0",
  },
  addItemBtn: {
    transition: "0.3s",
    "&:hover $add": {
      fill: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main,
    },
  },
  rotate: {
    transform: "rotate(45deg)",
    transition: "0.3s",
    "&:hover $add": {
      backgroundColor: theme.palette.color.red,
      fill: theme.palette.text.primary,
    },
  },
  add: {
    transition: "0.3s",
    backgroundColor: theme.palette.background.box,
    borderRadius: 50,
    padding: theme.spacing(4),
    width: 36,
    height: 36,
    verticalAlign: "middle",
  },
  addNew: {
    flexWrap: "nowrap",
    alignItems: "center",
    transition: "0.6s",
    overflow: "hidden",
    height: 55,
    visibility: "hidden",
    width: 0,
  },
  show: {
    width: "100%",
    visibility: "visible",
  },
  hotListItems: {
    flexDirection: "column",
    textAlign: "right",
    fontSize: 13,
  },
  acceptBtn: {
    marginLeft: theme.spacing(4),
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.color.green,
    },
  },
  treeChildLabel: {
    fontSize: 13,
  },
  treeChild: {
    padding: "8px 0",
  },
  addItemBox: {
    margin: "auto",
  },

  rootMobile: {
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
  },
  headerMobile: {
    fontSize: 14,
    color: theme.palette.background.default,
    backgroundColor: theme.palette.text.secondary,
    height: 52,
    position: "sticky",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    zIndex: 1,
  },
  mainMobile: {
    height: "calc(100% - 52px)",
  },

  addNewMobile: {},
  addNewBtnMobile: {
    border: "none",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 50,
    width: 60,
    minWidth: 60,
    height: 60,

    position: "absolute",
    bottom: 20,
    left: 20,

    "&:hover": {
      border: "none",
      backgroundColor: theme.palette.primary.main,
    },
  },
  plusIconMobile: {
    fill: "#FFF",
    strokeWidth: 1,
    stroke: "#FFF",
  },
  addNewWatchlistMobile: {
    padding: "10px 10px",
    flexDirection: "column",
  },
  actionBtnMobile: {
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    width: "100%",
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
      boxShadow: "none",
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.color.red,
      boxShadow: "none",
    },
  },

  rootWidget: {
    top: 65,
    zIndex: 0,
    maxWidth: 300,
    borderLeft: `2px solid ${theme.palette.border.primary}`,
    paddingBottom: 60,
  },
}));

const HotList = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const device = useDevice();

  const [newHotListOpen, setNewHotListOpen] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [hotListTypes, setHotListTypes] = useState([]);
  const [userWatchList, setUserWatchList] = useState([]);
  const [newHotListTitle, setNewHotListTitle] = useState("");

  let isSubscribed = true;

  useEffect(() => {
    getHotListTypes();
    getUserWatchList();
    return () => (isSubscribed = false);
  }, []);

  const getHotListTypes = () => {
    CmdTseService.getHotListTypes((status, data) => {
      if (status && isSubscribed) {
        setHotListTypes(data);
        getHotListInstruments(data[0].Id, data[0].Title);
      }
    });
  };

  const getUserWatchList = () => {
    TseBofService.getUserWatchList((status, data) => {
      if (status && isSubscribed) setUserWatchList(data);
    });
  };

  const getHotListInstruments = (id, title) => {
    CmdTseService.getInstrumentsHotList(id, (status, data) => {
      if (status) setWatchlist(data, title, false);
      else {
        props.notifyError("دیده‌بان انتخاب شده بدون اطلاعات می‌باشد");
      }
    });
  };

  const getPortfolioInstruments = () => {
    if (device.isMobile) props.setHotListOpen(false);
    TseBofService.getUserAssetWatchListItem((status, data) => {
      if (status) setWatchlist(data, "پرتفوی", false);
    });
  };

  const getUserWatchListItem = (id, title) => {
    TseBofService.getUserWatchListItem(id, (status, data) => {
      if (status) setWatchlist(data.Result, title, true);
      else props.notifyError(data.Message);
    });
  };

  const setWatchlist = (instruments, title, userDefined) => {
    if (device.isNotMobile) props.setHotListOpen(false);
    setTimeout(function () {
      props.setWatchlist(instruments, title, userDefined);
    }, 400);
  };

  const addUserWatchList = () => {
    if (newHotListTitle) {
      TseBofService.addUserWatchList(
        { title: newHotListTitle },
        (status, data) => {
          if (status) {
            getUserWatchList();
            setNewHotListTitle("");
          } else {
            props.notifyError(data.Message);
          }
        }
      );
      if (device.isMobile) setNewHotListOpen(false);
    } else props.notifyError("عنوان وارد نشده است");
  };

  const deleteUserWatchList = (id) => {
    TseBofService.deleteUserWatchList(id, (status, data) => {
      if (status) {
        getUserWatchList();
      } else props.notifyError(data.Message);
    });
  };

  const editUserWatchList = (id, title) => {
    TseBofService.updateUserWatchListTitle({ id, title }, (status, data) => {
      if (status) {
        getUserWatchList();
      }
    });
  };

  const hotListItemClickHandler = (x) => {
    if (device.isMobile) props.setHotListOpen(false);
    getHotListInstruments(x.Id, x.Title);
  };

  const WatchListItemClickHandler = (x) => {
    if (device.isMobile) props.setHotListOpen(false);
    getUserWatchListItem(x.Id, x.Title);
  };

  const tree = (
    <TreeView defaultExpanded={device.isNotMobile ? ["2"] : [""]}>
      <TreeItem
        nodeId="0"
        label="پرتفوی"
        onClick={getPortfolioInstruments}
      ></TreeItem>
      <TreeItem nodeId="1" label="دیده‌بان‌های پیش فرض">
        {hotListTypes.map((x, i) => (
          <HotListItem
            key={i}
            nodeId={i + "1"}
            label={x.Title}
            editable={false}
            onClick={() => hotListItemClickHandler(x)}
            className={clsx(device.isNotMobile && classes.treeChild)}
            classes={{
              root: clsx(device.isNotMobile && classes.rootTreeItem),
              selected: clsx(device.isNotMobile && classes.selected),
              content: clsx(device.isNotMobile && classes.content),
              label: clsx(
                device.isNotMobile && classes.treeChildLabel,
                device.isNotMobile && classes.label
              ),
              iconContainer: clsx(device.isNotMobile && classes.iconContainer),
            }}
          ></HotListItem>
        ))}
      </TreeItem>
      <TreeItem nodeId="2" label="دیده‌بان‌های دلخواه">
        {userWatchList.map((x, i) => (
          <HotListItem
            key={i}
            nodeId={i + "2"}
            label={x.Title}
            editable={true}
            className={clsx(device.isNotMobile && classes.treeChild)}
            onClick={() => WatchListItemClickHandler(x)}
            onDelete={() => deleteUserWatchList(x.Id)}
            onEdit={(title) => editUserWatchList(x.Id, title)}
            classes={{
              root: clsx(device.isNotMobile && classes.rootTreeItem),
              selected: clsx(device.isNotMobile && classes.selected),
              content: clsx(device.isNotMobile && classes.content),
              label: clsx(
                device.isNotMobile && classes.treeChildLabel,
                device.isNotMobile && classes.label
              ),
              iconContainer: clsx(device.isNotMobile && classes.iconContainer),
            }}
          ></HotListItem>
        ))}
      </TreeItem>
    </TreeView>
  );

  return (
    <>
      {device.isNotMobile ? (
        <Grid
          container
          className={clsx(
            classes.root,
            props.hotListOpen && classes.open,
            props.className,
            props.widget && classes.rootWidget
          )}
        >
          <Grid item>
            <Grid container spacing={6} className={classes.top}>
              <Grid item className={classes.closeItem}>
                <Link
                  component={<ArrowIcon className={classes.close} />}
                  onClick={() => props.setHotListOpen(false)}
                ></Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.main}>
            {tree}
          </Grid>
          <Grid item>
            <Grid container className={classes.addItem}>
              {/* {newHotListOpen && ( */}
              <Grid container item>
                <Grid item>
                  <Grid
                    container
                    className={
                      newHotListOpen
                        ? clsx(classes.addNew, classes.show)
                        : classes.addNew
                    }
                    spacing={4}
                  >
                    <Grid item>
                      <Input
                        label="نام دیده‌بان جدید"
                        inputClassName={classes.searchInput}
                        value={newHotListTitle}
                        onChange={(e) => setNewHotListTitle(e.target.value)}
                        endAdornment={
                          <Link onClick={addUserWatchList}>
                            <AcceptIcon className={classes.acceptBtn} />
                          </Link>
                        }
                      ></Input>
                    </Grid>
                    {/* <Grid item className={classes.acceptBtn}>
                  <Link
                    component={<AcceptIcon className={classes.acceptBtnIcon} />}
                    onClick={() => props.setHotListOpen(false)}
                  ></Link>
                </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
              {/* )} */}
              <Grid item className={classes.addItemBox}>
                <Link
                  className={rotate ? classes.rotate : classes.addItemBtn}
                  tooltipPlacement="bottom"
                  title={!rotate ? "دیده‌بان جدید" : "بستن"}
                  component={<PlusIcon className={classes.add} />}
                  onClick={() => {
                    setNewHotListOpen(!newHotListOpen);
                    setRotate(!rotate);
                  }}
                  tooltipColor={
                    rotate
                      ? theme.palette.color.red
                      : theme.palette.primary.main
                  }
                ></Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Drawer
          anchor="right"
          open={props.hotListOpen}
          onClose={() => props.setHotListOpen(false)}
          onOpen={() => props.setHotListOpen(true)}
        >
          <Grid container className={classes.rootMobile}>
            <Grid item className={classes.headerMobile}>
              لیست دیده‌بان‌ها
            </Grid>
            {!newHotListOpen ? (
              <>
                <Grid item className={classes.mainMobile}>
                  {tree}
                </Grid>
                <Grid item className={classes.addNewMobile}>
                  <Button
                    type="button"
                    variant="outlined"
                    className={classes.addNewBtnMobile}
                    color="primary"
                    onClick={() => {
                      setNewHotListOpen(!newHotListOpen);
                    }}
                  >
                    <PlusIcon className={classes.plusIconMobile} />
                  </Button>
                </Grid>
              </>
            ) : (
              <Grid item>
                <Grid
                  container
                  className={classes.addNewWatchlistMobile}
                  spacing={4}
                >
                  <Grid item>
                    <Input
                      label="نام دیده‌بان جدید"
                      inputClassName={classes.searchInput}
                      value={newHotListTitle}
                      onChange={(e) => setNewHotListTitle(e.target.value)}
                    ></Input>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Button
                          onClick={addUserWatchList}
                          className={clsx(
                            classes.acceptBtnMobile,
                            classes.actionBtnMobile
                          )}
                        >
                          تایید
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          onClick={() => {
                            setNewHotListOpen(false);
                          }}
                          className={clsx(
                            classes.cancelBtnMobile,
                            classes.actionBtnMobile
                          )}
                        >
                          انصراف
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Drawer>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWatchlist: (instruments, title, userDefined) =>
      dispatch(actions.setWatchlist(instruments, title, userDefined)),
    notifyError: (message) => dispatch(actions.notifyError(message)),
  };
};

export default connect(null, mapDispatchToProps)(HotList);
