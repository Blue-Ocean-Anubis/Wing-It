import React, { useState, useRef } from "react";

const Registration = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email: </label>
      <input id="email" type="email" ref={emailRef} required />
      <label htmlFor="password">Password: </label>
      <input id="password" type="password" ref={passwordRef} required />
      <label htmlFor="confim-password">Confirm password: </label>
      <input
        id="confirm-password"
        type="password"
        ref={passwordConfirmRef}
        required
      />
      <button>Register</button>
    </form>
  );
};
export default Registration;
