import React, { useState } from 'react';
import CardButton from './CardButton.jsx';

const RentalCard = ({ rental }) => (
  <div className="card">
    {<span className="name">{rental.name}</span>}
    {<span className="address">{rental.formatted_address}</span>}
    <CardButton rental={rental}/>
  </div>
)

export default RentalCard;