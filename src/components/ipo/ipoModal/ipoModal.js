import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "../../UI/modal/modal";
import TradeForm from "../../tradeForm/tradeForm";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tabs from "../../UI/Tab/Tabs";
import Tab from "../../UI/Tab/Tab";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    backgroundColor: theme.palette.background.box,
    flexWrap: "nowrap",
  },
  left: {
    borderRight: `2px solid ${theme.palette.color.yellow}`,
  },
  right: {
    backgroundColor: theme.palette.background.paper,
  },
  rightContainer: {
    width: 135,
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  },
  instrument: {
    alignSelf: "center",
    width: "100%",
  },
  instrumentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 16,
  },
  describe: {
    fontSize: "11px",
    color: theme.palette.text.secondary,
    paddingTop: `${theme.spacing(2)}px`,
  },
  avatar: {
    margin: "10px auto 5px",
  },
  change: {
    justifyContent: "center",
    marginBottom: 5,
  },
  grid: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 7,
  },
  gridItems: {
    padding: "0 10px",
    borderBottom: `2px solid ${theme.palette.background.box}`,
    "&:nth-child(odd)": {
      borderLeft: `2px solid ${theme.palette.background.box}`,
    },
    "&:nth-last-of-type(-n+2)": {
      borderBottom: "none",
    },
  },
  gridItem: {
    display: "flex",
    minHeight: 36,
  },
  gridTh: {
    flexDirection: "column",
    textAlign: "right",
    width: "50%",
    margin: "auto 0",
    color: theme.palette.text.secondary,
  },
  gridTd: {
    flexDirection: "column",
    textAlign: "left",
    width: "50%",
    margin: "auto 0",
  },
  infoItem: {
    flexDirection: "column",
    margin: "10px 0",
  },
  infoTitle: {
    color: theme.palette.text.secondary,
    textAlign: "center",
  },
  infoAmount: {
    fontSize: 12,
    display: "flex",
    "&:before": {
      content: "''",
      flex: "1",
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      margin: "auto",
      marginLeft: theme.spacing(2),
    },
    "&:after": {
      content: "''",
      flex: "1",
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      margin: "auto",
      marginRight: theme.spacing(2),
    },
  },
  indicator: {
    display: "none",
  },
  tab: {
    minWidth: 60,
    minHeight: 25,
    fontSize: 12,
    borderRadius: "0 7px 7px 0",
    opacity: 1,
  },
  tabActive: {
    backgroundColor: theme.palette.color.yellow,
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row-reverse",
    marginTop: 10,
    marginBottom: 10,
  },
  colorDefault: {
    backgroundColor: theme.palette.border.bar,
  },
}));

const IpoModal = (props) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const tabChangeHandler = (event, value) => {
    setActiveTab(value);
  };

  return (
    <>
      {props.instruments.length > 0 && (
        <Modal
          open={props.open}
          onClose={props.onClose}
          hideMinimize
          width={440}
          title={props.underWriting ? "پذیره نویسی" : "عرضه اولیه"}
        >
          <Grid container className={classes.root}>
            <Grid item className={classes.right}>
              <Grid container className={classes.rightContainer}>
                <Grid item className={classes.instrument}>
                  <Grid
                    container
                    spacing={3}
                    className={classes.instrumentContainer}
                  >
                    <Grid item>
                      <Avatar
                        className={clsx(classes.avatar, "no-drag")}
                        classes={{ colorDefault: classes.colorDefault }}
                        src={
                          "data:image/png;base64, " +
                          props.instruments[activeTab]?.Picture
                        }
                      />
                    </Grid>

                    <Grid item>
                      <Typography variant="h4" className={classes.name}>
                        {props.instruments[activeTab]?.PersianCode}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className={classes.describe}
                      >
                        {props.instruments[activeTab]?.Title}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item>
                  <Grid container className={classes.infoItem}>
                    <Grid item className={classes.infoTitle}>
                      آستانه تعداد
                    </Grid>
                    <Grid
                      item
                      className={classes.infoAmount}
                      ref={React.createRef()}
                    >
                      {comma(props.instruments[activeTab].MaximumOrderQuantity)}{" "}
                      -{" "}
                      {comma(props.instruments[activeTab].MinimumOrderQuantity)}
                    </Grid>
                  </Grid>
                  <Grid container className={classes.infoItem}>
                    <Grid item className={classes.infoTitle}>
                      قیمت مجاز
                    </Grid>
                    <Grid
                      item
                      className={classes.infoAmount}
                      ref={React.createRef()}
                    >
                      {comma(props.instruments[activeTab].UpperStaticThreshold)}{" "}
                      -{" "}
                      {comma(props.instruments[activeTab].LowerStaticThreshold)}
                    </Grid>
                  </Grid>
                </Grid> */}
                <Grid item>
                  <Grid container className={classes.tabContainer}>
                    <Grid item>
                      <Tabs
                        classes={{
                          indicator: classes.indicator,
                        }}
                        orientation="vertical"
                        value={activeTab}
                        onChange={tabChangeHandler}
                      >
                        {props.instruments.map((ins, i) => (
                          <Tab
                            key={i}
                            className={clsx(
                              classes.tab,
                              activeTab === i && classes.tabActive
                            )}
                            label={ins?.PersianCode}
                            id={`tab-${i}`}
                          ></Tab>
                        ))}
                      </Tabs>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.left}>
              <TradeForm
                side="buy"
                // isin={props.instrument.Isin}
                instrument={props.instruments[activeTab]}
                expandable={true}
                ipo={true}
                vertical={true}
              ></TradeForm>
            </Grid>
          </Grid>
        </Modal>
      )}
    </>
  );
};

export default React.memo(IpoModal);
