import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import TOKEN from '../../google-API-key-TP.js';
import SearchBox from './SearchBox.jsx';


// const AnyReactComponent = ({  text }) => <div>{text}</div>;

const GoogleMap = (props) => {

  const mapClick = (event) => {
    console.log(event);
    props.onLocationChange(event.lat, event.lng)
  }

    return (

      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '90%', margin: '10vh auto 10vh auto'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: TOKEN.KEY }}
          defaultCenter={props.location}
          defaultZoom={8}
          onClick={mapClick}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="2x"
            lat={props.location.lat}
            lng={props.location.lng}
          />
        </GoogleMapReact>

      </div>
    );

}

export default GoogleMap;