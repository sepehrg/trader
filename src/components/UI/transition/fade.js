import React from "react";
import Fade from "@material-ui/core/Fade";
import useDevice from "../../../hooks/useDevice";

const FadeTransition = React.forwardRef((props, ref) => {
  const device = useDevice();

  return (
    <>
      {device.isNotMobile ? (
        <Fade
          in
          timeout={props.timeout}
          style={{ transitionDelay: `${props.delay}ms` }}
          ref={ref}
        >
          {props.children}
        </Fade>
      ) : (
        props.children
      )}
    </>
  );
});

export default FadeTransition;
