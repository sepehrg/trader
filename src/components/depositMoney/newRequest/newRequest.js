import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "../../UI/dialog/dialog";
import Grid from "@material-ui/core/Grid";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import DropDownList from "../../UI/DropDownList/DropDownList";
import TseBofService from "../../../services/tseBofService";
import DatePicker from "../../UI/DatePicker/DatePicker";
import Link from "../../UI/Link/Link";
import UploadIcon from "../../UI/icons/upload";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";
import AcceptIcon from "../../UI/icons/accept";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    flexDirection: "column",
  },
  inputLabel: {
    transform: "translate(-14px, 8px) scale(1)",
  },
  upload: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.primary}`,
    borderRadius: 4,
    height: "100%",
    position: "relative",
    maxHeight: 200,
  },
  uploadBtn: {
    position: "absolute",
    top: "30%",
    width: "100%",
    color: theme.palette.text.secondary,
    fontSize: 11,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uploadIcon: {
    fill: theme.palette.border.primary,
    height: 60,
    width: 60,
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
  },
  actionBtn: {
    minWidth: 130,
  },
  image: {
    width: "100%",
    height: "calc(100% - 1px)",
    objectFit: "cover",
  },

  actionMobile: {
    flexDirection: "column",
  },
  actionBtnMobile: {
    width: "100%",
    fontSize: 14,
    height: 40,
    color: "#FFF",
    border: "none",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  acceptBtnMobile: {
    backgroundColor: theme.palette.color.blue,
    "&:hover": {
      backgroundColor: theme.palette.color.blue,
    },
  },
  cancelBtnMobile: {
    backgroundColor: theme.palette.color.red,
    "&:hover": {
      backgroundColor: theme.palette.color.red,
    },
  },
  uploadIconMobile: {
    height: 38,
    width: 38,
    fill: "#FFF",
    marginLeft: 10,
  },
  uploadedBtnMobile: {
    backgroundColor: theme.palette.color.green,
  },
  receiptPicRequired: {
    borderColor: theme.palette.color.red,
  },
}));

const NewRequest = (props) => {
  const classes = useStyles();
  const device = useDevice();
  const inputFile = useRef(null);
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const [brokerBankAccounts, setBrokerBankAccounts] = useState(null);
  const [billPicture, setBillPicture] = useState("");

  useEffect(() => {
    getBrokerBankAccountInfos();
  }, []);

  const getBrokerBankAccountInfos = () => {
    TseBofService.getBrokerBankAccountInfos((status, data) => {
      if (data.length > 0) {
        const options = data.map((i) => ({
          BankId: i.BankId,
          BankTitle: i.BankTitle + " " + i.AccountNumber,
        }));
        setBrokerBankAccounts(options);
      }
    });
  };

  useEffect(() => {
    if (brokerBankAccounts)
      setValue("bankAccountId", brokerBankAccounts[0].BankId);
  }, [brokerBankAccounts]);

  const submitHandler = (formData) => {
    formData.amount = formatInt(formData.amount);
    formData.receiptPic = formData.receiptPic.split(",")[1];
    TseBofService.addDepositMoney(formData, (status, data) => {
      if (data?.Success) props.onClose();
    });
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      setBillPicture(e.target.result);
      setValue("receiptPic", e.target.result);
    };
  };

  const formatInt = (value) => {
    if (typeof value === "number") return value;
    if (value) return parseInt(value.replaceAll(",", ""));
    return null;
  };

  const fromContent = (
    <Grid container spacing={device.isNotMobile ? 8 : 4}>
      <Grid item xs={12}>
        <Input
          ref={register({ required: true })}
          name="amount"
          label="مبلغ"
          error={!!errors.amount}
          helperText="مبلغ الزامی است"
          thousandSeparator
        ></Input>
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          rules={{ required: true }}
          name="bankAccountId"
          render={(props) => (
            <DropDownList
              label="حساب بانکی"
              textField="BankTitle"
              valueField="BankId"
              options={brokerBankAccounts}
              value={props.value || ""}
              inputLabelOutlined={classes.inputLabel}
            />
          )}
        ></Controller>
      </Grid>
      <Grid item xs={device.isNotMobile ? 12 : 6}>
        <Input
          ref={register({ required: true })}
          name="receiptNumber"
          label="شماره فیش"
          error={!!errors.receiptNumber}
          helperText="شماره فیش الزامی است"
        ></Input>
      </Grid>
      <Grid item xs={device.isNotMobile ? 12 : 6}>
        <Controller
          control={control}
          name="depositDate"
          defaultValue={new Date()}
          as={<DatePicker label="تاریخ فیش" />}
        ></Controller>
      </Grid>
    </Grid>
  );

  const descriptionForm = (
    <Grid item xs={12}>
      <Input ref={register} name="description" label="توضیحات"></Input>
    </Grid>
  );

  const uploadForm = (
    <Link
      // tooltipPlacement=""
      // title=""
      onClick={() => inputFile.current.click()}
      className={clsx(
        device.isNotMobile && classes.upload,
        !!errors.receiptPic && classes.receiptPicRequired
      )}
    >
      {billPicture && device.isNotMobile && (
        <img src={billPicture} className={classes.image} />
      )}
      <Controller
        control={control}
        name="receiptPic"
        rules={{ required: true }}
        render={(props) => (
          <Input
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={fileChangeHandler}
            helperText="تصویر فیش واریزی الزامی است"
          ></Input>
        )}
      ></Controller>

      {device.isNotMobile ? (
        !billPicture && (
          <div className={clsx(classes.uploadBtn)}>
            <UploadIcon className={classes.uploadIcon} />
            بارگزاری تصویر فیش واریزی
          </div>
        )
      ) : (
        <div
          className={clsx(
            classes.actionBtnMobile,
            !billPicture ? classes.acceptBtnMobile : classes.uploadedBtnMobile
          )}
        >
          {!billPicture ? (
            <>
              <UploadIcon className={classes.uploadIconMobile} />
              بارگزاری تصویر فیش واریزی
            </>
          ) : (
            <>
              <AcceptIcon className={classes.uploadIconMobile} />
              تصویر انتخاب شد
            </>
          )}
        </div>
      )}
    </Link>
  );

  return (
    <Dialog
      title="واریز جدید"
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container className={classes.root} spacing={6}>
          {device.isNotMobile ? (
            <>
              <Grid item>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid item xs={6}>
                        {fromContent}
                      </Grid>
                      <Grid item xs={6}>
                        {uploadForm}
                      </Grid>
                    </Grid>
                  </Grid>
                  {descriptionForm}
                </Grid>
              </Grid>
              <Grid item className={classes.action}>
                <Button
                  type="submit"
                  variant="outlined"
                  className={classes.actionBtn}
                >
                  ارسال
                </Button>
              </Grid>
            </>
          ) : (
            <>
              {fromContent}
              {descriptionForm}
              <Grid item>
                <Grid container className={classes.actionMobile} spacing={4}>
                  <Grid item>{uploadForm}</Grid>
                  <Grid item>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                        <Button
                          type="submit"
                          variant="outlined"
                          className={clsx(
                            classes.actionBtnMobile,
                            classes.acceptBtnMobile
                          )}
                        >
                          ارسال
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          type="submit"
                          variant="outlined"
                          className={clsx(
                            classes.actionBtnMobile,
                            classes.cancelBtnMobile
                          )}
                        >
                          انصراف
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Dialog>
  );
};

export default NewRequest;
