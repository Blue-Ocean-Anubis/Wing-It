import React from 'react';
import RestaurantCard from './RestaurantCard.jsx';

const RestaurantDetails = (props) => (
  <div className="details">
    <h3>Restaurant Information</h3>
    <div className="list-container">
      {props.restaurants.map((restaurant, index) => (
        <RestaurantCard key={restaurant.place_id} restaurant={restaurant} index={index} updateCart={props.updateCart} cartList={props.cartList}/>
      ))}
    </div>
  </div>
)

export default RestaurantDetails;