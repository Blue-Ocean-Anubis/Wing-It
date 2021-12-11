import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";

export function Registration(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { user, signup } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.error("Invalid Passwords");
      return;
    }
    signup(emailRef.current.value, passwordRef.current.value)
      .then((results) => console.log(results, user)) // send user info to db
      .catch(console.error); // TODO: handle email already in use
  }

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
}
