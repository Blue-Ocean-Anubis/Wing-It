import React from 'react';
import AirportCard from './AirportCard.jsx';

const AirportDetails = (props) => (
    <div className="details">
    <h3>Airport Information</h3>
      <div className="list-container">
      {props.airports.map((airport) => (
        <AirportCard key={airport.code} airport={airport} />
      ))}
      </div>
    </div>
)

export default AirportDetails;