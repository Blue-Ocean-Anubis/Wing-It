import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const RentalCard = ({ rental, index, updateCart, cartList }) => (
  <div className="card">
    <div className="card-index">{index + 1}</div>
    <div className="card-name">{rental.name}</div>
    <div className="card-address">{rental.formatted_address}</div>
    <div className="card-photo-container">
      <img src={rental.photo} className="card-photo"/>
    </div>
    <CardButton cartItem={rental} updateCart={updateCart} cartList={cartList} className="card-button"/>
  </div>
);

export default RentalCard;

