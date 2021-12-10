import React from "react";

const Login = (props) => (
  <>
    <label htmlFor="email">email: </label>
    <input name="email" type="email" onChange={props.handleChange} />
    <br />
    <label htmlFor="password">password: </label>
    <input name="password" type="password" onChange={props.handleChange} />
    <br />
    <button>Login</button>
  </>
);

export default Login;
