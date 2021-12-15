import React, { useState, useEffect, componentDidMount } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faSearch,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./Home.jsx";
import WelcomePage from "./WelcomePage.jsx";
import WelcomeBackPage from "./WelcomeBackPage.jsx";
import UserProfile from "./UserProfile.jsx";
import Cart from "./Cart.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Registration from "./auth/Registration.jsx";
import Login from "./auth/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import batwing from "./batwing.png";

const App = () => {
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    setLoading((loading) => !loading);
  };
  useEffect(() => {
    loadData();
  }, []);

  const location = useLocation();

  if (loading) {
    return (
      <div className="welcome-container">
        <div className="welcome-text">batbook</div>
        <img className="batwing-logo" src={batwing} alt="" />
      </div>
    );
  } else {
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <AuthProvider>
                    <Switch location={location} key={location.pathname}>
                      <Route path="/user" component={UserProfile}></Route>
                      <Route path="/cart" component={Cart}></Route>
                      <PrivateRoute
                        exact
                        path="/"
                        component={Home}
                      ></PrivateRoute>
                      <PrivateRoute
                        exact
                        path="/welcome"
                        component={WelcomePage}
                      ></PrivateRoute>
                      <PrivateRoute
                        exact
                        path="/welcomeBack"
                        component={WelcomeBackPage}
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
  }
};

export default App;
