import React from 'react';


const AirportDetails = (props) => (
    <div className="details">
    <h3>Airport Information</h3>
      <div className="list-container">
      {props.airports.map((airport) => (
        <div key={airport.name + airport.city} className="card" onClick={() => {console.log(airport.location)}}>
          {<span className="name" key={`code${airport.code}`}>{`${airport.name}(${airport.code})`}</span>}
          {<span className="address" key={airport.city}>{airport.city + ', ' + airport.country}</span>}
          {/* {<span className="address" key={airport.country}>{airport.country}</span>} */}
        </div>
        ))}
      </div>
    </div>
)

export default AirportDetails;