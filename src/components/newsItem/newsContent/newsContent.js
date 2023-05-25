import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Dialog from "../../UI/dialog/dialog";
import CmdTseService from "../../../services/cmdTseService";
import { toJalaliDateTimeNoSecond } from "../../../shared/utility";
import style from "../../../shared/style";
import clsx from "clsx";
import LinkIcon from "../../UI/icons/link";
import TimeIcon from "../../UI/icons/time";
import NoImageIcon from "../../UI/icons/noImage";
import useDevice from "../../../hooks/useDevice";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    padding: "10px 20px",
    paddingBottom: 4,
    height: "100%",
  },
  newsImage: {
    height: 300,
    width: "60%",
    overflow: "hidden",
    margin: "auto",
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
    width: 160,
    height: 160,
    fill: `${theme.palette.border.primary}77`,
  },
  contentTitle: {
    fontSize: 18,
    margin: "10px auto",
  },
  contentText: {
    fontSize: 11,
    color: theme.palette.text.primary,
    textAlign: "justify",
    margin: "6px 0",
    lineHeight: "1.7",
    display: "flex",
    flex: 1,
    "& $a": {
      color: theme.palette.text.primary,
    },
  },
  date: {
    display: "flex",
    flexWrap: "nowrap",
  },
  dateText: {
    whiteSpace: "nowrap",
  },
  reference: {
    display: "flex",
    flexWrap: "nowrap",
  },
  referenceText: {
    whiteSpace: "nowrap",
  },
  footer: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    width: "100%",
    marginTop: 10,
    "&:before": {
      content: "''",
      backgroundColor: theme.palette.border.bar,
      height: 1,
      width: "100%",
      display: "block",
      marginLeft: theme.spacing(2),
    },
  },
  footerContent: {
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 0,
  },
  paperFullWidth: {
    height: "100%",
  },
  icon: {
    height: 16,
    width: 16,
    marginTop: -2,
  },
  source: {
    display: "flex",
    color: theme.palette.text.secondary,
  },
  lead: {
    backgroundColor: theme.palette.background.paper,
    fontSize: 13,
    textAlign: "center",
    padding: 7,
    borderRadius: 3,
    lineHeight: 1.7,
  },

  rootMobile: {
    flexWrap: "nowrap",
    padding: 0,
  },
  newsImageMobile: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    margin: 0,
  },
  contentTitleMobile: {
    fontSize: 14,
    padding: "0 16px",
  },
  leadMobile: {
    textAlign: "justify",
    backgroundColor: theme.palette.border.primary,
    color: theme.palette.text.primary,
    fontSize: 12,
    borderRadius: 0,
    padding: "10px 30px",
    lineHeight: 1.5,
  },
  contentTextMobile: {
    fontSize: 12,
    lineHeight: 2,
    display: "block",
    padding: "0 16px",
  },
  footerMobile: {
    backgroundColor: theme.palette.text.secondary,
    color: theme.palette.background.box,
    padding: 0,
    "&:before": {
      display: "none",
    },
  },
  footerContentMobile: {
    padding: "6px 16px",
  },
  iconMobile: {
    fill: theme.palette.background.box,
  },
  referenceTextMobile: {
    color: theme.palette.background.box,
  },
}));

const NewsContent = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [data, setData] = useState("");

  useEffect(() => {
    getNews(props.dialogOpen ? props.newsId : props.match.params.id);
  }, []);

  const getNews = (id) => {
    CmdTseService.getNewsById(id, (status, data) => {
      setData(data.Result);
    });
  };

  const content = (
    <Grid
      container
      className={clsx(
        classes.root,
        device.isMobile && classes.rootMobile,
        device.isMobile && classes.scrollbarY
      )}
    >
      <Grid
        item
        className={clsx(
          device.isNotMobile ? classes.newsImage : classes.newsImageMobile
        )}
      >
        {data.BinaryContextDto ? (
          <img
            src={"data:image/png;base64, " + data.BinaryContextDto[0]?.Value}
            className={classes.image}
            alt=""
          />
        ) : (
          <div className={classes.noImage}>
            <NoImageIcon className={classes.noImageIcon} />
          </div>
        )}
      </Grid>
      <Grid
        item
        className={clsx(
          classes.contentTitle,
          device.isMobile && classes.contentTitleMobile
        )}
      >
        {data.Title}
      </Grid>
      <Grid
        item
        className={clsx(classes.lead, device.isMobile && classes.leadMobile)}
      >
        {data.Lead}
      </Grid>
      <Grid
        item
        className={clsx(
          classes.contentText,
          device.isMobile && classes.contentTextMobile,
          device.isNotMobile && classes.scrollbarY
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: data.Body }} />
      </Grid>
      <Grid
        item
        className={clsx(
          classes.footer,
          device.isMobile && classes.footerMobile
        )}
      >
        <Grid
          container
          className={clsx(
            classes.footerContent,
            device.isMobile && classes.footerContentMobile
          )}
        >
          <Grid item>
            <Grid container className={classes.date} spacing={2}>
              <Grid item>
                <TimeIcon
                  className={clsx(
                    classes.icon,
                    device.isMobile && classes.iconMobile
                  )}
                />
              </Grid>
              <Grid item className={classes.dateText}>
                {toJalaliDateTimeNoSecond(data.ContextDate)}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <a
                  href={data.NewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.source}
                >
                  <Grid container spacing={2} className={classes.reference}>
                    <Grid item>
                      <LinkIcon
                        className={clsx(
                          classes.icon,
                          device.isMobile && classes.iconMobile
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      className={clsx(
                        classes.referenceText,
                        device.isMobile && classes.referenceTextMobile
                      )}
                    >
                      منبع خبر
                    </Grid>
                  </Grid>
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <>
      {data &&
        (device.isNotMobile ? (
          <Dialog
            open={props.dialogOpen}
            title="اخبار"
            onClose={props.onDialogClose}
            fullWidth={true}
            maxWidth="md"
            classes={{ paperFullWidth: classes.paperFullWidth }}
          >
            {content}
          </Dialog>
        ) : (
          content
        ))}
    </>
  );
};

export default NewsContent;
