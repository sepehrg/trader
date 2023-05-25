import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LimitedAccess from "../components/limitedAccess/limitedAccess";

const GuardedRoute = ({
  component: Component,
  accessKey,
  permissions,
  showable,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !accessKey || (accessKey && permissions.includes(accessKey)) ? (
          <Component {...props} />
        ) : accessKey && !permissions.includes(accessKey) && showable ? (
          <LimitedAccess />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.account.permissions,
  };
};

export default connect(mapStateToProps)(GuardedRoute);
