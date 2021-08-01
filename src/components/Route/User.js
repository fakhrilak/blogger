import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserRoute = ({
  component: Component,
  auth: { isAuthenticated,loading,user },
  to,
  ...rest
}) => {
  return (
    <Route
    {...rest}
    render={(props) =>
      isAuthenticated == null? (
        <Component {...props} /> 
      ) : isAuthenticated ? (
        <Component {...props} /> 
      ):isAuthenticated == false?
      ( <Redirect to={{
        pathname: to}}
      />):null}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserRoute);