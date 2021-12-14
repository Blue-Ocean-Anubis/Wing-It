import React from 'react';

const RestaurantDetails = (props) => (
    <div className="details">
    <h3>Restaurant Information</h3>
      <div className="list-container">
      {props.restaurants.map((restaurant) => (
        <div key={restaurant.place_id} className="card" onClick={() => {console.log('restaurant Location: ', restaurant.geometry.location)}}>
          {<span className="name">{restaurant.name}</span>}
          {<span className="address">{restaurant.formatted_address}</span>}
        </div>
        ))}
      </div>
    </div>
)

export default RestaurantDetails;