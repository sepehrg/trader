import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "../../UI/Link/Link";
import EyeIcon from "../../UI/icons/eye";
import HideIcon from "../../UI/icons/hide";
import useDevice from "../../../hooks/useDevice";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  adornment: {
    width: 23,
    margin: 10,
    strokeWidth: "32",
    cursor: "pointer",
    "&:hover": {
      fill: theme.palette.primary.main,
    },
  },
  adornmentMainMobile: {
    backgroundColor: `${theme.palette.icon.primary}77`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
    height: 48,
    width: 48,
  },
  adornmentMobile: {
    fill: "#FFF",
  },
}));

const PasswordAdornment = (props) => {
  const classes = useStyles();
  const device = useDevice();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Link
      onClick={(e) => {
        setShowPassword(!showPassword);
        props.onClick(!showPassword);
      }}
      className={clsx(device.isMobile && classes.adornmentMainMobile)}
    >
      {showPassword ? (
        <HideIcon
          className={clsx(
            classes.adornment,
            device.isMobile && classes.adornmentMobile
          )}
        ></HideIcon>
      ) : (
        <EyeIcon
          className={clsx(
            classes.adornment,
            device.isMobile && classes.adornmentMobile
          )}
        ></EyeIcon>
      )}
    </Link>
  );
};

export default PasswordAdornment;
