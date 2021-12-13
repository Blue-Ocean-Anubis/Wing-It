import React, { useState, useRef, useContext } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";

const Login = (props) => {
  const history = useHistory();
  let emailRef = useRef();
  let passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        setError(e.message);
        console.log(e.message, e.code);
      });
  };

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
      <div>
        Don't have an account?
        <Link to="/register">Register for an account</Link>
      </div>
    </div>
  );
};

export default Login;
