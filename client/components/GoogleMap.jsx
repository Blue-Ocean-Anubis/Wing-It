import React, {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './SearchBox.jsx';
import { GOOGLE_API_KEY } from '../../config.js';
import AutoCompleteMapSearch from './AutoCompleteMapSearch.jsx';
// require('dotenv').config();

const Marker = () => <div><FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/></div>;

const GoogleMap = (props) => {

  const handleMapClik = (event) => {
    props.onLocationChange(event.lat, event.lng)
  }

  let userLocation = props.userLocation.lat ? props.userLocation : props.userAddressLocation;

  useEffect(() => {
    // console.log('userlocation: ', userLocation);
  })

    return (
      <div style={{ height: '80vh', width: '90%', margin: '3vh auto 10vh auto'}}>
        <AutoCompleteMapSearch onLocationChange={props.onLocationChange}></AutoCompleteMapSearch>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
          center={userLocation}
          defaultZoom={12}
          onClick={handleMapClik}
        >
          <Marker lat={props.searchedLocation.coordinates.lat} lng={props.searchedLocation.coordinates.lng} />
        </GoogleMapReact>

      </div>
    );

}
export default GoogleMap;