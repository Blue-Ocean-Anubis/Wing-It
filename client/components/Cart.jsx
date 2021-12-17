import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";
import RemoveCard from "./RemoveCard.jsx";
import Accordion from 'react-bootstrap/Accordion';

const Cart = () => {
  const [list, getList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/cart", {
        params: {
          uid: user.uid,
        },
      })
      .then((list) => {
        getList(list);
      })
      .catch((error) => {
        console.error("Cannot retrieve user information", error);
      });
  }, []);

  if (list.length === 0) {
    return null;
  } else {
    return (
      <div>
        <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Airports</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("airport"))
          .map((location) => (
            <div key={location.code}>
              <span>{`${location.name} (${location.code})`}</span>
              <span>{`${location.city}, ${location.country}`}</span>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Car Rentals</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("car_rental"))
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo}/>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Restaurants</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter((loc) => loc.types.includes("restaurant"))
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo}/>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>
          <>
        <Accordion defaultActiveKey="0">
        <Accordion.Item  className="bg-black text-white" eventKey="0">
        <Accordion.Header className="bg-black text-white" >Interesting Places</Accordion.Header>
        <Accordion.Body className="bg-black text-white" >
        {list.data
          .filter(
            (loc) =>
              !loc.types.includes("car_rental") &&
              !loc.types.includes("restaurant") &&
              !loc.types.includes("airport")
          )
          .map((location) => (
            <div key={location.place_id}>
              <img src={location.photo}/>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
          </>

      </div>
    );
  }
};

export default Cart;

{/* <Accordion defaultActiveKey="0">
<Form className="user-profile-offcanvas">
<Accordion.Item eventKey="0">
<Accordion.Header>Email</Accordion.Header>
<Accordion.Body>
<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
  <Form.Label column sm="2">
    Email
  </Form.Label>
  <Col sm="10">
    <Form.Control readOnly defaultValue={props.details.email} />
  </Col>
</Form.Group>
</Accordion.Body>
</Accordion.Item> */}