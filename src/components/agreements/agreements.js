import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../UI/dialog/dialog";
import Table from "../UI/Table/Table";
import TseBofService from "../../services/tseBofService";
import AcceptIcon from "../UI/icons/accept";
import DownloadIcon from "../UI/icons/download";
import { replaceItemAtIndex } from "../../shared/utility";
import style from "../../shared/style";
import useDevice from "../../hooks/useDevice";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { addDisplayedModal, isModalDisplayed } from "../../shared/utility";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  table: {
    // width: 600,
    "& td": {
      textAlign: "right",
      fontSize: 11,
      // minWidth: 100,
      borderBottom: "none",
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
  operationsIcon: {
    width: 20,
    height: 20,
    margin: `0px ${theme.spacing(0.5)}px`,
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },

  tableMobile: {
    "& td": {
      fontSize: 12,
      borderBottom: "none",
    },
  },
  tableRowMobile: {
    borderBottom: `1px solid ${theme.palette.border.bar}66`,
    backgroundColor: "transparent",
    height: 44,
  },
  dialogContent: {
    padding: "0 12px 28px 12px",
  },
  operationsIconMobile: {
    width: 26,
    height: 26,
    margin: "0 4px",
    strokeWidth: 1,
  },
  downloadIcon: {
    fill: theme.palette.color.blue,
    stroke: theme.palette.color.blue,
  },
  acceptIcon: {
    fill: theme.palette.color.green,
    stroke: theme.palette.color.green,
  },
  scrollBar: {
    marginLeft: 2,
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.text.secondary,
      },
      // scrollbarColor: `${theme.palette.border.primary} transparent`,
    },
    scrollbarWidth: "thin",
  },
}));

const Agreements = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [dialogOpen, setDialogOpen] = useState(props.open || false);
  const [agreements, setAgreements] = useState(null);

  let isSubscribed = true;
  let firstLoad = true;

  useEffect(() => {
    getAgreements();
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    if (agreements && firstLoad) {
      const isNotDisplayed = !isModalDisplayed("agreementsModal");
      if (isNotDisplayed && agreements.some((a) => !a.Accept) > 0) {
        setDialogOpen(true);
        addDisplayedModal("agreementsModal");
      }
      firstLoad = false;
    }
  }, [agreements]);

  useEffect(() => {
    setDialogOpen(props.open);
  }, [props.open]);

  const getAgreements = () => {
    TseBofService.getIdentityAgreements((status, data) => {
      if (data && data.length > 0 && isSubscribed) {
        setAgreements(data);
      }
    });
  };

  const closeDialog = () => {
    setDialogOpen(false);
    props.onClose();
  };

  const download = (row) => {
    TseBofService.getAgreementById(row.AgreementId, (status, data) => {
      var blob = new Blob([data], { type: "application/pdf" });
      var objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl);
    });
  };

  const accept = (row) => {
    const data = {
      AgreementId: row.AgreementId,
      Accept: true,
    };
    TseBofService.acceptAgreement(data, (status, data) => {
      const index = agreements.findIndex(
        (a) => a.AgreementId === row.AgreementId
      );
      setAgreements(
        replaceItemAtIndex(agreements, index, {
          ...agreements[index],
          Accept: true,
        })
      );
    });
  };

  const schema = {
    columns: [
      {
        field: "AgreementTitle",
      },
    ],
    operations: [
      {
        title: "دریافت فایل",
        icon: (
          <DownloadIcon
            className={clsx(
              device.isNotMobile
                ? classes.operationsIcon
                : classes.operationsIconMobile,
              classes.downloadIcon
            )}
          />
        ),
        action: (row) => download(row),
      },
      {
        title: "موافقم",
        icon: (
          <AcceptIcon
            className={clsx(
              device.isNotMobile
                ? classes.operationsIcon
                : classes.operationsIconMobile,
              classes.acceptIcon
            )}
          />
        ),
        action: (row) => accept(row),
        hide: (row) => row.Accept,
      },
    ],
  };

  return (
    <Dialog
      title="توافقنامه ها"
      open={dialogOpen}
      fullWidth={true}
      onClose={closeDialog}
      dialogContentClassName={clsx(device.isNotMobile && classes.scrollBar)}
    >
      <Grid item className={clsx(device.isMobile && classes.dialogContent)}>
        <Table
          className={clsx(
            classes.table,
            device.isMobile && classes.tableMobile
          )}
          rowClassName={
            device.isNotMobile ? classes.tableRow : classes.tableRowMobile
          }
          data={agreements}
          schema={schema}
          hideHeader={true}
        ></Table>
      </Grid>
    </Dialog>
  );
};

export default Agreements;
