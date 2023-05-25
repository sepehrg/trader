import React from "react";
import Slide from "@material-ui/core/Slide";
import useDevice from "../../../hooks/useDevice";

const SlideTransition = React.forwardRef((props, ref) => {
  const device = useDevice();

  return (
    <>
      {device.isNotMobile ? (
        <Slide
          direction={props.direction}
          in={true}
          {...(true ? { timeout: props.timeout } : {})}
          ref={ref}
        >
          {props.children}
        </Slide>
      ) : (
        props.children
      )}
    </>
  );
});

export default SlideTransition;
