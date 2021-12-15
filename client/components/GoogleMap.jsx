import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import AutoCompleteMapSearch from './AutoCompleteMapSearch.jsx';
// require('dotenv').config();
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody';

// const Marker = () => <div><FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/></div>;
import Marker from './Marker.jsx';
import MapStyling from './MapStyling.js'

const GoogleMap = (props) => {

  const handleMapClick = (event) => {
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
          return <Marker lat={each.location.latitude} lng={each.location.longitude} key={key} name={each.name} address={each.city} code={each.code}/>
        });
      }
    }
  };

  useEffect(() => {
    // console.log('maps props: ', props);
  });

  useEffect(() => {
    // console.log(props.currentTab);
  }, [props.currentTab]);

  return (
    <div style={{ height: '70vh', width: '85%', margin: '2vh auto 2vh auto' }}>
      <Offcanvas show={props.show} onHide={props.handleClose} placement='top'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>City Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Search a place that you would like to visit
        <AutoCompleteMapSearch canvasClose={props.handleClose} onLocationChange={props.onLocationChange}></AutoCompleteMapSearch>
        </Offcanvas.Body>
      </Offcanvas>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={props.searchedLocation.city ? props.searchedLocation.coordinates : userLocation}
        defaultZoom={12}
        onClick={handleMapClick}
        hoverDistance={1}
        options={{
          styles: MapStyling,
          clickableIcons: false,
          draggableCursor: "crosshair"
      }}
      >
        <Marker lat={props.searchedLocation.coordinates.lat} lng={props.searchedLocation.coordinates.lng}/>

        {/* <Marker lat={props.userAddressLocation.lat} lng={props.userAddressLocation.lng} /> */}
        {props.currentTab === 'airports' || props.currentTab === '' ? setMarkers(props.airports) : ''}
        {props.currentTab === 'restaurants' ? setMarkers(props.restaurants) : ''}
        {props.currentTab === 'rentals' ? setMarkers(props.rentals) : ''}
        {props.currentTab === 'POIs' ? setMarkers(props.POIs) : ''}
      </GoogleMapReact>
    </div>
  );
}
export default GoogleMap;
