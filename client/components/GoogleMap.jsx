import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import axios from "axios";
import { GOOGLE_API_KEY } from "../../config.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import AutoCompleteMapSearch from "./AutoCompleteMapSearch.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import OffcanvasHeader from "react-bootstrap/OffcanvasHeader";
import OffcanvasTitle from "react-bootstrap/OffcanvasTitle";
import OffcanvasBody from "react-bootstrap/OffcanvasBody";
import Marker from "./Marker.jsx";
import MapStyling from "./MapStyling.js";
import batarang from "./batarang1.png";

const GoogleMap = (props) => {
  const handleMapClick = (event) => {
    props.onLocationChange(event.lat, event.lng);
  };

  let userLocation = props.userLocation.lat
    ? props.userLocation
    : props.userAddressLocation;

  let cartPlaceIDs = props.cartList.data
    ? props.cartList.data.map((each) => {
        return each.place_id ? each.place_id : each.code;
      })
    : [];

  let setMarkers = (business) => {
    if (Array.isArray(business) && business.length > 0) {
      // CHECK THAT BUSINESS DATA HAS ARRIVED

      if (business[0].geometry) {
        // RENTAL, RESTAURANT, and POI CASE
        return business.map((each, key) => {
          return (
            <Marker
              testProps={"hello there"}
              lat={each.geometry.location.lat}
              lng={each.geometry.location.lng}
              index={key + 1}
              key={key}
              name={each.name}
              address={each.formatted_address}
              details={each.details}
              inCart={cartPlaceIDs.includes(each.place_id)}
            />
          );
        });
      } else {
        // AIRPORT CASE
        return business.map((each, key) => {
          return (
            <Marker
              lat={each.location.latitude}
              lng={each.location.longitude}
              name={each.name}
              address={each.city}
              index={key + 1}
              key={key}
              code={each.code}
              details={each.details}
              inCart={cartPlaceIDs.includes(each.code)}
            />
          );
        });
      }
    }
  };

  useEffect(() => {
    // console.log('maps props: ', props);
  });

  return (
    <div style={{ height: "70vh", width: "85%", margin: "2vh auto 2vh auto" }}>
      <Offcanvas
        className="offcanvas-search"
        show={props.show}
        onHide={props.handleClose}
        placement="top"
      >
        <Offcanvas.Header className="offcanvas-header" closeButton>
          <Offcanvas.Title className="offcanvas-title">
            City Search
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <AutoCompleteMapSearch
            canvasClose={props.handleClose}
            onLocationChange={props.onLocationChange}
          ></AutoCompleteMapSearch>
          <div className="batarang-movement-container">
            <img className="batarang" src={batarang} alt="" />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <GoogleMapReact
      className='map'
        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
        center={
          props.searchedLocation.city
            ? props.searchedLocation.coordinates
            : userLocation
        }
        defaultZoom={12}
        onClick={handleMapClick}
        hoverDistance={1}
        options={{
          styles: MapStyling,
          clickableIcons: false,
          draggableCursor: "crosshair",
        }}
      >
        {/* <Marker lat={props.searchedLocation.coordinates.lat} lng={props.searchedLocation.coordinates.lng} /> */}
        {/* <Marker lat={props.userAddressLocation.lat} lng={props.userAddressLocation.lng} /> */}
        {props.currentTab === "airports" || props.currentTab === ""
          ? setMarkers(props.airports)
          : ""}
        {props.currentTab === "restaurants"
          ? setMarkers(props.restaurants)
          : ""}
        {props.currentTab === "rentals" ? setMarkers(props.rentals) : ""}
        {props.currentTab === "POIs" ? setMarkers(props.POIs) : ""}
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;
