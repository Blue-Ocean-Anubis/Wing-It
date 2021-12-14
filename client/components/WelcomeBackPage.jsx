import batwing from "./batwing.png";
import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.jsx";

const WelcomePage = () => {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  var splitEmail=user.email.split('@');
  var userName=splitEmail[0];
  const delay = async () => {
    await new Promise((r) => setTimeout(r, 1200));
    history.push("/");
  };

  useEffect(() => {
    delay();
  }, []);

    return(
      <div className="welcome-container">
        <div className="welcome-text">welcome back, {userName}</div>
        <img className="batwing-logo" src={batwing} alt="" />
      </div>
    );
};

export default WelcomePage;