import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};

export default PrivateRoute;
