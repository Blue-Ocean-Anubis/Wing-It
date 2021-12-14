import React, { useState } from 'react';

const AirportCard = ({ airport }) => (
  <div className="card">
    {<span className="name" key={`code${airport.code}`}>{`${airport.name}(${airport.code})`}</span>}
    {<span className="address" key={airport.city}>{airport.city + ', ' + airport.country}</span>}
  </div>
)

export default AirportCard;