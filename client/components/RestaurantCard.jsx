import React, { useState } from 'react';

const RestaurantCard = ({ restaurant }) => {
  const [cardInfo, toggleCard] = useState(true);

  return (
    <div className="card" onClick={() => {
      cardInfo ? toggleCard(false) : toggleCard(true);
    }}>
      {<span className="name">{restaurant.name}</span>}
      {<span className="address">{restaurant.formatted_address}</span>}
    </div>
  )
}

export default RestaurantCard;