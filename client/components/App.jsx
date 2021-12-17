import React, { useState, useEffect, useContext, componentDidMount } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./Home.jsx";
import WelcomePage from "./WelcomePage.jsx";
import WelcomeBackPage from "./WelcomeBackPage.jsx";
import UserProfile from "./UserProfile.jsx";
import Cart from "./Cart.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Registration from "./auth/Registration.jsx";
import Login from "./auth/Login.jsx";
import CompleteSignup from "./auth/CompleteSignup";
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
                      <PrivateRoute
                        path="/user"
                        component={UserProfile}
                      ></PrivateRoute>
                      <PrivateRoute
                        path="/cart"
                        component={Cart}
                      ></PrivateRoute>
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
                      <PrivateRoute
                        exact
                        path="/search"
                        component={Home}
                      ></PrivateRoute>
                      <Route path="/register" component={Registration}></Route>
                      <Route path="/login" component={Login}></Route>
                      <Route
                        path="/complete-signup"
                        component={CompleteSignup}
                      ></Route>
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
