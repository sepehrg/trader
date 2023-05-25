// import React, { useState, useLayoutEffect, useRef } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { connect } from "react-redux";
// import Grid from "@material-ui/core/Grid";
// import Modal from "../../UI/modal/modal";
// import { themes } from "../../../themes/base";
// import * as actions from "../../../store/actions/index";
// import AcceptIcon from "../../UI/icons/accept";
// import clsx from "clsx";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     borderRadius: "5px",
//     backgroundColor: theme.palette.background.box,
//     height: "100%",
//     justifyContent: "center",
//     flexDirection: "column",
//     padding: `${theme.spacing(8)}px ${theme.spacing(5)}px`,
//   },
//   circle: {
//     width: 31,
//     height: 21,
//     marginLeft: `${theme.spacing(4)}px`,
//     border: `2px solid ${theme.palette.border.primary}`,
//     // backgroundColor: "#15181F",
//     borderRadius: 50,
//   },
//   themeBtn: {
//     padding: `${theme.spacing(3)}px ${theme.spacing(8)}px`,
//     fontSize: 13,
//     margin: theme.spacing(2),
//     cursor: "pointer",
//     alignItems: "center",
//     transition: "0.3s",
//     borderRadius: 7,
//     "&:hover": {
//       backgroundColor: theme.palette.background.paper,
//     },
//   },
//   color: {
//     width: 40,
//     height: 40,
//     cursor: "pointer",
//   },
//   colorPalette: {
//     justifyContent: "space-around",
//     backgroundColor: theme.palette.background.paper,
//     padding: 10,
//   },
//   selected: {
//     border: `1px solid ${theme.palette.primary.main}`,
//   },
//   selectedPrimary: {
//     stroke: "#212121",
//     paddingTop: 8,
//     height: 30,
//   },
// }));

// const ThemeModal = (props) => {
//   const classes = useStyles();

//   const [themeName, setThemeName] = useState(props.themeName);
//   const [mainColor, setMainColor] = useState(props.customTheme);

//   const firstUpdate = useRef(true);
//   useLayoutEffect(() => {
//     if (firstUpdate.current) {
//       firstUpdate.current = false;
//       return;
//     }
//     props.onThemeChange(themeName, mainColor);
//   }, [themeName, mainColor]);

//   const mainColors = [
//     {
//       primary: { main: "#E91E63" },
//     },
//     {
//       primary: { main: "#2196F3" },
//     },
//     {
//       primary: { main: "#4CAF50" },
//     },
//     {
//       primary: { main: "#FFC107" },
//     },
//   ];

//   return (
//     <Modal
//       open={props.open}
//       onClose={props.onClose}
//       width={600}
//       hideMinimize
//       title="تغییر رنگ قالب"
//     >
//       <Grid container className={classes.root}>
//         <Grid item container>
//           {themes.map((theme) => {
//             return (
//               <Grid
//                 item
//                 key={theme.name}
//                 onClick={() => setThemeName(theme.name)}
//               >
//                 <Grid
//                   container
//                   item
//                   className={clsx(
//                     classes.themeBtn,
//                     props.themeName === theme.name && classes.selected
//                   )}
//                 >
//                   <div
//                     className={classes.circle}
//                     style={{ backgroundColor: `${theme.color}` }}
//                   ></div>
//                   {theme.persianTitle}
//                 </Grid>
//               </Grid>
//             );
//           })}
//         </Grid>

//         <Grid item>
//           <Grid container className={classes.colorPalette}>
//             <Grid item>
//               <Grid container>
//                 <Grid item>رنگ اصلی</Grid>
//               </Grid>
//               <Grid container>
//                 {mainColors.map((item) => (
//                   <Grid
//                     item
//                     key={item.primary.main}
//                     className={classes.color}
//                     style={{ backgroundColor: item.primary.main }}
//                     onClick={() => setMainColor(item)}
//                   >
//                     {props.customTheme &&
//                       props.customTheme.primary.main === item.primary.main && (
//                         <AcceptIcon className={classes.selectedPrimary} />
//                       )}
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Modal>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     themeName: state.app.themeName,
//     customTheme: state.app.customTheme,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onThemeChange: (themeName, mainColor) =>
//       dispatch(actions.changeTheme(themeName, mainColor)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ThemeModal);
