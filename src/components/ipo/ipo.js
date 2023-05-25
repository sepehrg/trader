import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IpoModal from "./ipoModal/ipoModal";
import CmdTseService from "../../services/cmdTseService";
import { connect } from "react-redux";
import Button from "../UI/Button/Button";
import Spinner from "../UI/spinner/spinner";

const useStyles = makeStyles((theme) => ({
  ipoBtn: {
    minWidth: 78,
    color: theme.palette.color.yellow,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.color.yellow}`,
    padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
    borderRadius: 7,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: theme.palette.background.box,
      boxShadow: "none",
    },
  },
  spinner: {
    color: theme.palette.color.yellow,
  },
}));

const Ipo = (props) => {
  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [underWriting, setUnderWriting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingIpo, setLoadingIpo] = useState(false);
  const [instruments, setInstruments] = useState([]);

  const ipoModalToggle = (type) => {
    setInstruments([]);
    setUnderWriting(type);
    getInstruments(type);
    setModalIsOpen(!modalIsOpen);
  };

  const getInstruments = async (type) => {
    type ? setLoading(true) : setLoadingIpo(true);
    const instruments = await props.ipoInstruments
      .filter((i) => i.IsUnderWriting === type)
      .reduce(async (result, i) => {
        const response = await CmdTseService.getStockInfoAsync(i.Isin);
        result.push(response.Result);
        return result;
      }, []);
    setInstruments(instruments);
    type ? setLoading(false) : setLoadingIpo(false);
  };

  return (
    <>
      {modalIsOpen && (
        <IpoModal
          open={true}
          underWriting={underWriting}
          instruments={instruments}
          onClose={() => setModalIsOpen(!modalIsOpen)}
        ></IpoModal>
      )}
      <Grid item>
        <Grid container spacing={4}>
          {props.ipoInstruments.some((i) => i.IsUnderWriting) && (
            <Grid item>
              <Button
                onClick={() => ipoModalToggle(true)}
                className={classes.ipoBtn}
              >
                {!loading ? (
                  "پذیره‌نویسی"
                ) : (
                  <Spinner size={19} className={classes.spinner} />
                )}
              </Button>
            </Grid>
          )}
          {props.ipoInstruments.some((i) => !i.IsUnderWriting) && (
            <Grid item>
              <Button
                onClick={() => ipoModalToggle(false)}
                className={classes.ipoBtn}
              >
                {!loadingIpo ? (
                  "عرضه اولیه"
                ) : (
                  <Spinner size={19} className={classes.spinner} />
                )}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ipoInstruments: state.tseOms.ipoInstruments,
  };
};

export default React.memo(connect(mapStateToProps)(Ipo));
