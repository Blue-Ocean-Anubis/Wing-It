import React from 'react';

const RestaurantDetails = (props) => (
    <div className="airport-details">
    <h3>Restaurant Information</h3>
      <div className="airport-list-container">
      {props.restaurants.map((restaurant) => (
        <div key={restaurant.place_id} className="airport-card" onClick={() => {console.log('restaurant Location: ', restaurant.geometry.location)}}>
          {<span>{restaurant.name}</span>}
          {<span>{restaurant.formatted_address}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default RestaurantDetails;