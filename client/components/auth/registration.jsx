import axios from "axios";

import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";

const Registration = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const zipcodeRef = useRef();

  const telRef = useRef();
  const { signup } = useContext(AuthContext);
  const [errorMessage, setError] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    signup(emailRef.current.value, passwordRef.current.value)
      .then((results) => {
        return axios.post("/register", {
          uid: results.user.uid,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          street: streetRef.current.value,
          city: cityRef.current.value,
          state: stateRef.current.value,
          country: countryRef.current.value,
          zipCode: zipcodeRef.current.value,
          phone: telRef.current.value,
        });
      })
      .then(() => {
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
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          placeholder="Firstname"
          ref={firstNameRef}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          ref={lastNameRef}
          required
        />
        <label htmlFor="email">email: </label>
        <input
          id="email"
          type="email"
          ref={emailRef}
          placeholder="email"
          required
        />
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          autoComplete="on"
          ref={streetRef}
          placeholder="street"
          required
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          ref={cityRef}
          autoComplete="on"
          placeholder="City"
          required
        />
        <label htmlFor="state">State</label>
        <input
          id="state"
          type="text"
          ref={stateRef}
          autoComplete="on"
          placeholder="State"
          required
        />
        <label htmlFor="city">Country</label>
        <input
          id="country"
          type="text"
          ref={countryRef}
          autoComplete="on"
          placeholder="Country"
          required
        />
        <label htmlFor="zip-code">Zip Code</label>
        <input
          id="zip-code"
          type="number"
          maxLength="10"
          ref={zipcodeRef}
          autoComplete="on"
          placeholder="12345"
          required
        />
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          type="tel"
          ref={telRef}
          minLength="9"
          maxLength="14"
          placeholder="(555)555-5555"
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          autoComplete="on"
          ref={passwordRef}
          required
        />
        <label htmlFor="confim-password">Confirm password: </label>
        <input
          id="confirm-password"
          autoComplete="on"
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
