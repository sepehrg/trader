import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../UI/Link/Link";
import SupportIcon from "../../UI/icons/support";
import withWidth from "@material-ui/core/withWidth";
import Fade from "@material-ui/core/Fade";
import StockIcon from "../../UI/icons/stock";
import FaraBourseIcon from "../../UI/icons/faraBourse";
import CodalIcon from "../../UI/icons/codal";
import SeoIcon from "../../UI/icons/seo";
import TechManageIcon from "../../UI/icons/techManage";
import PageTitle from "../pageTitle/pageTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    height: "100%",
  },
  mainTitle: {
    height: 180,
    display: "flex",
    alignItems: "flex-end",
  },
  content: {
    padding: "30px 80px",
    overflowY: "auto",
    height: "calc(100% - 180px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  items: {
    flexDirection: "column",
    textAlign: "center",
    fontSize: 22,
    marginTop: 75,
    marginBottom: 25,
  },
  contactInfoTitle: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginBottom: 10,
    "&:before": {
      content: "''",
      width: 50,
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      display: "inline-block",
      marginLeft: 10,
    },
    "&:after": {
      content: "''",
      width: 50,
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      display: "inline-block",
      marginRight: 10,
    },
  },
  contactInfoIcon: {
    width: 84,
    height: 84,
  },
  relatedLinks: {
    marginTop: 20,
    justifyContent: "center",
  },
  featurs1Title: {
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    color: theme.palette.text.secondary,
    "&:before": {
      content: "''",
      width: 50,
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      display: "inline-block",
      marginLeft: 10,
    },
    "&:after": {
      content: "''",
      width: 50,
      height: 1,
      backgroundColor: theme.palette.text.secondary,
      display: "inline-block",
      marginRight: 10,
    },
  },
  linkItem: {
    margin: "10px 15px",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
    },
  },
  linkItemIcon: {
    width: 40,
    height: 40,
    fill: theme.palette.icon.primary,
  },
}));

const Contact = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.mainTitle}>
        <PageTitle
          title="پشتیبانی و تماس"
          subtitle="همواره پاسخگوی شما هستیم!"
        />
      </Grid>
      <Grid item className={classes.content}>
        <Fade
          in={true}
          {...{ timeout: 1200 }}
          style={{ transitionDelay: "1800ms" }}
        >
          <Grid container className={classes.items}>
            <Grid item>
              <SupportIcon className={classes.contactInfoIcon} />
            </Grid>
            <Grid item className={classes.contactInfoTitle}>
              با ما در تماس باشید
            </Grid>
            <Grid item>021-88196807</Grid>
          </Grid>
        </Fade>
        <Grid container className={classes.relatedLinks}>
          <Grid item>
            <Fade
              in={true}
              {...{ timeout: 1500 }}
              style={{ transitionDelay: "2400ms" }}
            >
              <Grid container className={classes.featurs1Title}>
                <Grid item>لینک‌های مرتبط</Grid>
              </Grid>
            </Fade>
            <Grid container>
              <Grid item className={classes.linkItem}>
                <Fade
                  in={true}
                  {...{ timeout: 1700 }}
                  style={{ transitionDelay: "2400ms" }}
                >
                  <div>
                    <Link
                      title={"بورس اوراق بهادار"}
                      component={<StockIcon className={classes.linkItemIcon} />}
                      tooltipPlacement="bottom"
                      onClick={() => {}}
                      className={classes.toolbarBtn}
                    />
                  </div>
                </Fade>
              </Grid>
              <Grid item className={classes.linkItem}>
                <Fade
                  in={true}
                  {...{ timeout: 1900 }}
                  style={{ transitionDelay: "2400ms" }}
                >
                  <div>
                    <Link
                      title={"شرکت فرابورس ایران"}
                      component={
                        <FaraBourseIcon className={classes.linkItemIcon} />
                      }
                      tooltipPlacement="bottom"
                      onClick={() => {}}
                      className={classes.toolbarBtn}
                    />
                  </div>
                </Fade>
              </Grid>
              <Grid item className={classes.linkItem}>
                <Fade
                  in={true}
                  {...{ timeout: 2100 }}
                  style={{ transitionDelay: "2400ms" }}
                >
                  <div>
                    <Link
                      title={"سامانه جامع اطلاع‌رسانی ناشران"}
                      component={<CodalIcon className={classes.linkItemIcon} />}
                      tooltipPlacement="bottom"
                      onClick={() => {}}
                      className={classes.toolbarBtn}
                    />
                  </div>
                </Fade>
              </Grid>
              <Grid item className={classes.linkItem}>
                <Fade
                  in={true}
                  {...{ timeout: 2300 }}
                  style={{ transitionDelay: "2400ms" }}
                >
                  <div>
                    <Link
                      title={"سازمان بورس و اوراق بهادار"}
                      component={<SeoIcon className={classes.linkItemIcon} />}
                      tooltipPlacement="bottom"
                      onClick={() => {}}
                      className={classes.toolbarBtn}
                    />
                  </div>
                </Fade>
              </Grid>
              <Grid item className={classes.linkItem}>
                <Fade
                  in={true}
                  {...{ timeout: 2500 }}
                  style={{ transitionDelay: "2400ms" }}
                >
                  <div>
                    <Link
                      title={"فرابورس"}
                      component={
                        <TechManageIcon className={classes.linkItemIcon} />
                      }
                      tooltipPlacement="bottom"
                      onClick={() => {}}
                      className={classes.toolbarBtn}
                    />
                  </div>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withWidth()(Contact);
