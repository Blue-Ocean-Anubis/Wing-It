import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const UserProfile = (props) => {
  console.log('details in userprofile component', props.details);
  return (
    <Form className="user-profile-offcanvas">
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Email
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={props.details.email} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        First Name
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={props.details.firstName} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Last Name
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={props.details.lastName} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Street Address
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={props.details.address.street} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        City and State
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={`${props.details.address.city}, ${props.details.address.state}, ${props.details.address.country}`} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
        Zip Code
      </Form.Label>
      <Col sm="10">
        <Form.Control readOnly defaultValue={props.details.address.zipCode} />
      </Col>
    </Form.Group>
  </Form>
  );
};

export default UserProfile;
//firstName, lastName,
/**address:
city: "abc town"
country: "US of A"
state: "Okie"
street: "123 abc street"
zipCode: "12345" */