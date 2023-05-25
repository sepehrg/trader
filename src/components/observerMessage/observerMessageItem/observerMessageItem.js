import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CmdTseService from "../../../services/cmdTseService";
import style from "../../../shared/style";
import { toJalaliDateTime } from "../../../shared/utility";
import Accordion from "../../UI/accordion/accordion";
import AccordionSummary from "../../UI/accordion/accordionSummary/accordionSummary";
import AccordionDetails from "../../UI/accordion/accordionDetails/accordionDetails";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    flexDirection: "column",
    padding: "8px 0",
  },
  title: {
    fontSize: "12px",
    textAlign: "right",
    marginBottom: 8,
    transition: "0.3s",
  },
  tags: {
    backgroundColor: theme.palette.border.bar,
    padding: `1px 4px`,
    borderRadius: "5px",
    margin: 2,
    cursor: "pointer",
    transition: "0.3s",
  },
  date: {
    marginLeft: 8,
    color: theme.palette.text.secondary,
    direction: "ltr",
  },
  detail: {
    textAlign: "justify",
    lineHeight: "1.8",
    padding: `14px 8px`,
    fontSize: 11,
  },

  rootMobile: {
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  accordionDetailsMobile: {
    backgroundColor: theme.palette.border.primary,
    borderRadius: 0,
  },
  summaryMobile: {
    padding: "11px 10px",
  },
  titleMobile: {
    fontSize: 12,
  },
  dateMobile: {
    fontSize: 11,
  },
  detailMobile: {
    fontSize: 12,
    padding: "14px 14px",
  },
}));

const ObserverMessageItem = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [observerMessage, setObserverMessage] = useState("");

  const changeHandler = (expanded, id) => {
    if (expanded)
      CmdTseService.getObserverMessage(id, (status, data) => {
        setObserverMessage(data.Result);
      });
  };

  return (
    <Grid
      container
      className={clsx(device.isNotMobile ? classes.root : classes.rootMobile)}
    >
      <Grid item>
        <Accordion
          onChange={(e, expanded) => changeHandler(expanded, props.id)}
        >
          <AccordionSummary
            expandIcon={<div></div>}
            summaryClassName={clsx(device.isMobile && classes.summaryMobile)}
          >
            <Grid container>
              <Grid item className={classes.accordionSummary}>
                <Grid
                  container
                  className={clsx(
                    classes.title,
                    device.isMobile && classes.titleMobile
                  )}
                >
                  <Grid item>{props.title}</Grid>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    className={clsx(
                      classes.date,
                      device.isMobile && classes.dateMobile
                    )}
                  >
                    {toJalaliDateTime(props.date)}
                  </Grid>
                </Grid>
                <Grid container>
                  {props.tags &&
                    Array.from(new Set(props.tags.split(","))).map((tag) => (
                      <Grid item className={classes.tags} key={tag}>
                        {tag}
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            detailsClassName={clsx(
              device.isMobile && classes.accordionDetailsMobile
            )}
            widget={props.widget}
          >
            <Typography
              className={clsx(
                classes.detail,
                device.isMobile && classes.detailMobile
              )}
            >
              {observerMessage.Body}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default ObserverMessageItem;
