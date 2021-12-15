import axios from "axios";

import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";

const Registration = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const zipcodeRef = useRef();
  const telRef = useRef();
  const { user } = useContext(AuthContext);
  const [errorMessage, setError] = useState("");
  const history = useHistory();

  console.log(user, "<<");

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    axios
      .post("/register", {
        uid: user.uid,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: user.email,
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        country: countryRef.current.value,
        zipCode: zipcodeRef.current.value,
        phone: telRef.current.value,
      })
      .then(() => {
        history.push("/welcome");
      })
      .catch(() => {
        setError("Failed to create account");
      });
  }

  return (
    <div className="registration-form">
      {errorMessage && <div>{errorMessage}</div>}
      <div>
        <h2>Hi, {user.displayName}!</h2>
        <p>Please finish signing up</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          placeholder="First name"
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
          type="text"
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
        <button>Register</button>
      </form>
    </div>
  );
};

export default Registration;
