import React, { useState } from 'react';

const PointsOfInterestCard = ({ point }) => {
  const [cardInfo, toggleCard] = useState(true);

  return (
    <div className="card" onClick={() => {
      cardInfo ? toggleCard(false) : toggleCard(true);
    }}>
      {<span className="name">{point.name}</span>}
      {<span>{point.rating} of 5</span>}
      {<span>{point.category}</span>}
      {<span>{point.types.filter(type => type !== 'point_of_interest' && type !== 'establishment')}
    </span>}
  </div>
  )
}

export default PointsOfInterestCard;