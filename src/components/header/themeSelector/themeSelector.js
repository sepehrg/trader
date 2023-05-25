// import React, { useState } from "react";
// import { connect } from "react-redux";
// import Button from "@material-ui/core/Button";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import { makeStyles, useTheme, ThemeProvider } from "@material-ui/core/styles";
// import * as actions from "../../../store/actions/index";
// import { themes } from "../../../themes/base";
// import Switch from "@material-ui/core/Switch";
// import { lightTheme } from "../../../themes/light";
// import MoonIcon from "../../UI/icons/moon";
// import SunIcon from "../../UI/icons/sun";
// import MessageIcon from "../../UI/icons/message";
// import WalletIcon from "../../UI/icons/wallet";
// import Link from "../../UI/Link/Link";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
//   popper: {
//     zIndex: "100",
//   },
//   switchBase: {
//     color: theme.palette.text.primary,
//     "&$checked": {
//       color: theme.palette.text.primary,
//     },
//     "&$checked + $track": {
//       backgroundColor: theme.palette.text.secondary,
//     },
//   },
//   checked: {},
//   track: {},
//   rootSwitch: {},

//   switchIcon: {
//     fill: theme.palette.background.paper,
//     backgroundColor: theme.palette.text.primary,
//     borderRadius: 50,
//     padding: theme.spacing(1.5),
//     width: 20,
//     height: 20,
//   },
//   headerIcon: {
//     padding: `0 ${theme.spacing(6)}px`,
//     "&:hover $icon": {
//       stroke: theme.palette.primary.main,
//     },
//   },
//   icon: {},
// }));

// const ThemeSelector = (props) => {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const theme = { ...useTheme() };

//   const [switchTheme, setSwitchTheme] = useState(true);

//   const handleChange = () => {
//     // setSwitchTheme({
//     //   ...switchTheme,
//     //   [event.target.name]: event.target.checked,
//     // });
//     // event.target.checked
//     //   ? props.onThemeChange(themes[0].name)
//     //   : props.onThemeChange(themes[1].name);
//     // event.target.checked ? console.log(1) : console.log(0);
//     switchTheme
//       ? props.onThemeChange(themes[0].name)
//       : props.onThemeChange(themes[1].name);
//     setSwitchTheme(!switchTheme);
//     console.log(switchTheme);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

//   const onMenuItemSelect = (item) => {
//     props.onThemeChange(item);
//     setOpen(false);
//   };

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <div className={classes.root}>
//       <div>
//         {/* <Button
//           ref={anchorRef}
//           aria-controls={open ? "menu-list-grow" : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//         >
//           Theme
//         </Button>
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           transition
//           disablePortal
//           className={classes.popper}
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === "bottom" ? "center top" : "center bottom",
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList
//                     autoFocusItem={open}
//                     id="menu-list-grow"
//                     onKeyDown={handleListKeyDown}
//                   >
//                     {themes.map((theme) => {
//                       return (
//                         <MenuItem
//                           key={theme.name}
//                           onClick={() => onMenuItemSelect(theme.name)}
//                         >
//                           {theme.persianTitle}
//                         </MenuItem>
//                       );
//                     })}
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper> */}

//         {/* <Switch
//           checked={switchTheme.checked}
//           onChange={handleChange}
//           checkedIcon={<MoonIcon className={classes.switchIcon} />}
//           icon={<SunIcon className={classes.switchIcon} />}
//           classes={{
//             root: classes.rootSwitch,
//             switchBase: classes.switchBase,
//             thumb: classes.thumb,
//             track: classes.track,
//             checked: classes.checked,
//           }}
//         /> */}
//         <ThemeProvider theme={theme}>
//           <Link
//             tooltipPlacement="bottom"
//             title={theme.palette.type == "dark" ? "قالب روشن" : "قالب تیره"}
//             onClick={() => handleChange()}
//             className={classes.headerIcon}
//           >
//             {theme.palette.type == "dark" ? (
//               <SunIcon className={classes.icon}></SunIcon>
//             ) : (
//               <MoonIcon className={classes.icon}></MoonIcon>
//             )}
//           </Link>
//         </ThemeProvider>
//       </div>
//     </div>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onThemeChange: (themeName) => dispatch(actions.changeTheme(themeName)),
//   };
// };

// export default connect(null, mapDispatchToProps)(ThemeSelector);
