import React, { useState } from 'react';

const RentalCard = ({ rental }) => {
  const [cardInfo, toggleCard] = useState(true);

  return (
    <div className="card" onClick={() => {
      cardInfo ? toggleCard(false) : toggleCard(true);
    }}>
      {<span className="name">{rental.name}</span>}
      {<span className="address">{rental.formatted_address}</span>}
    </div>
  )
}

export default RentalCard;