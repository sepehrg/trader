import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "../UI/Link/Link";
import WalletIcon from "../UI/icons/wallet";
import { comma } from "../../shared/utility";
import PropertyAmountModal from "../propertyAmountModal/propertyAmountModal";

const useStyles = makeStyles((theme) => ({
  propertyAmount: {
    flexWrap: "nowrap",
    cursor: "pointer",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `2px solid ${theme.palette.border.primary}`,
    padding: 5,
    marginBottom: 8,
    "&:hover": {
      "& $walletIcon": {
        fill: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
    },
  },
  walletIcon: {
    transition: "0s",
  },
  propertyAmountTitle: {
    alignItems: "center",
  },
}));

const PropertyAmount = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const [propertyModalIsOpen, setPropertyModalIsOpen] = useState(false);

  const propertyAmountModalToggle = () => {
    setPropertyModalIsOpen(!propertyModalIsOpen);
  };

  return (
    <>
      {propertyModalIsOpen && (
        <PropertyAmountModal
          open={propertyModalIsOpen}
          onClose={() => setPropertyModalIsOpen(!propertyModalIsOpen)}
        ></PropertyAmountModal>
      )}

      <Grid item className={props.className}>
        <Link
          tooltipPlacement="right"
          // title="دارایی شما"
          onClick={propertyAmountModalToggle}
        >
          <Grid container className={classes.propertyAmount}>
            <Grid item>
              <Grid
                container
                className={classes.propertyAmountTitle}
                spacing={3}
              >
                <Grid item>
                  <WalletIcon className={classes.walletIcon}></WalletIcon>
                </Grid>
                <Grid item>قدرت خرید</Grid>
              </Grid>
            </Grid>
            <Grid item>
              {comma(props.accountState ? props.accountState.BuyCeiling : 0)}{" "}
              ریال
            </Grid>
          </Grid>
        </Link>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    accountState: state.tseOms.accountState,
  };
};

export default connect(mapStateToProps, null)(PropertyAmount);
