import React, { useState } from 'react';

const PointsOfInterestCard = ({ point }) => {
  const [cardInfo, toggleCard] = useState(true);

  return (
    <div className="card" onClick={() => {
      cardInfo ? toggleCard(false) : toggleCard(true);
    }}>
      {<span className="name">{point.name}</span>}
      {<span>Ranked {point.rank} of 5</span>}
      {<span>{point.category}</span>}
      {<span></span>}
  </div>
  )
}

export default PointsOfInterestCard;