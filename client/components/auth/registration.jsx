import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";

const Registration = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useContext(AuthContext);
  const [errorMessage, setError] = useState("");
  const history = useHistory();

  ////
  // const [userName, setUserName] = useState("");

  // function handleUserName(userName){
  //   // e.preventDefault();
  //   props.handleUserNameSubmit(userName);
  // }
  /////
  // console.log(props);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    signup(emailRef.current.value, passwordRef.current.value)
      .then((results) => {
        setError("");
        // var splitEmail=emailRef.current.value.split('@');
        // var userName=splitEmail[0];
        // handleUserName(userName);
        history.push("/welcome");
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to create account");
      });
  }

  return (
    <div className="registration-form">
      {errorMessage && <div>{errorMessage}</div>}
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
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Registration;
