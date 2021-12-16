import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const AirportCard = ({ airport, index, updateCart, cartList }) => (
  <div className="card">
    <div className="card-indx">{index}</div>
    {
      <span
        className="name"
        key={`code${airport.code}`}
      >{`${airport.name}(${airport.code})`}</span>
    }
    {
      <span className="address" key={airport.city}>
        {airport.city + ", " + airport.country}
      </span>
    }
    <CardButton cartItem={airport} updateCart={updateCart} cartList={cartList}/>
  </div>
);

export default AirportCard;
