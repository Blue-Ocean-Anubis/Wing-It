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
    <div className="registration-form-container">
      {errorMessage && <div>{errorMessage}</div>}
      <form className='registration-form' onSubmit={handleSubmit}>
        <label className='registration-form-labels' htmlFor="firstName">First Name:</label>
        <input
        className='registration-form-inputs'
          id="firstName"
          type="text"
          placeholder="Firstname"
          ref={firstNameRef}
          required
        />
        <label className='registration-form-labels' htmlFor="lastName">Last Name:</label>
        <input
        className='registration-form-inputs'
          id="lastName"
          type="text"
          placeholder="Last Name"
          ref={lastNameRef}
          required
        />
        <label className='registration-form-labels' htmlFor="email">email: </label>
        <input
        className='registration-form-inputs'
          id="email"
          type="email"
          ref={emailRef}
          autoComplete="on"
          placeholder="email@example.com"
          required
        />
        <label className='registration-form-labels' htmlFor="street">Street</label>
        <input
        className='registration-form-inputs'
          id="street"
          type="text"
          autoComplete="on"
          ref={streetRef}
          placeholder="street"
          required
        />
        <label className='registration-form-labels' htmlFor="city">City</label>
        <input
        className='registration-form-inputs'
          id="city"
          type="text"
          ref={cityRef}
          autoComplete="on"
          placeholder="City"
          required
        />
        <label className='registration-form-labels' htmlFor="state">State</label>
        <input
        className='registration-form-inputs'
          id="state"
          type="text"
          ref={stateRef}
          autoComplete="on"
          placeholder="State"
          required
        />
        <label className='registration-form-labels' htmlFor="city">Country</label>
        <input
        className='registration-form-inputs'
          id="country"
          type="text"
          ref={countryRef}
          autoComplete="on"
          placeholder="Country"
          required
        />
        <label className='registration-form-labels' htmlFor="zip-code">Zip Code</label>
        <input
        className='registration-form-inputs'
          id="zip-code"
          type="text"
          maxLength="10"
          ref={zipcodeRef}
          autoComplete="on"
          placeholder="12345"
          required
        />
        <label className='registration-form-labels' htmlFor="phone">Phone number</label>
        <input
        className='registration-form-inputs'
          id="phone"
          type="tel"
          ref={telRef}
          minLength="9"
          maxLength="14"
          placeholder="(555)555-5555"
        />
        <label className='registration-form-labels' htmlFor="password">Password: </label>
        <input
          className='registration-form-inputs'
          id="password"
          type="password"
          autoComplete="on"
          ref={passwordRef}
          placeholder="New Password"
          required
        />
        <label className='registration-form-labels' htmlFor="confim-password">Confirm password: </label>
        <input
          className='registration-form-inputs'
          id="confirm-password"
          autoComplete="on"
          type="password"
          ref={passwordConfirmRef}
          placeholder="Confirm Password"
          required
        />
        <button
        className='registration-form-button'
        >Register</button>
        <div className='registration-link-to-login'>
        Already have an account? <Link to="/login">Login</Link>
      </div>
      </form>
    </div>
  );
};

export default Registration;
