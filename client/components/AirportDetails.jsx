import React from 'react';
import List from './List.jsx';


const AirportDetails = (props) => (
    <div className="airport-details bg-dark text-warning">
    <h3>Airport Information</h3>
      <div className="airport-list-container">
      {props.airports.map((airport) => (
        <div key={airport.name + airport.city} className="airport-card row justify-content-between" onClick={() => {console.log(airport.location)}}>
          {<span className="col bg-dark" key={`code${airport.code}`}>{`${airport.name}(${airport.code})`}</span>}
          {<span className="col bg-dark" key={airport.city}>{airport.city}</span>}
          {<span className="col bg-dark" key={airport.country}>{airport.country}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default AirportDetails;