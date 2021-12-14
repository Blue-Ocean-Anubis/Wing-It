import React from 'react';

const RentalDetails = (props) => (
    <div className="rental-details">
    <h3>Rental Information</h3>
      <div className="rental-list-container">
      {props.rentals.map((rental) => (
        <div key={rental.place_id} className="rental-card" onClick={() => {console.log('Rental Location: ', rental.geometry.location)}}>
          {<span className="rental-name">{rental.name}</span>}
          {<span className="rental-address">{rental.formatted_address}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default RentalDetails;