import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox.jsx';
import { GOOGLE_API_KEY } from '../../config.js';
import AutoCompleteMapSearch from './AutoCompleteMapSearch.jsx';
// require('dotenv').config();

const Marker = (props) => {

  const [mouseOn, setMouseOn] = useState(false);

  let handleMouseEnter = () => {
    setMouseOn(true);
  }

  let handleMouseLeave = () => {
    setMouseOn(false);
  }

  console.log('props of each: ', props)
  return (
    <div className="marker">
      <FontAwesomeIcon icon={faMapMarkerAlt} size='4x' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
      {mouseOn ? <div className="info-window"> {props.name + '\n' + props.address}</div> : ''}
      {/* <img src={props.businessInfo}/> */}
    </div>
  )
};


const GoogleMap = (props) => {

  const handleMapClik = (event) => {
    props.onLocationChange(event.lat, event.lng);
  };

  let userLocation = props.userLocation.lat ? props.userLocation : props.userAddressLocation;

  let setMarkers = (business) => {
    // console.log('busiess', business)

    if (Array.isArray(business) && business.length > 0) {
      // CHECK THAT BUSINESS DATA HAS ARRIVED

      if (business[0].geometry) {
        // RENTAL AND RESTAURANT CASE
        return business.map((each, key) => {
          return <Marker lat={each.geometry.location.lat} lng={each.geometry.location.lng} key={key} name={each.name} address={each.formatted_address}/>
        });
      } else { // AIRPORT CASE
        return business.map((each, key) => {
          return <Marker lat={each.location.latitude} lng={each.location.longitude} key={key} name={each.code}/>
        });
      }
    }
  };

  useEffect(() => {
    console.log('maps props: ', props);
  });

  return (
    <div style={{ height: '80vh', width: '90%', margin: '3vh auto 10vh auto' }}>
      <AutoCompleteMapSearch onLocationChange={props.onLocationChange}></AutoCompleteMapSearch>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={props.searchedLocation.city ? props.searchedLocation.coordinates : userLocation}
        defaultZoom={12}
        onClick={handleMapClik}
        hoverDistance={1}
      >
        <Marker lat={props.searchedLocation.coordinates.lat} lng={props.searchedLocation.coordinates.lng} />
        {/* <Marker lat={props.userAddressLocation.lat} lng={props.userAddressLocation.lng} /> */}
        {setMarkers(props.airports)}
        {setMarkers(props.restaurants)}
        {setMarkers(props.rentals)}
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;
