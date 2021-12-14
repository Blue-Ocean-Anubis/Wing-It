import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import AutoCompleteMapSearch from './AutoCompleteMapSearch.jsx';
import Marker from './Marker.jsx';
import MapStyling from './MapStyling.js'

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
          return <Marker lat={each.location.latitude} lng={each.location.longitude} key={key} name={each.name} address={each.city}/>
        });
      }
    }
  };

  useEffect(() => {
    console.log('maps props: ', props);
  });

  useEffect(() => {
    console.log(props.currentTab);
  }, [props.currentTab]);

  return (
    <div style={{ height: '70vh', width: '90%', margin: '3vh auto 10vh auto' }}>
      <AutoCompleteMapSearch onLocationChange={props.onLocationChange}></AutoCompleteMapSearch>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={props.searchedLocation.city ? props.searchedLocation.coordinates : userLocation}
        defaultZoom={12}
        onClick={handleMapClik}
        hoverDistance={1}
        options={{
          styles: MapStyling,
      }}
      >
        <Marker lat={props.searchedLocation.coordinates.lat} lng={props.searchedLocation.coordinates.lng}/>

        {/* <Marker lat={props.userAddressLocation.lat} lng={props.userAddressLocation.lng} /> */}
        {props.currentTab === 'airports' ? setMarkers(props.airports) : ''}
        {props.currentTab === 'restaurants' ? setMarkers(props.restaurants) : ''}
        {props.currentTab === 'rentals' ? setMarkers(props.rentals) : ''}
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;
