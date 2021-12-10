import React, { useState } from "react";
import Form from "./form.jsx";
import Login from "./login.jsx";
import Registration from "./registration.jsx";

const Auth = (props) => {
  let [hasUser, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmail = (type) => type === "email";

  const handleChange = (e) => {
    if (isEmail(e.target.name)) {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked!!");
  };

  return (
    <Form handleSubmit={handleSubmit}>
      {hasUser ? (
        <>
          <Login handleChange={handleChange} />
          <div className="redirect">
            Already have an Account? <a href="#">Sign in</a>
          </div>
        </>
      ) : (
        <>
          <Registration handleChange={handleChange} />
          <div>
            Don't have an account? <a href="#">Sign up!</a>
          </div>
        </>
      )}
    </Form>
  );
};

export default Auth;
