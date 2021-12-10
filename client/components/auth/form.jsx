import React from "react";

const Form = (props) => (
  <form onSubmit={props.handleSubmit}>{props.children}</form>
);

export default Form;
