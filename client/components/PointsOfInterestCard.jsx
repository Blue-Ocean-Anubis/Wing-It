import React, { useState } from 'react';
import CardButton from './CardButton.jsx';

const PointsOfInterestCard = ({ point, index, updateCart, cartList }) => (
  <div className='card'>
    <div className='card-index'>{index + 1}</div>
    <div className='card-name'>{point.name}</div>
    <div className='card-address'>{point.formatted_address}</div>
    {/* <div className='card-rating'>{point.rating} of 5</div> */}
    {/* <div>{point.category}</div> */}
    {/* <div>{point.types.filter((type) => type !== 'point_of_interest' && type !== 'establishment')}</div> */}
    <div className="card-photo-container">
      <img src={point.photo} className="card-photo"/>
    </div>

      <CardButton cartItem={point} updateCart={updateCart} cartList={cartList} className="card-button"/>
  </div>
);

export default PointsOfInterestCard;
