import React, { useState } from "react";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";

const Auth = (props) => {
  const [hasUser, setLogin] = useState(false);

  return (
    <div className="auth-container">
      {hasUser ? (
        <>
          <Login />
          <div className="redirect">
            Don't have an account? <a href="#">Sign up!</a>
          </div>
        </>
      ) : (
        <>
          <Registration />
          <div>
            Already have an Account? <a href="#">Sign in</a>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
