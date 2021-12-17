import React, { useState } from 'react';
import CardButton from './CardButton.jsx';

const AirportCard = ({ airport, index, updateCart, cartList }) => (
  <div className='card'>
    <div className='card-index'>{index + 1}</div>
    <div className='card-name' key={`code${airport.code}`}>{`${airport.name}`}</div>
    <div className='card-address' key={airport.city}>
      {airport.city + ', ' + airport.country}
    </div>
    <div className="card-photo-container">
      {airport.code}
    </div>
    <CardButton cartItem={airport} updateCart={updateCart} cartList={cartList} className='card-button' />
  </div>
);

export default AirportCard;
