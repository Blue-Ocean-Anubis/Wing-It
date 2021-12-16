import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const RestaurantCard = ({ restaurant, index, updateCart, cartList }) => (
  <div className="card">
    <div className="card-indx">{index}</div>
    {<span className="name">{restaurant.name}</span>}
    {<span className="address">{restaurant.formatted_address}</span>}
    <CardButton cartItem={restaurant} updateCart={updateCart} cartList={cartList}/>
  </div>
);

export default RestaurantCard;
