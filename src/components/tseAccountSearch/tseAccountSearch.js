import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import style from "../../shared/style";
import Autocomplete from "../UI/autocomplete/autocomplete";
import TseOnlineGroup from "../../services/tseOnlineGroup";
import { comma, coloredPercent } from "../../shared/utility";

const useStyles = makeStyles((theme) => ({
  ...style(theme),
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    flexDirection: "column",
    height: "100%",
    padding: "8px 8px 8px 8px",
  },
  adornment: {
    width: 20,
    height: 20,
    padding: 4,
    borderRadius: 50,
    marginLeft: 7,
    cursor: "pointer",
    backgroundColor: theme.palette.border.primary,
    "&:hover": {
      fill: theme.palette.color.red,
    },
  },
  property: {
    borderRadius: "5px",
    // backgroundColor: theme.palette.background.box,
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    padding: "6px 10px",
  },
  walletItem: {
    justifyContent: "space-between",
    padding: `${theme.spacing(2)}px 0px`,
  },
  currency: {
    cursor: "default",
    transition: "0.3s",
    color: theme.palette.text.primary,
    "&:after": {
      content: '"ریال"',
      fontSize: "10px",
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(2),
    },
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  firstItem: {
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    marginBottom: theme.spacing(2),
  },
  firstCurrency: {
    fontSize: "14px",
    color: theme.palette.text.primary,
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 11,
  },
  search: {
    padding: "5px 7px 0px 7px",
  },
}));

const TseAccountSearch = (props) => {
  const classes = useStyles(props);
  const theme = useTheme();

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [accountState, setAccountState] = useState({});

  useEffect(() => {
    if (inputValue.length > 2) {
      const request = {
        optionalFilter: {
          take: 15,
          page: 0,
        },
        reportFilter: {
          searchItem: [{ property: "IdentityTitle", value: inputValue }],
        },
      };
      TseOnlineGroup.getTseAccountInfos(request, (status, data) => {
        setOptions(data);
      });
    } else setOptions([]);
  }, [inputValue]);

  const customerChangeHandler = (value) => {
    // console.log(value);
    getIdentityAccountStatus(value.IdentityId);
    props.onAccountNumberChange(value.AccountNumber);
  };

  const customerInputChangeHandler = (value) => {
    setInputValue(value);
    if (!value) {
      props.onAccountNumberChange(null);
    }
  };

  const getIdentityAccountStatus = (id) => {
    TseOnlineGroup.getIdentityAccountStatus(id, (status, data) => {
      setAccountState(data.Result);
    });
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.search}>
        <Autocomplete
          getOptionLabel="IdentityTitle"
          placeholder="جستجوی مشتری"
          options={options}
          inputValue={inputValue}
          autoHighlight
          onChange={customerChangeHandler}
          onInputChange={customerInputChangeHandler}
          renderOption={(option) => (
            <React.Fragment>
              {option.IdentityTitle} - {option.AccountCode} -{" "}
              {option.NationalCode}
            </React.Fragment>
          )}
          label={props.label}
          inputLabelClassName={classes.instrumentLabel}
        />
      </Grid>
      <Grid item>
        <Grid container className={classes.property}>
          <Grid item>
            <Grid
              container
              className={`${classes.walletItem} ${classes.firstItem}`}
            >
              <Grid item className={classes.title}>
                قدرت خرید
              </Grid>
              <Grid
                item
                className={`${classes.currency} ${classes.firstCurrency}`}
              >
                {coloredPercent(accountState?.BuyCeiling, theme, false, false)}
              </Grid>
            </Grid>
            <Grid container className={classes.walletItem}>
              <Grid item className={classes.title}>
                مانده حساب
              </Grid>
              <Grid item className={classes.currency}>
                {coloredPercent(
                  accountState?.AccountRemaining,
                  theme,
                  false,
                  false
                )}
              </Grid>
            </Grid>
            <Grid container className={classes.walletItem}>
              <Grid item className={classes.title}>
                مانده اعتبار
              </Grid>
              <Grid item className={classes.currency}>
                {comma(accountState?.CreditRemaining)}
              </Grid>
            </Grid>
            <Grid container className={classes.walletItem}>
              <Grid item className={classes.title}>
                بلوکه شده
              </Grid>
              <Grid item className={classes.currency}>
                {comma(accountState?.BlockedAmount)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    instrument: state.app.instrument,
    marketDepth: state.app.marketDepth,
    marketDepthUpdate: state.app.marketDepthUpdate,
    accountState: state.tseOms.accountState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(actions.mkdPusherAuthenticate()),
    logout: () => dispatch(actions.mkdPusherLogout()),
    subscribe: (isin) => dispatch(actions.mkdPusherSubscribe(isin)),
    unsubscribe: (isin) => dispatch(actions.mkdPusherUnsubscribe(isin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TseAccountSearch);
