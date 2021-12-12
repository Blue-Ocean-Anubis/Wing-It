import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Login = (props) => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then(console.log)
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email: </label>
      <input name="email" type="email" ref={emailRef} required />
      <label htmlFor="password">password: </label>
      <input name="password" type="password" ref={passwordRef} required />
      <button>Login</button>
    </form>
  );
};

export default Login;
