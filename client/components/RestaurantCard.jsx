import React, { useState } from 'react';
import CardButton from './CardButton.jsx';

const RestaurantCard = ({ restaurant }) => (
  <div className="card">
    {<span className="name">{restaurant.name}</span>}
    {<span className="address">{restaurant.formatted_address}</span>}
    <CardButton />
  </div>
)

export default RestaurantCard;