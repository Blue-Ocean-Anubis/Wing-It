import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
// import SearchBox from './SearchBox.jsx';
// require('dotenv').config();
import { GOOGLE_API_KEY } from '../../config.js';
import AutoCompleteMapSearch from './AutoCompleteMapSearch.jsx';
const Marker = () => <div><FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/></div>;

const GoogleMap = (props) => {

  const mapClick = (event) => {
    // console.log(event);
    props.onLocationChange(event.lat, event.lng)
  }

    return (

      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '90%', margin: '10vh auto 10vh auto'}}>
        <AutoCompleteMapSearch></AutoCompleteMapSearch>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY}}
          defaultCenter={{lat: 39, lng: -94}}
          defaultZoom={8}
          onClick={mapClick}
        >
          <Marker lat={props.location.lat} lng={props.location.lng} />
        </GoogleMapReact>

      </div>
    );

}
  
export default GoogleMap;