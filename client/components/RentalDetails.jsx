import React from 'react';

const RentalDetails = (props) => (
    <div className="airport-details">
    <h3>Rental Information</h3>
      <div className="airport-list-container">
      {props.rentals.map((rental) => (
        <div key={rental.place_id} className="airport-card" onClick={() => {console.log('Rental Location: ', rental.geometry.location)}}>
          {<span>{rental.name}</span>}
          {<span>{rental.formatted_address}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default RentalDetails;