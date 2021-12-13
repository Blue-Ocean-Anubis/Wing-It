import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./Home.jsx";
import UserProfile from "./UserProfile.jsx";
import Cart from "./Cart.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Registration from "./auth/Registration.jsx";
import Login from "./auth/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const App = () => {
  const location = useLocation();
  return (
    <div className="app">
      <BrowserRouter>
        <Route
          exact
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <AuthProvider>
                  <Switch location={location} key={location.pathname}>
                    <Route path="/user" component={UserProfile}></Route>
                    <Route path="/cart" component={Cart}></Route>
                    <PrivateRoute
                      exact
                      path="/"
                      component={Home}
                    ></PrivateRoute>
                    <Route exact path="/search" component={Home}></Route>
                    <Route path="/register" component={Registration}></Route>
                    <Route path="/login" component={Login}></Route>
                  </Switch>
                </AuthProvider>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
