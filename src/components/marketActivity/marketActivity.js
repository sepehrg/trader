import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CmdTseService from "../../services/cmdTseService";
import { coloredPercent, comma, toJalaliDateTime } from "../../shared/utility";
import TimeIcon from "../UI/icons/time";
import Tooltip from "../UI/Tooltip/Tooltip";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    padding: 10,
    height: 120,
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  title: {
    color: theme.palette.text.secondary,
  },
  value: {
    flexDirection: "column",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
  },
  eventDate: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  clockIcon: {
    width: 16,
    height: 16,
  },

  main: {
    flexWrap: "nowrap",
    overflow: "scroll hidden",
  },
  rootMobile: {
    width: 140,
    height: 100,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  titleMobile: {
    fontSize: 12,
  },
  valueMobile: {
    alignItems: "flex-start",
  },
  priceMobile: {
    fontSize: 18,
  },
  percentageMobile: {
    fontSize: 12,
  },
}));

const MarketActivity = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const device = useDevice();

  const [marketActivityData, setMarketActivityData] = useState([]);

  let isSubscribed = true;

  useEffect(() => {
    getLatestIndexesData();
    return () => (isSubscribed = false);
  }, []);

  const getLatestIndexesData = () => {
    CmdTseService.getLatestIndexesData((status, data) => {
      if (data.Result.length > 0 && isSubscribed) {
        setMarketActivityData(data.Result);
      }
    });
  };

  return (
    <Grid
      container
      spacing={device.isNotMobile ? 6 : 4}
      className={clsx(device.isMobile && classes.main)}
    >
      {marketActivityData.length > 0 ? (
        <>
          {marketActivityData
            .filter((m, i) => i !== 1)
            .map((data, i) => (
              <Grid item sm={4} key={i}>
                <Grid
                  container
                  className={clsx(
                    classes.root,
                    device.isMobile && classes.rootMobile
                  )}
                >
                  {device.isNotMobile && (
                    <Grid item className={classes.eventDate}>
                      <Tooltip
                        placement="top"
                        title={toJalaliDateTime(data.DateOfEvent)}
                        color={theme.palette.text.secondary}
                      >
                        <div>
                          <TimeIcon className={classes.clockIcon} />
                        </div>
                      </Tooltip>
                    </Grid>
                  )}
                  <Grid
                    item
                    className={clsx(
                      classes.title,
                      device.isMobile && classes.titleMobile
                    )}
                  >
                    {data.PersianCode}
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={device.isMobile ? 0 : 3}
                      className={clsx(
                        classes.value,
                        device.isMobile && classes.valueMobile
                      )}
                    >
                      <Grid
                        item
                        className={clsx(
                          classes.price,
                          device.isMobile && classes.priceMobile
                        )}
                      >
                        {comma(parseInt(data.LastIndexLevel))}
                      </Grid>
                      <Grid
                        item
                        className={clsx(
                          device.isMobile && classes.percentageMobile
                        )}
                      >
                        {coloredPercent(
                          parseFloat(data.PreviousVariationPercentage).toFixed(
                            2
                          ),
                          theme,
                          true,
                          true
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </>
      ) : (
        [...Array(6).keys()].map((i) => (
          <Grid item sm={4} key={i}>
            <Grid container className={classes.root}>
              بدون اطلاعات
            </Grid>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default React.memo(MarketActivity);
