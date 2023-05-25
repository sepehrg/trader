import React, { useState, useRef } from "react";
import CloseIcon from "../../components/UI/icons/close";
import Link from "../../components/UI/Link/Link";
import { makeStyles } from "@material-ui/core/styles";
import widgets from "./widgets";
import clsx from "clsx";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) => ({
  gridItemTitle: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    justifyContent: "space-between",
    height: 22,
  },
  moreBtn: {
    "&:after": {
      content: "''",
      backgroundColor: theme.palette.icon.primary,
      display: "flex",
      margin: "3px auto",
      width: 16,
      height: 1,
      borderRadius: 50,
    },
    "&:before": {
      content: "''",
      backgroundColor: theme.palette.icon.primary,
      display: "flex",
      margin: "3px auto",
      width: 16,
      height: 1,
      borderRadius: 50,
    },
  },
  dropDownMenu: {
    position: "absolute",
    top: 22,
    left: 6,
    zIndex: "300",
    backgroundColor: theme.palette.border.secondary,
    borderRadius: 6,
    boxShadow: `0px 0px 6px #0003`,
  },
  menuItem: {
    minWidth: 120,
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 12,
    padding: 10,
  },
  closeButton: {
    width: 14,
    height: 14,
    marginLeft: 5,
  },
}));

const GridItem = (props) => {
  const classes = useStyles();
  const anchorRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenuHandler = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  };

  const getComponent = () => {
    const widget = widgets.find((w) => w.i === props.item.i);
    const Component = widget.component;
    return <Component {...widget.props} widgetSize={props.widgetSize} />;
  };


  return (
    <>
      <div className={clsx("grid-item__title", classes.gridItemTitle)}>
        <Link
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className={classes.moreBtn}
        ></Link>
        {menuOpen && (
          <div className={classes.dropDownMenu} ref={anchorRef}>
            <ClickAwayListener onClickAway={closeMenuHandler}>
              <Link
                onClick={() => props.onRemoveItem(props.item.i)}
                className={classes.menuItem}
              >
                بستن
                <CloseIcon className={classes.closeButton} />
              </Link>
            </ClickAwayListener>
          </div>
        )}
        {props.item.title}
      </div>
      <span className="grid-item__graph">{getComponent()}</span>
    </>
  );
};

export default GridItem;
