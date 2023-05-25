import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "../../components/UI/Tab/Tabs";
import Tab from "../../components/UI/Tab/Tab";
import TabPanel from "../../components/UI/Tab/TabPanel";
import clsx from "clsx";
import TradesTable from "../../components/tradesTable/tradesTable";
import PortfolioTable from "../../components/portfolioTable/portfolioTable";
import OrdersTable from "../../components/ordersTable/ordersTable";
import DraftOrdersTable from "../../components/draftOrdersTable/draftOrdersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    padding: 10,
    height: "100%",
    flexWrap: "nowrap",
  },
  tabs: {
    flexDirection: "column",
  },
  tabsMobile: {
    backgroundColor: theme.palette.background.box,
    borderRadius: 50,
    padding: 5,
    height: 24,
  },
  indicator: {
    height: "100%",
    borderRadius: 50,
  },
  tabMobile: {
    width: "25%",
    zIndex: 1,
    fontSize: 12,
    maxWidth: "none",
    minHeight: "auto",
  },
  activeTabMobile: {
    color: "#FFF",
  },
  tabPanels: {
    height: "calc(100% - 38px)",
  },
  tabPanelItem: {
    height: "100%",
  },
  portfolioTable: {
    height: "100%",
  },
}));

const MobilePortfolio = (props) => {
  const classes = useStyles();

  const [selectedIndexTabMobile, setSelectedIndexTabMobile] = React.useState(
    props.tabId
  );

  useEffect(() => {
    setSelectedIndexTabMobile(props.tabId);
  }, [props.tabId]);

  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid item className={classes.tabs}>
        <Tabs
          orientation="horizontal"
          value={selectedIndexTabMobile}
          onChange={(e, tab) => setSelectedIndexTabMobile(tab)}
          indicatorColor="primary"
          className={classes.tabsMobile}
          classes={{ indicator: classes.indicator }}
        >
          <Tab
            className={clsx(
              classes.tabMobile,
              selectedIndexTabMobile === 0 && classes.activeTabMobile
            )}
            label="سفارشات فعال"
            id="tab-0"
          ></Tab>
          <Tab
            className={clsx(
              classes.tabMobile,
              selectedIndexTabMobile === 1 && classes.activeTabMobile
            )}
            label="معاملات امروز"
            id="tab-1"
          ></Tab>
          <Tab
            className={clsx(
              classes.tabMobile,
              selectedIndexTabMobile === 2 && classes.activeTabMobile
            )}
            label="پرتفوی"
            id="tab-2"
          ></Tab>
          <Tab
            className={clsx(
              classes.tabMobile,
              selectedIndexTabMobile === 3 && classes.activeTabMobile
            )}
            label="پیش‌نویس سفارشات"
            id="tab-3"
          ></Tab>
        </Tabs>
      </Grid>
      <Grid item className={classes.tabPanels}>
        <TabPanel
          value={selectedIndexTabMobile}
          index={0}
          className={classes.tabPanelItem}
        >
          <OrdersTable></OrdersTable>
        </TabPanel>
        <TabPanel
          value={selectedIndexTabMobile}
          index={1}
          className={classes.tabPanelItem}
        >
          <TradesTable></TradesTable>
        </TabPanel>
        <TabPanel
          value={selectedIndexTabMobile}
          index={2}
          className={classes.tabPanelItem}
        >
          <PortfolioTable></PortfolioTable>
        </TabPanel>
        <TabPanel
          value={selectedIndexTabMobile}
          index={3}
          className={classes.tabPanelItem}
        >
          <DraftOrdersTable
          // refreshClicked={refreshDraftOrders}
          ></DraftOrdersTable>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default MobilePortfolio;
