import React, { useState, useRef, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";

const Login = (props) => {
  const history = useHistory();
  let emailRef = useRef();
  let passwordRef = useRef();
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        history.push("/welcomeBack");
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  async function handleLoginWithGoogle(e) {
    e.preventDefault();
    try {
      await loginWithGoogle();
      history.push("/welcomeBack");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="login">
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email: </label>
        <input name="email" type="email" ref={emailRef} required />
        <label htmlFor="password">password: </label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          ref={passwordRef}
          required
        />
        <button>Login</button>
      </form>
      <div className="google-login">
        <button onClick={handleLoginWithGoogle}>Login with Google</button>
      </div>
      <div>
        Don't have an account?
        <Link to="/register">Register for an account</Link>
      </div>
    </div>
  );
};

export default Login;
