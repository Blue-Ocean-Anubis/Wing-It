import React from 'react';
import PointsOfInterestCard from './PointsOfInterestCard.jsx';

const PointsOfInterest = (props) => (
  <div className="details">
  <h3>Points Of Interest</h3>
    <div className="list-container">
    {props.points.map((point, index) => (
      <PointsOfInterestCard key={point.place_id} point={point} index={index} updateCart={props.updateCart} cartList={props.cartList}/>
    ))}
    </div>
  </div>
)

export default PointsOfInterest;