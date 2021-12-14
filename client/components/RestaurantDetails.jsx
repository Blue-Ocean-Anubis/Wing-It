import React from 'react';
import RestaurantCard from './RestaurantCard.jsx';

const RestaurantDetails = (props) => (
  <div className="details">
    <h3>Restaurant Information</h3>
    <div className="list-container">
      {props.restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.place_id} restaurant={restaurant}/>
      ))}
    </div>
  </div>
)

export default RestaurantDetails;