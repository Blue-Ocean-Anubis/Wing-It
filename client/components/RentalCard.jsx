import React, { useState } from 'react';

const RentalCard = ({ rental }) => (
  <div className="card">
    {<span className="name">{rental.name}</span>}
    {<span className="address">{rental.formatted_address}</span>}
  </div>
)

export default RentalCard;