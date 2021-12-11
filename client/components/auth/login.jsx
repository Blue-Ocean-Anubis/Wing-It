import React, { useState, useRef } from "react";

const Login = (props) => {
  let emailRef = useRef();
  let passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
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
