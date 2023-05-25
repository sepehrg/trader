import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../UI/dialog/dialog";
import Table from "../UI/Table/Table";
import { toJalaliDateTime } from "../../shared/utility";
import useDevice from "../../hooks/useDevice";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import IdentityService from "../../services/identityService";

const useStyles = makeStyles((theme) => ({
  table: {
    width: 500,
    "& td, & th": {
      textAlign: "right",
      border: "none",
      fontSize: 11,
    },
  },
  tableRow: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `3px solid ${theme.palette.background.box}`,
    transition: "0.3s",
    height: 39,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}22`,
    },
  },

  tableMobile: {
    width: "100%",
    "& th": {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
      direction: "ltr",
    },
  },
  tableRowMobile: {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${theme.palette.border.bar}66`,
    height: 38,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  dialogContent: {
    padding: "0 16px 28px 16px",
  },
}));

const LoginReport = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const [logins, setLogins] = useState(null);

  useEffect(() => {
    if (props.open) getLoginReport();
  }, [props.open]);

  const getLoginReport = () => {
    IdentityService.getUserLastLoginsHistory((status, data) => {
      setLogins(data);
    });
  };

  const closeDialog = () => {
    props.onClose();
  };

  const formatDate = (date) => {
    return <div>{toJalaliDateTime(date)}</div>;
  };

  const schema = {
    columns: [
      {
        title: "تاریخ",
        field: "DateOfEvent",
        format: (value) => formatDate(value),
      },
      {
        title: "آدرس",
        field: "ClientIp",
      },
    ],
  };
  return (
    <Dialog title="تاریخچه ورود" open={props.open} onClose={closeDialog}>
      <Grid item className={clsx(device.isMobile && classes.dialogContent)}>
        <Table
          className={clsx(
            classes.table,
            device.isMobile && classes.tableMobile
          )}
          rowClassName={clsx(
            classes.tableRow,
            device.isMobile && classes.tableRowMobile
          )}
          data={logins}
          schema={schema}
          // stickyHeader
        ></Table>
      </Grid>
    </Dialog>
  );
};

export default LoginReport;
