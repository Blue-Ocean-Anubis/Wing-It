import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLocationType('ROOFTOP');
import GoogleMap from './GoogleMap.jsx';
import InfoList from './InfoList.jsx';

const Home = () => {
  const [state, setState] = useState({
    searchedLocation: {},
    userLocation: {},
    userAddressLocation: {},
    userAddress: TEST_USER_ADDRESS, // placeholder - will have to insert user address here
    searchBoxText: 'Search a City!',
  });

  const onLocationChange = (lat, lng) => {
    setState((prevState) => ({ ...prevState, searchedLocation: { lat: lat, lng: lng } }));
  };

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED WITH UPDATED COORDINATES (state.searchedLocation)
  useEffect(() => {
    console.log('new place clicked', state.searchedLocation);
  }, [state.searchedLocation]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prevState) => ({
            ...prevState,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      (err) => console.log(err);
    }
  };

  const convertAddressToCoords = (address) => {
    Geocode.fromAddress(address)
      .then((response) => {
        console.log(response);
        setState((prevState) => (
          { ...prevState, userAddressLocation: response.results[0].geometry.location }
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // on component mount, find userLocation and coords for their address
  useEffect(() => {
    getUserLocation();
    convertAddressToCoords(state.userAddress);
  }, []);

  return (
    <div>
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <GoogleMap
        searchedLocation={state.searchedLocation}
        userLocation={state.userLocation}
        userAddressLocation={state.userAddressLocation}
        onLocationChange={onLocationChange}
      />
      <InfoList />
    </div>
  );
};

export default Home;

// // example for how to turn lat/lng geo data into city data:
// Geocode.fromLatLng("39.0997", "-94.5786")
// .then((response) => {console.log('geocode response: ', response)})
