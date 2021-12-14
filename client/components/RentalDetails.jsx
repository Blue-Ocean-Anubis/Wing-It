import React from 'react';

const RentalDetails = (props) => (
    <div className="rental-details">
    <h3>Rental Information</h3>
      <div className="list-container">
      {props.rentals.map((rental) => (
        <div key={rental.place_id} className="card" onClick={() => {console.log('Rental Location: ', rental.geometry.location)}}>
          {<span className="name">{rental.name}</span>}
          {<span className="address">{rental.formatted_address}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default RentalDetails;