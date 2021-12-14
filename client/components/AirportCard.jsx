import React, { useState } from 'react';

const AirportCard = ({ airport }) => {
  const [cardInfo, toggleCard] = useState(true);

  return (
    <div className="card" onClick={() => {
      cardInfo ? toggleCard(false) : toggleCard(true);
    }}>
      {<span className="name" key={`code${airport.code}`}>{`${airport.name}(${airport.code})`}</span>}
      {<span className="address" key={airport.city}>{airport.city + ', ' + airport.country}</span>}
    </div>
  )
}

export default AirportCard;