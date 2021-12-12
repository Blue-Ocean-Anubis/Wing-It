import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLocationType('ROOFTOP');
import GoogleMap from './GoogleMap.jsx';
import List from './List.jsx';
import AirportDetails from './AirportDetails.jsx';
import PointsOfInterest from './PointsOfInterest.jsx';
import RentalDetails from './RentalDetails.jsx';
import RestaurantDetails from './RestaurantDetails.jsx';
import axios from 'axios';

const Home = () => {

  const [userLocation, setUserLocation] = useState({});
  const [userAddress, setUserAddress] = useState({string: TEST_USER_ADDRESS, coordinates: {}})
  // TEST_USER_ADDRESS is placeholder - will have to insert user address here
  const [searchedLocation, setSearchedLocation] = useState({city: '', coordinates: {}});
  const [restaurantData, setRestaurantData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const [airportData, setAirportData] = useState([]);
  const [points, setPoints] = useState([]);

  // ON MAP CLICK, ADD COORDS AND CITY/COUNTRY TO SEARCHED LOCATION STATE
  const onLocationChange = (lat, lng) => {
    Geocode.fromLatLng(lat.toString(), lng.toString())
      .then((response) => {
        setSearchedLocation({
          city: (response.plus_code.compound_code).substring(9),
          coordinates: { lat: lat, lng: lng }
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED
  useEffect(() => {
    console.log('new place clicked', searchedLocation);

    let noState = false;
    let cityData = searchedLocation.city.split(', ');
    if (cityData.length < 3) { noState = true }
    let location = {
      lat: searchedLocation.coordinates.lat,
      lng: searchedLocation.coordinates.lng,
      city: cityData[0],
      state: (noState ? '' : cityData[1]),
      country: (noState? cityData[1] : cityData[2])
    };

    axios.get('/restaurants', {params: location})
      .then((restaurants) => {setRestaurantData(restaurants.data)})
      .catch((err) => {console.log('AxiosError: ', err)})

    axios.get('/rentals', {params: location})
      .then((rentals) => {setRentalData(rentals.data)})
      .catch((err) => {console.log('AxiosError: ', err)})

    axios.get('/latLongNearestAirport', {params: location})
      .then((airports) => {setAirportData(airports.data);})
      .catch((err) => {console.log(error)})
    axios.get('/POI', {params: location})
      .then((points) => {setPoints(points.data);})
      .catch((err) => {console.log('Axios Error: ', err)})
  }, [searchedLocation])


  // GET USER LOCATION DATA
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude})
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      (err) => console.log(err);
    }
  };

  // TURN USER ADDRESS INTO COORDINATES
  const convertAddressToCoords = (address) => {
    Geocode.fromAddress(address)
      .then((response) => {
        setUserAddress({string: TEST_USER_ADDRESS, coordinates: response.results[0].geometry.location})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ON COMPONENT MOUNT, FIND USERLOCATION AND COORDS FOR THEIR ADDRESS
  useEffect(() => {
    getUserLocation();
    convertAddressToCoords(userAddress.string);
  }, []);

  useEffect(() => {
    // console.log('rentals: ', rentalData, '\nrestaurants: ', restaurantData, '\nairports: ', airportData)
  })

  return (
    <div>
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <GoogleMap
        searchedLocation={searchedLocation}
        userLocation={userLocation}
        userAddressLocation={userAddress.coordinates}
        onLocationChange={onLocationChange}
      />
      <AirportDetails airports={airportData} />
      <PointsOfInterest points={points} />
      <RentalDetails rentals={rentalData} />
      <RestaurantDetails restaurants={restaurantData} />
    </div>
  );
};

export default Home;

