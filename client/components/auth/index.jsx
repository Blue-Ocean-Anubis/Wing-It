import React, { useState } from "react";
import Login from "./login.jsx";
import Registration from "./registration.jsx";

const Auth = (props) => {
  let [hasUser, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked!!");
  };

  return (
    <div className="auth-container">
      {hasUser ? (
        <>
          <Login handleChange={handleChange} />
          <div className="redirect">
            Already have an Account? <a href="#">Sign in</a>
          </div>
        </>
      ) : (
        <>
          <Registration handleChange={handleChange} />
          <div>
            Don't have an account? <a href="#">Sign up!</a>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
