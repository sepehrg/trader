import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { toJalaliDateTimeNoSecond } from "../../shared/utility";
import ArrowIcon from "../UI/icons/arrow";
import TimeIcon from "../UI/icons/time";
import clsx from "clsx";
import NoImageIcon from "../UI/icons/noImage";
import useDevice from "../../hooks/useDevice";
import { useHistory } from "react-router-dom";
import NewsContent from "./newsContent/newsContent";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 7,
    height: 315,
    flexDirection: "column",
    overflow: "hidden",
  },
  item: {
    padding: 10,
  },
  newsImage: {
    height: 160,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  noImage: {
    width: "100%",
    height: "100%",
    backgroundColor: `${theme.palette.border.primary}66`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageIcon: {
    width: 120,
    height: 120,
    fill: theme.palette.border.primary,
  },
  newsRef: {
    position: "absolute",
    bottom: 8,
    left: 8,
    padding: "2px 6px",
    fontSize: 10,
    backgroundColor: theme.palette.background.box,
    borderRadius: 6,
  },
  mainContent: {
    display: "flex",
    flex: 1,
  },
  content: {
    padding: 10,
    paddingBottom: 4,
  },
  contentTitle: {
    fontSize: 14,
    color: theme.palette.text.primary,
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    margin: "2px 0",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  contentText: {
    color: theme.palette.text.secondary,
    textAlign: "justify",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    margin: "6px 0",
    lineHeight: "1.7",
  },
  footer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    fontSize: 10,
  },
  footerContent: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 5,
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${theme.palette.border.bar}`,
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginTop: -2,
  },
  more: {
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main,
      transform: "translateX(-4px)",
    },
  },
  date: {
    alignItems: "center",
  },

  boxMobile: {
    border: `1px solid ${theme.palette.border.bar}`,
    backgroundColor: theme.palette.background.box,
    borderRadius: 8,
    overflow: "hidden",
  },
  contentTitleMobile: {
    fontSize: 14,
  },
  contentTextMobile: {
    fontSize: 12,
  },
  dateMobile: {
    fontSize: 11,
    flexWrap: "noWrap",
    "&>*": {
      whiteSpace: "noWrap",
    },
  },
  footerContentMobile: {
    minHeight: 26,
  },
  moreIconMobile: {
    width: 22,
    height: 22,
  },
}));

const NewsItem = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const history = useHistory();

  const [dialogOpen, setDialogOpen] = useState(false);

  const openNewsHandler = () => {
    if (device.isNotMobile) {
      setDialogOpen(true);
    } else {
      props.setBackButton(true);
      history.push("/news/" + props.item.Id);
    }
  };

  return (
    <>
      {dialogOpen && (
        <NewsContent
          dialogOpen={dialogOpen}
          newsId={props.item.Id}
          onDialogClose={() => setDialogOpen(!dialogOpen)}
        />
      )}
      <Grid
        item
        lg={3}
        md={4}
        xs={12}
        className={classes.item}
        data-tour="newsItem"
      >
        <Grid
          container
          className={device.isNotMobile ? classes.root : classes.boxMobile}
          onClick={openNewsHandler}
        >
          <Grid item className={classes.newsImage}>
            {props.item.BinaryContexts &&
            props.item.BinaryContexts.length > 0 ? (
              <img
                src={
                  "data:image/png;base64, " + props.item.BinaryContexts[0].Value
                }
                className={classes.image}
                alt=""
              />
            ) : (
              <div className={classes.noImage}>
                <NoImageIcon className={classes.noImageIcon} />
              </div>
            )}
            <Grid item className={classes.newsRef}>
              {props.item.ReferenceTitle}
            </Grid>
          </Grid>
          <Grid item className={classes.mainContent}>
            <Grid container className={classes.content}>
              <Grid item>
                <Grid container>
                  <Grid
                    item
                    className={clsx(
                      classes.contentTitle,
                      device.isMobile && classes.contentTitleMobile
                    )}
                  >
                    {props.item.Title}
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      classes.contentText,
                      device.isMobile && classes.contentTextMobile
                    )}
                  >
                    {props.item.Lead}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.footer}>
                <Grid
                  container
                  className={clsx(
                    classes.footerContent,
                    device.isMobile && classes.footerContentMobile
                  )}
                >
                  <Grid item>
                    <Grid
                      container
                      className={clsx(
                        classes.date,
                        device.isMobile && classes.dateMobile
                      )}
                      spacing={2}
                    >
                      <Grid item>
                        <TimeIcon className={classes.icon} />
                      </Grid>
                      <Grid item>
                        {toJalaliDateTimeNoSecond(props.item.ContextDate)}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <ArrowIcon
                      className={clsx(
                        classes.more,
                        device.isMobile && classes.moreIconMobile,
                        classes.icon
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBackButton: (state) => dispatch(actions.setBackButton(state)),
  };
};

export default connect(null, mapDispatchToProps)(NewsItem);
