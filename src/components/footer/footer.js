import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "../UI/Tab/Tabs";
import Tab from "../UI/Tab/Tab";
import TabPanel from "../UI/Tab/TabPanel";
import OrdersTable from "../ordersTable/ordersTable";
import PortfolioTable from "../portfolioTable/portfolioTable";
import TradesTable from "../tradesTable/tradesTable";
import DraftOrdersTable from "../draftOrdersTable/draftOrdersTable";
import clsx from "clsx";
import style from "../../shared/style";
import TableControls from "../UI/Table/tableControls/tableControls";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    height: "100%",
    borderRadius: "5px",
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    padding: `0px ${theme.spacing(4)}px`,
    overflow: "hidden",
  },
  tabs: {
    minHeight: "34px",
    width: "100%",
    borderBottom: `1px solid ${theme.palette.border.primary}66`,
    flexWrap: "nowrap",
    display: "flex",
  },
  innerTabs: {
    minHeight: "auto",
  },
  tab: {
    minHeight: "34px",
    minWidth: 120,
  },
  toolbar: {
    justifyContent: "flex-end",
    margin: `auto 0`,
  },
  tabContent: {
    width: "100%",
    overflowY: "auto",
    height: "calc(100% - 35px)",
  },

  rootWidget: {
    border: "none",
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState(0);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [refreshTrades, setRefreshTrades] = useState(false);
  const [refreshPortfolio, setRefreshPortfolio] = useState(false);
  const [refreshDraftOrders, setRefreshDraftOrders] = useState(false);

  const tabChangeHandler = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const deleteHandler = () => {
    setDeleteClicked(!deleteClicked);
  };

  const refreshHandler = () => {
    if (selectedTab === 0) setRefreshOrders(!refreshOrders);
    else if (selectedTab === 1) setRefreshTrades(!refreshTrades);
    else if (selectedTab === 3) setRefreshDraftOrders(!refreshDraftOrders);
    else setRefreshPortfolio(!refreshPortfolio);
  };

  return (
    <Grid
      container
      className={clsx(classes.root, props.widget && classes.rootWidget)}
    >
      <Grid item className={classes.tabs}>
        <Grid container>
          <Tabs
            orientation="horizontal"
            value={selectedTab}
            onChange={tabChangeHandler}
            className={classes.innerTabs}
            indicatorColor="primary"
          >
            <Tab className={classes.tab} label="سفارشات فعال" id="tab-0"></Tab>
            <Tab
              className={classes.tab}
              label="معاملات امروز"
              id="tab-1"
              isHidden={props.onlineGroup}
            ></Tab>
            <Tab
              className={classes.tab}
              label="پرتفوی"
              id="tab-2"
              isHidden={props.onlineGroup}
            ></Tab>
            <Tab
              className={classes.tab}
              label="پیش‌نویس سفارشات"
              id="tab-3"
              isHidden={props.onlineGroup}
            ></Tab>
          </Tabs>
        </Grid>
        <Grid container className={classes.toolbar}>
          <TableControls
            onSelectChange={setShowCheckbox}
            onDelete={deleteHandler}
            selectedTab={selectedTab}
            onRefresh={refreshHandler}
          ></TableControls>
        </Grid>
      </Grid>
      <Grid item className={clsx(classes.tabContent, classes.scrollbarY)}>
        <TabPanel value={selectedTab} index={0}>
          <OrdersTable
            showCheckbox={showCheckbox}
            deleteClicked={deleteClicked}
            refreshClicked={refreshOrders}
            onlineGroup={props.onlineGroup}
          ></OrdersTable>
        </TabPanel>
        {!props.onlineGroup && (
          <>
            <TabPanel value={selectedTab} index={1}>
              <TradesTable refreshClicked={refreshTrades}></TradesTable>
            </TabPanel>
            <TabPanel value={selectedTab} index={2}>
              <PortfolioTable
                refreshClicked={refreshPortfolio}
                widget={props.widget}
              ></PortfolioTable>
            </TabPanel>
            <TabPanel value={selectedTab} index={3}>
              <DraftOrdersTable
                refreshClicked={refreshDraftOrders}
              ></DraftOrdersTable>
            </TabPanel>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default connect(null)(Footer);
