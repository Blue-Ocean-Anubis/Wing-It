import React from 'react';
import List from './List.jsx';


const AirportDetails = (props) => (
    <div className="airport-details">
    <h3>Airport Information</h3>
      <div className="airport-list-container">
      {props.airports.map((airport) => (
        <div key={airport.name + airport.city} className="airport-card" onClick={() => {console.log(airport.location)}}>
          {<span key={`code${airport.code}`}>{`${airport.name}(${airport.code})`}</span>}
          {<span key={airport.city}>{airport.city}</span>}
          {<span key={airport.country}>{airport.country}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default AirportDetails;