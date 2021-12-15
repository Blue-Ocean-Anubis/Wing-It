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
    <div className='login-container'>
    <div className="login-wrapper">
      {error && <div>{error}</div>}
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-form-labels' htmlFor="email">email: </label>
        <input className='login-form-inputs' name="email" type="email" ref={emailRef} required />
        <label className='login-form-labels' htmlFor="password">password: </label>
        <input
          className='login-form-inputs'
          name="password"
          type="password"
          autoComplete="on"
          ref={passwordRef}
          required
        />
        <button className='login-btn'>Login</button>
      </form>
      <div className="google-login-container">
        <button className="google-login-btn" onClick={handleLoginWithGoogle}>Login with Google</button>
      </div>
      <div className='login-link-to-registration-container'>
        Don't have an account?
        <Link className='login-link-to-registration' to="/register">Register for an account</Link>
      </div>
    </div>
   </div>
  );
};

export default Login;
