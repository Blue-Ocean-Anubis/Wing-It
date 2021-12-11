import React, { useState } from "react";
import Login from "./login.jsx";
import Registration from "./registration.jsx";

const Auth = (props) => {
  const [hasUser, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked!!");
  };

  return (
    <div className="auth-container">
      {hasUser ? (
        <>
          <Login />
          <div className="redirect">
            Already have an Account? <a href="#">Sign in</a>
          </div>
        </>
      ) : (
        <>
          <Registration />
          <div>
            Don't have an account? <a href="#">Sign up!</a>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
