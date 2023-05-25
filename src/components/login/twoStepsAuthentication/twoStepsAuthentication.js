// import React, { useState, useEffect, useRef } from "react";
// import Button from "../../UI/Button/Button";
// import Input from "../../UI/Input/Input";
// import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
// import Link from "../../UI/Link/Link";
// import clsx from "clsx";
// import { connect } from "react-redux";
// import * as actions from "../../../store/actions/index";
// import Captcha from "../../UI/captcha/captcha";
// import withWidth from "@material-ui/core/withWidth";
// import Fade from "@material-ui/core/Fade";
// import PageTitle from "../pageTitle/pageTitle";
// import ReloadIcon from "../../UI/icons/reload";
// import ArrowIcon from "../../UI/icons/arrow";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexDirection: "column",
//     height: "100%",
//     position: "relative",
//   },
//   mainTitle: {
//     // height: 180,
//     // display: "flex",
//     // alignItems: "flex-end",
//     textAlign: "center",
//     paddingTop: 30,
//   },
//   mainContent: {
//     // display: "flex",
//     flex: 1,
//     // alignItems: "center",
//     // justifyContent: "center",
//     flexDirection: "column",
//     alignItems: "center",
//     height: "calc(100% - 180px)",
//     justifyContent: "space-around",
//     paddingTop: 20,
//   },
//   mainContentInner: {
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loginForm: {
//     width: 360,
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     maxWidth: 450,
//     margin: "auto",
//   },
//   textField: {
//     marginTop: 26,
//     width: "100%",
//   },
//   inputClassName: {
//     height: 48,
//   },
//   loginAdornment: {
//     position: "absolute",
//     left: 0,
//   },
//   adornment: {
//     width: 23,
//     marginLeft: 10,
//     strokeWidth: "32",
//     cursor: "pointer",
//     "&:hover": {
//       fill: theme.palette.primary.main,
//     },
//   },
//   captcha: {
//     width: "100%",
//   },
//   captchaCode: {
//     justifyContent: "center",
//     // margin: "10px 0px",
//     marginTop: 14,
//     minHeight: 60,
//   },
//   captchaImage: {
//     borderRadius: 10,
//     verticalAlign: "middle",
//   },
//   submitBtn: {
//     width: "100%",
//     backgroundColor: "#03B448",
//     color: "#fff",
//     boxShadow: "none",
//     height: 42,
//     marginTop: 24,
//     "&:hover": {
//       backgroundColor: "#00a03e",
//       boxShadow: "none",
//     },
//   },
//   explain: {
//     textAlign: "center",
//     fontSize: 11,
//   },
//   textFieldKeyboard: {
//     position: "relative",
//   },
//   virtualKeyboard: {
//     position: "absolute",
//     zIndex: 2,
//     direction: "ltr",
//     right: 0,
//     top: "110%",
//     height: 230,
//     overflow: "hidden",
//     transition: "0.3s",
//     width: "100%",
//   },
//   virtualKeyboardToggle: {
//     height: 230,
//   },
//   arrowIcon: {
//     transform: "rotate(180deg)",
//     width: 18,
//     height: 18,
//     marginLeft: 5,
//   },
//   back: {
//     fontSize: 11,
//   },
// }));

// const TwoStepsAuthentication = (props) => {
//   const classes = useStyles();
//   const [username, setUsername] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [checked, setChecked] = useState(true);
//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);
//   const [captcha, setCaptcha] = useState(null);

//   const [input, setInput] = useState("");

//   const onChangeUsername = (input) => {
//     setInput(input);
//     setUsername(input);
//   };
//   const onChangeUsernameInput = (event) => {
//     setUsername(event.target.value);
//     setInput(event.target.value);
//   };

//   useEffect(() => {
//     props.setClientId();
//   }, []);

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Grid container className={classes.root}>
//       <Grid item className={classes.back}>
//         <Link onClick={() => props.setSecondForm(false)}>
//           <ArrowIcon className={classes.arrowIcon} />
//           بازگشت
//         </Link>
//       </Grid>
//       <Grid item className={classes.mainTitle}>
//         شناسایی دو عاملی (پیامک)
//       </Grid>
//       <Grid item className={classes.mainContent}>
//         <Grid container className={classes.mainContentInner}>
//           <Grid item className={classes.loginForm}>
//             <Fade
//               in={checked}
//               {...(checked ? { timeout: 1200 } : {})}
//               style={{ transitionDelay: checked ? "100ms" : "0ms" }}
//             >
//               <div className={classes.explain}>
//                 کد پیامک شده را در کادر زیر وارد نمایید
//               </div>
//             </Fade>
//             <form onSubmit={submitHandler} className={classes.form}>
//               <Fade
//                 in={checked}
//                 {...(checked ? { timeout: 1200 } : {})}
//                 style={{ transitionDelay: checked ? "300ms" : "0ms" }}
//               >
//                 <div className={classes.textFieldKeyboard}>
//                   <Input
//                     name="otp"
//                     label="رمز پویا"
//                     ref={usernameRef}
//                     className={classes.textField}
//                     // onChange={(e) => setUsername(e.target.value)}
//                     // error={username === ""}
//                     inputClassName={classes.inputClassName}
//                     value={input}
//                     onChange={(e) => {
//                       onChangeUsernameInput(e);
//                     }}
//                   />
//                 </div>
//               </Fade>
//               <Fade
//                 in={checked}
//                 {...(checked ? { timeout: 1200 } : {})}
//                 style={{ transitionDelay: checked ? "500ms" : "0ms" }}
//               >
//                 <div>
//                   <Grid container>
//                     <Grid item className={classes.captcha}>
//                       <Grid container spacing={4}>
//                         <Grid item sm={5}>
//                           <Input
//                             name="captcha"
//                             label="کد امنیتی"
//                             className={classes.textField}
//                             onChange={(e) => setCaptcha(e.target.value)}
//                             // error={captcha === ""}
//                             inputClassName={classes.inputClassName}
//                             adornment
//                             loginAdornment={classes.loginAdornment}
//                             inputAdornment={
//                               <div>
//                                 <Link onClick={props.setClientId}>
//                                   <ReloadIcon
//                                     className={clsx(
//                                       classes.keyboard,
//                                       classes.adornment
//                                     )}
//                                   ></ReloadIcon>
//                                 </Link>
//                               </div>
//                             }
//                           ></Input>
//                         </Grid>
//                         <Grid item sm={7}>
//                           <Grid container className={classes.captchaCode}>
//                             {props.clientId && (
//                               <Grid item>
//                                 {props.clientId && (
//                                   <Captcha
//                                     clientId={props.clientId}
//                                     // onReload={props.setClientId}
//                                     className={classes.captchaImage}
//                                   ></Captcha>
//                                 )}
//                               </Grid>
//                             )}
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </div>
//               </Fade>
//               <Fade
//                 in={checked}
//                 {...(checked ? { timeout: 1200 } : {})}
//                 style={{ transitionDelay: checked ? "700ms" : "0ms" }}
//               >
//                 <div>
//                   <Button
//                     type="submit"
//                     color="primary"
//                     className={classes.submitBtn}
//                     disabled={loading}
//                     containedBtn={classes.containedBtn}
//                     disabledBtn={classes.disabledBtn}
//                   >
//                     {loading ? "درحال بررسی..." : "ورود"}
//                   </Button>
//                 </div>
//               </Fade>
//             </form>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     clientId: state.account.clientId,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setClientId: () => dispatch(actions.setClientId()),
//     setUser: (user) => dispatch(actions.setUser(user)),
//     notifyError: (message) => dispatch(actions.notifyError(message)),
//   };
// };

// export default withWidth()(
//   connect(mapStateToProps, mapDispatchToProps)(TwoStepsAuthentication)
// );
