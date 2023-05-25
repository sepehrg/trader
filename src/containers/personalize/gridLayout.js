import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import GridItem from "./gridItem";

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles((theme) => ({
  gridItem: {
    backgroundColor: theme.palette.background.box,
    border: `1px solid ${theme.palette.border.secondary}`,
    borderRadius: 5,
  },
}));

const GridLayout = (props) => {
  const classes = useStyles();

  const [newSizes, setNewSizes] = useState();

  return (
    <ResponsiveGridLayout
      className="layout"
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={10}
      layouts={props.layouts}
      style={{ direction: "ltr" }}
      verticalCompact={false}
      onResizeStop={setNewSizes}
      preventCollision={true}
      onLayoutChange={props.onLayoutChange}
      onDrag={props.onDrag}
    >
      {props.items.map((el) => (
        <div
          data-grid={el}
          className={clsx("grid-item", classes.gridItem)}
          key={el.i}
        >
          <GridItem
            item={el}
            widgetSize={newSizes ? newSizes.find((w) => w.i === el.i) : el}
            onRemoveItem={props.onRemoveItem}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;
