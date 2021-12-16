import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const RentalCard = ({ rental, index, updateCart, cartList }) => (
  <div className="card">
    <div className="card-index">{index}</div>
    {<span className="name">{rental.name}</span>}
    {<span className="address">{rental.formatted_address}</span>}
    <CardButton cartItem={rental} updateCart={updateCart} cartList={cartList}/>
  </div>
);

export default RentalCard;
