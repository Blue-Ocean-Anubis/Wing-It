import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";
import RemoveCard from "./RemoveCard.jsx";

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
      </div>
    );
  }
};

export default Cart;
