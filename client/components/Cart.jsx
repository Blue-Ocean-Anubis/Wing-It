import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";
import { Offcanvas } from "react-bootstrap";
import UserProfile from "./UserProfile.jsx";
import RemoveCard from "./RemoveCard.jsx";

const Cart = () => {
  const [list, getList] = useState([]);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/cart", {
        params: {
          uid: user.uid,
        },
      })
      .then((list) => {
        console.log(list.data);
        getList(list);
      })
      .catch((err) => {
        console.log("Error retrieving user list: >>>>", err);
      });
    axios
      .get(`/user/${user.uid}`)
      .then((results) => setUserData(results.data))
      .catch((error) => console.error("Cannot retrieve user data"));
  }, []);

  if (list.length === 0) {
    return null;
  } else {
    return (
      <div className="page">
        <Nav handleCartShow={handleShow} />
        <h1>My Trip Destinations</h1>
        <h2>Airports</h2>
        {list.data
          .filter((loc) => loc.types.includes("airport"))
          .map((location) => (
            <div key={location.code}>
              <span>{`${location.name} (${location.code})`}</span>
              <span>{`${location.city}, ${location.country}`}</span>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
        <h2>Rentals</h2>
        {list.data
          .filter((loc) => loc.types.includes("car_rental"))
          .map((location) => (
            <div key={location.place_id}>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
        <h2>Restaurants</h2>
        {list.data
          .filter((loc) => loc.types.includes("restaurant"))
          .map((location) => (
            <div key={location.place_id}>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}
        <h2>Interesting Places</h2>
        {list.data
          .filter(
            (loc) =>
              !loc.types.includes("car_rental") &&
              !loc.types.includes("restaurant") &&
              !loc.types.includes("airport")
          )
          .map((location) => (
            <div key={location.place_id}>
              <span>{location.name}</span>
              <span>{location.formatted_address}</span>
              <span>{location.details.rating}</span>
              <span>{location.details.international_phone_number}</span>
              <a href={location.details.website}>Website</a>
              <RemoveCard cartItem={location} getList={getList} />
            </div>
          ))}

        <Offcanvas show={show} onHide={handleClose}>
          {!userData ? null : (
            <>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>{` Hello, ${userData.firstName}`}</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <UserProfile details={userData} />
              </Offcanvas.Body>
            </>
          )}
        </Offcanvas>
      </div>
    );
  }
};

export default Cart;
