import React from 'react';
import RentalCard from './RentalCard.jsx';

const RentalDetails = (props) => (
  <div className="details">
  <h3>Rental Information</h3>
    <div className="list-container">
      {props.rentals.map((rental, index) => (
        <RentalCard key={rental.place_id} rental={rental} index={index} updateCart={props.updateCart} cartList={props.cartList}/>
      ))}
    </div>
  </div>
)

export default RentalDetails;