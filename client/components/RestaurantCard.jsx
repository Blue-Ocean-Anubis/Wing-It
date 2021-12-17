import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const RestaurantCard = ({ restaurant, index, updateCart, cartList }) => (
  <div className="card">
    <div className="card-index">{index + 1}</div>
    <div className="card-name">{restaurant.name}</div>
    <div className="card-address">{restaurant.formatted_address}</div>
    <div className="card-photo-container">
      <img src={restaurant.photo} className="card-photo"/>
    </div>
    <CardButton cartItem={restaurant} updateCart={updateCart} cartList={cartList} className="card-button"/>
  </div>
);

export default RestaurantCard;

