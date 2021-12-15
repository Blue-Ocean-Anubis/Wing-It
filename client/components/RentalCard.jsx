import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const RentalCard = ({ rental, index }) => (
  <div className="card">
    <div className="card-indx">{index}</div>
    {<span className="name">{rental.name}</span>}
    {<span className="address">{rental.formatted_address}</span>}
    <CardButton cartItem={rental} />
  </div>
);

export default RentalCard;
