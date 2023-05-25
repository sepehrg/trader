import React, { useContext, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "../../components/header/header";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../services/appContext";
import SejamService from "../../services/sejamService";
import stepLevel from "../../enums/step";
import Input from "../../components/UI/Input/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SubmitBoxWizard from "./submitBoxWizard/submitBoxWizard";
import regionType from "../../enums/regionType";
import getRegionByType, { getRegionById } from "../../services/region";
import DropDownList from "../../components/UI/DropDownList/DropDownList";
import * as actions from "../../store/actions/index";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // marginRight: theme.spacing(45),
    height: "100%",
  },

  header: {
    width: "100%",

    height: "100%",
  },

  textField: {
    // backgroundColor: "#fff",
    // marginTop: theme.spacing(13),
    // width: "100%",
  },
  inputClassName: {
    height: 46,
  },
  Section: {
    marginTop: theme.spacing(12),
  },
  title: {
    textAlign: "center",
  },
  main: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
    width: "100%",
  },
  header: {
    width: "100%",
    margin: 20,
    fontSize: 14,
  },
  form: {
    padding: "20px 30px",
  },
  selectMenu: {
    paddingTop: 17,
    paddingBottom: 10,
  },
  telCode: {
    order: 2,
  },
}));

const AddressInfo = (props) => {
  const classes = useStyles();
  const emergencyCountryPrefix = "98";
  const [state, dispatch] = useContext(AppContext);
  const [id, setId] = useState(0);
  const [countryData, setCountryData] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [provinceData, setProvinceData] = useState([]);
  const [provinceId, setProvinceId] = useState(0);
  const [cityData, setCityData] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [sectionData, setSectionData] = useState([]);
  const [sectionId, setSectionId] = useState(0);
  const [address, setAddress] = useState(null);
  const [alley, setAlley] = useState(null);
  const [plaque, setPlaque] = useState(null);
  const [webSite, setWebSite] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [cityPrefix, setCityPrefix] = useState(null);
  const [emergencyTelephone, setEmergencyTelephone] = useState(null);
  const [emergencyCityPrefix, setEmergencyCityPrefix] = useState(null);
  const [emergencyMobile, setEmergencyMobile] = useState(null);
  const [fax, setFax] = useState(null);
  const [faxPrefix, setFaxPrefix] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [notValidPostalCode, setNotValidPostalCode] = useState(false);
  const [showErrorBox, setShowErrorBox] = useState(false);
  const [notValidEmail, setNotValidEmail] = useState(false);
  const [notValidMobile, setNotValidMobile] = useState(false);
  const [notValidTelephone, setNotValidTelephone] = useState(false);
  const [notValidWwebsite, setNotValidwebsite] = useState(false);
  const [notValidAlley, setNotValidAlley] = useState(false);
  const [notValidAddress, setNotValidAddress] = useState(false);

  const [notValidPrefixTelephone, setNotValidPrefixTelephone] = useState(false);
  const [notValidEmergencyTelephone, setNotValidEmergencyTelephone] =
    useState(false);
  const [notValidEmergencyCityPrefix, setNotValidEmergencyCityPrefix] =
    useState(false);

  const unknownError = "خطایی رخ داده است";
  function just_persian(str) {
    var p =
      /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u06F0-\u06F9\u202C\u064B\u064C\u064E-\u0652\u0600-\u06FF\u0020\u2000-\u200F\u2028-\u202F\d+\d+-\d\d+-\d+s]+$/;

    if (!p.test(str)) {
      return false;
    }
  }

  const checkValidation = () => {
    setNotValidPostalCode(false);
    setShowErrorBox(false);
    setNotValidEmail(false);
    setNotValidMobile(false);
    setNotValidTelephone(false);
    setNotValidwebsite(false);
    setNotValidAlley(false);
    setNotValidAddress(false);
    setNotValidPrefixTelephone(false);
    setNotValidEmergencyCityPrefix(false);

    setNotValidEmergencyTelephone(false);
    if (
      !provinceId ||
      !cityId ||
      !address ||
      !alley ||
      !plaque ||
      !email ||
      !telephone ||
      !postalCode ||
      !cityPrefix
    ) {
      setShowErrorBox(true);
      return true;
    }

    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setNotValidEmail(true);
      setShowErrorBox(true);
      return true;
    }
    function isUrlValid(userInput) {
      var res = userInput.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      if (res == null) return false;
      else return true;
    }

    if (webSite && isUrlValid(webSite) == false) {
      setShowErrorBox(true);
      setNotValidwebsite(true);
      return true;
    }
    if (alley && just_persian(alley) == false) {
      setShowErrorBox(true);
      setNotValidAlley(true);
      return true;
    }
    if (address && just_persian(address) == false) {
      setShowErrorBox(true);
      setNotValidAddress(true);
      return true;
    }
    if (
      (emergencyMobile && emergencyMobile.length != 11) ||
      !emergencyMobile.startsWith("09")
    ) {
      setNotValidMobile(true);
      return true;
    }
    if (postalCode.toString().length != 10) {
      setShowErrorBox(true);
      setNotValidPostalCode(true);
      return true;
    }
    // var telephonelength = telephone.length + cityPrefix.length;
    // if (telephonelength != 11 || !cityPrefix.startsWith("0")) {
    //   setNotValidTelephone(true);
    //   setShowErrorBox(true);
    //   return true;
    // }
    // var emergencyTele = emergencyTelephone.length;
    // if (emergencyTelephone !=="" &&  emergencyTele != 8 ) {
    //   setNotValidEmergencyTelephone(true);
    //   setShowErrorBox(true);
    //   return true;
    // }
    var telephonelength = telephone.length;
    if (telephonelength != 8) {
      setNotValidTelephone(true);
      setShowErrorBox(true);
      return true;
    }

    var companyCityPrefixlength = cityPrefix.length;
    if (companyCityPrefixlength != 3 || !cityPrefix.startsWith("0")) {
      setNotValidPrefixTelephone(true);
      setShowErrorBox(true);
      return true;
    }
    // var companyEmergencyCityPrefixlength = emergencyCityPrefix.length;
    // if (emergencyTelephone !=="" && emergencyCityPrefix  !=="" && (companyEmergencyCityPrefixlength != 3 || !emergencyCityPrefix.startsWith("0"))) {
    //   setNotValidEmergencyCityPrefix(true);
    //   setShowErrorBox(true);
    //   return true;
    // }
    return false;
  };
  // console.log("emergencyCityPrefix", emergencyCityPrefix);
  // console.log("emergencyTelephone", emergencyTelephone);

  const addOrUpdateAddressInfo = async (params) => {
    let resultData = false;
    if (params.Id) {
      await SejamService.updateAddressInfo(params, (success, result) => {
        if (result && result.Success) {
          //sertResult(result.Success);
          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    } else {
      await SejamService.saveAddressInfo(params, (success, result) => {
        if (result && result.Success) {
          //sertResult(result.Success);

          resultData = result.Success;
        } else {
          props.handleError(
            result && result.Message ? result.Message : unknownError
          );
        }
      });
    }
    if (resultData) {
      window.location.pathname = stepLevel.job.url;
    }
  };
  const saveAddressInfoStep = async (e) => {
    e.preventDefault();

    if (checkValidation()) {
      return;
    }

    dispatch({
      type: "isLoding",
      payload: true,
    });
    var web = webSite == "" ? null : webSite;
    var web = webSite == "" ? null : webSite;
    var web = webSite == "" ? null : webSite;

    var paramsData = {
      Id: id,
      ProvinceId: provinceId * 1,
      CityId: cityId * 1,
      SectionId: sectionId == 0 ? null : sectionId,
      RemnantAddress: address,
      Alley: alley,
      Plaque: plaque,
      WebSite: webSite == "" ? null : webSite,
      Email: email,
      Telephone: telephone,
      CityPrefix: cityPrefix,
      EmergencyTelephone: emergencyTelephone == "" ? null : emergencyTelephone,
      EmergencyCityPrefix:
        emergencyCityPrefix == "" ? null : emergencyCityPrefix,
      EmergencyMobile: emergencyMobile.substring(1, emergencyMobile.length),
      EmergencyCountryPrefix: emergencyCountryPrefix,
      Fax: fax == "" ? null : fax,
      FaxPrefix: faxPrefix == "" ? null : faxPrefix,
      PostalCode: postalCode * 1,
      CountryId: countryId,
    };

    dispatch({
      type: "userSavedStepData",
      payload: { ...state.userSavedStepData, Address: paramsData },
    });

    await addOrUpdateAddressInfo(paramsData);
    dispatch({
      type: "isLoding",
      payload: false,
    });
  };
  const getRegionByParentId = async (parentId, regionSelectedType) => {
    var regionData = await getRegionByType(
      state,
      dispatch,
      parentId,
      regionSelectedType
    );

    switch (regionSelectedType.EnTitle) {
      case regionType.Country.EnTitle:
        // console.log("regionData", regionData);
        setCountryData(regionData);
        return;
      case regionType.Province.EnTitle:
        setProvinceData(regionData);

        if (regionData && regionData.length > 1) {
          setProvinceId(regionData[0].Id);
        }
        return;
      case regionType.City.EnTitle:
        setCityData(regionData);
        if (regionData && regionData.length > 1) {
          setCityId(regionData[0].Id);
        }
        return;
      case regionType.Section.EnTitle:
        setSectionData(regionData);
        if (regionData && regionData.length > 1) {
          setSectionId(regionData[0].Id);
        }
        return;
    }
  };
  useEffect(() => {
    var addressData = {};
    var province = {};
    var country = {};

    async function fetchData() {
      dispatch({
        type: "isLoding",
        payload: true,
      });

      if (
        state.userSavedStepData.Address &&
        state.userSavedStepData.Address.Id
      ) {
        addressData = state.userSavedStepData.Address;
      } else {
        await SejamService.getAddressInfo((status, data) => {
          addressData = data.Result;
        });
      }

      dispatch({
        type: "isLoding",
        payload: false,
      });

      await getRegionByParentId(1, regionType.Country);

      // await getRegionById(state.user.access_token, addressData.ProvinceId).then(async (item) => {
      //   province = item;
      //   if (item && item.ParentId) {
      //     country = await getRegionById(state.user.access_token, item.ParentId);
      //   }
      // });

      if (addressData) {
        await getRegionByParentId(addressData.CityId, regionType.Section);
        await getRegionByParentId(addressData.ProvinceId, regionType.City);
        await getRegionById(addressData.ProvinceId).then(async (item) => {
          province = item;

          if (item && item.ParentId) {
            country = await getRegionById(item.ParentId);
            await getRegionByParentId(item.ParentId, regionType.Province);
          }
        });
      } else {
        await getRegionById(2).then(async (item) => {
          province = item;
          if (item && item.ParentId) {
            //getRegionByParentId(province.ParentId, regionType.Province);

            country = await getRegionById(item.ParentId);
            await getRegionByParentId(item.ParentId, regionType.Province);
          }
        });
      }
    }

    fetchData().then(() => {
      // console.log("addressData", addressData);
      if (addressData) {
        dispatch({
          type: "userSavedStepData",
          payload: { ...state.userSavedStepData, Address: addressData },
        });

        // getRegionByParentId(province.ParentId, regionType.Province);

        setId(addressData.Id);
        setCountryId(country.Id);
        setProvinceId(addressData.ProvinceId);
        setCityId(addressData.CityId);
        setSectionId(addressData.SectionId);
        setAddress(addressData.RemnantAddress);
        setAlley(addressData.Alley);
        setPlaque(addressData.Plaque);
        setPostalCode(addressData.PostalCode);
        setWebSite(addressData.WebSite);
        setEmail(addressData.Email);
        setTelephone(addressData.Telephone);
        setCityPrefix(addressData.CityPrefix);
        setEmergencyTelephone(addressData.EmergencyTelephone);
        setEmergencyCityPrefix(addressData.EmergencyCityPrefix);
        setEmergencyMobile("0" + addressData.EmergencyMobile);
        setFax(addressData.Fax);
        setFaxPrefix(addressData.FaxPrefix);
      }
    });

    dispatch({
      type: "stepWizard",
      payload: stepLevel.address.id,
    });
  }, []);
  const onChangeCountryHandler = (event) => {
    setCountryId(event.target.value);
    getRegionByParentId(event.target.value, regionType.Province);
  };
  const onChangeProvinceHandler = (event) => {
    setProvinceId(event.target.value);
    getRegionByParentId(event.target.value, regionType.City);
  };
  const onChangeCityHandler = (event) => {
    setCityId(event.target.value);
    getRegionByParentId(event.target.value, regionType.Section);
  };

  // console.log("sectionId", sectionId);
  // console.log("sectionId", sectionData);

  // console.log("cityData", cityData);
  // console.log("cityData", cityId);
  const onChangeAddress = (event) => {
    setAddress(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) == false) {
      checkValidation = true;
    }
    setNotValidAddress(checkValidation);
  };
  const onChangeAlley = (event) => {
    setAlley(event.target.value);
    let value = event.target.value;
    let checkValidation;
    if (just_persian(value) == false) {
      checkValidation = true;
    }
    setNotValidAlley(checkValidation);
  };
  // console.log("pppp", countryData);
  // console.log("pppp", countryId);
  return (
    <Grid container>
      <Grid item className={classes.header}>
        اطلاعات تماس
      </Grid>
      <Grid item className={classes.main}>
        <form>
          <Grid container>
            <Grid item xs={12}>
              {/* <Card className={classes.root}>
                <CardContent> */}
              <Grid container spacing={10} className={classes.form}>
                <Grid item xs={4}>
                  <DropDownList
                    options={countryData}
                    value={countryId}
                    onChange={onChangeCountryHandler}
                    name="Country"
                    label="کشور محل زندگی "
                    textField="Title"
                    valueField="Id"
                    showValidation={!countryId && showErrorBox}
                    selectMenuClassName={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DropDownList
                    options={provinceData}
                    value={provinceId}
                    onChange={onChangeProvinceHandler}
                    name="Province"
                    label="استان محل زندگی "
                    textField="Title"
                    valueField="Id"
                    showValidation={!provinceId && showErrorBox}
                    selectMenuClassName={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DropDownList
                    options={cityData}
                    value={cityId}
                    onChange={onChangeCityHandler}
                    name="City"
                    label="شهر محل زندگی "
                    textField="Title"
                    valueField="Id"
                    showValidation={!cityId && showErrorBox}
                    selectMenu={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DropDownList
                    options={sectionData}
                    value={sectionId}
                    onChange={(e) => setSectionId(e.target.value)}
                    name="Section"
                    label="بخش محل زندگی "
                    textField="Title"
                    valueField="Id"
                    selectMenu={classes.selectMenu}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="Alley"
                    label=" کوچه محل زندگی"
                    className={classes.textField}
                    onChange={onChangeAlley}
                    error={alley === "" || notValidAlley}
                    inputClassName={classes.inputClassName}
                    value={alley}
                    showValidation={(!alley || notValidAlley) && showErrorBox}
                    validation={notValidAlley && "   فقط حروف فارسی مجاز است "}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="Plaque"
                    label="پلاک"
                    className={classes.textField}
                    onChange={(e) => setPlaque(e.target.value)}
                    error={plaque === ""}
                    inputClassName={classes.inputClassName}
                    value={plaque}
                    showValidation={!plaque && showErrorBox}
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="WebSite"
                    label="  وب سایت  "
                    className={classes.textField}
                    onChange={(e) => setWebSite(e.target.value)}
                    error={notValidWwebsite}
                    inputClassName={classes.inputClassName}
                    value={webSite}
                    showValidation={notValidWwebsite && showErrorBox}
                    validation={notValidWwebsite && "  سایت معتیر نیست"}
                  ></Input>
                </Grid>

                <Grid item xs={4}>
                  <Input
                    name="Email"
                    label="پست الکترونیکی "
                    className={classes.textField}
                    onChange={(e) => setEmail(e.target.value)}
                    error={email === "" || notValidEmail}
                    inputClassName={classes.inputClassName}
                    value={email}
                    showValidation={(!email || notValidEmail) && showErrorBox}
                    validation={
                      notValidEmail && "پست الکترونیکی را درست وارد نمایید"
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={3} className={classes.telCode}>
                      <Input
                        name="PrefixTelephone"
                        label="پیش شماره"
                        className={classes.textField}
                        onChange={(e) => setCityPrefix(e.target.value)}
                        error={cityPrefix === "" || notValidPrefixTelephone}
                        inputClassName={classes.inputClassName}
                        value={cityPrefix}
                        type="tel"
                        showValidation={
                          (!cityPrefix || notValidPrefixTelephone) &&
                          showErrorBox
                        }
                        validation={
                          notValidPrefixTelephone && "پیش شماره اشتباه است."
                        }
                      ></Input>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        name="Telephone"
                        label="تلفن"
                        className={classes.textField}
                        onChange={(e) => setTelephone(e.target.value)}
                        error={telephone === "" || notValidTelephone}
                        inputClassName={classes.inputClassName}
                        value={telephone}
                        type="number"
                        showValidation={
                          (!telephone || notValidTelephone) && showErrorBox
                        }
                        validation={
                          notValidTelephone && "شماره تلفن وارد شده اشتباه است."
                        }
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={3} className={classes.telCode}>
                      <Input
                        name="Telephone"
                        label="پیش شماره"
                        className={classes.textField}
                        onChange={(e) => setEmergencyCityPrefix(e.target.value)}
                        //error={emergencyCityPrefix === ""}
                        inputClassName={classes.inputClassName}
                        value={emergencyCityPrefix}
                        type="tel"
                      ></Input>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        name="EmergencyTelephone"
                        label="تلفن ضروری"
                        className={classes.textField}
                        onChange={(e) => setEmergencyTelephone(e.target.value)}
                        // error={emergencyTelephone === ""}
                        inputClassName={classes.inputClassName}
                        value={emergencyTelephone}
                        type="number"
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="EmergencyMobile"
                    label="موبایل ضروری"
                    className={classes.textField}
                    onChange={(e) => setEmergencyMobile(e.target.value)}
                    //error={emergencyMobile === ""}
                    inputClassName={classes.inputClassName}
                    value={emergencyMobile}
                    type="tel"
                    showValidation={notValidMobile}
                    validation={
                      notValidMobile && "شماره موبایل را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="Address"
                    label="آدرس محل زندگی"
                    className={classes.textField}
                    onChange={onChangeAddress}
                    error={address === "" || notValidAddress}
                    inputClassName={classes.inputClassName}
                    value={address}
                    showValidation={
                      (!address || notValidAddress) && showErrorBox
                    }
                    validation={
                      notValidAddress && "   فقط حروف فارسی مجاز است "
                    }
                  ></Input>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={3} className={classes.telCode}>
                      <Input
                        name="Address"
                        label="پیش شماره"
                        className={classes.textField}
                        onChange={(e) => setFaxPrefix(e.target.value)}
                        //   error={faxPrefix === ""}
                        inputClassName={classes.inputClassName}
                        value={faxPrefix}
                      ></Input>
                    </Grid>
                    <Grid item xs={9}>
                      <Input
                        name="Address"
                        label="دورنگار"
                        className={classes.textField}
                        onChange={(e) => setFax(e.target.value)}
                        //  error={fax === ""}
                        inputClassName={classes.inputClassName}
                        value={fax}
                        type="tel"
                      ></Input>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Input
                    name="PostalCode"
                    label="  کدپستی محل زندگی  "
                    className={classes.textField}
                    onChange={(e) => setPostalCode(e.target.value)}
                    error={postalCode === "" || notValidPostalCode}
                    inputClassName={classes.inputClassName}
                    value={postalCode}
                    type="number"
                    showValidation={
                      (!postalCode || notValidPostalCode) && showErrorBox
                    }
                    validation={
                      notValidPostalCode &&
                      "کدپستی محل زندگی را درست وارد نمایید."
                    }
                  ></Input>
                </Grid>
              </Grid>
              {/* <br />
            <br /> */}

              <Grid item xs={12}>
                <SubmitBoxWizard
                  previousWizard="/main/sejam/profile"
                  nextWizard={saveAddressInfoStep}
                />
              </Grid>
              {/* </CardContent>
              </Card> */}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleError: (message) => dispatch(actions.notifyError(message)),
  };
};
const mapStateToProps = () => {
  return {
    handleError: (message) => actions.notifyError(message),
  };
};

export default withWidth()(
  connect(mapStateToProps, mapDispatchToProps)(AddressInfo)
);
