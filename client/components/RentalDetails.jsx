import React from 'react';
import RentalCard from './RentalCard.jsx';

const RentalDetails = (props) => (
    <div className="rental-details">
    <h3>Rental Information</h3>
      <div className="list-container">
        {props.rentals.map((rental) => (
          <RentalCard key={rental.place_id} rental={rental} />
        ))}
      </div>
    </div>
)

export default RentalDetails;