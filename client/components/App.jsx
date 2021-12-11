<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY)
Geocode.setLocationType("ROOFTOP")
import GoogleMap from './GoogleMap.jsx';
import List from './List.jsx';
import axios from 'axios';


const App = () => {
  const [state, setState] = useState ({
    searchedLocation: {},
    userLocation: {},
    userAddressLocation: {},
    userAddress: TEST_USER_ADDRESS, // placeholder - will have to insert user address here
    searchBoxText: 'Search a City!'
  })

  // const [restaurantData, setRestaurantData] = useState([]);
  // const [rentalData, setRentalData] = useState([]);

  // useEffect(() => {
  //   const coordinates = {lat: state.searchedLocation.lat,lng: state.searchedLocation.lng};
  //   axios.get('/restaurants', {params: coordinates})
  //     .then((restaurants) => {setRestaurantData(restaurants.data);})
  //     .catch((err) => {console.log('AxiosError: ', err)})
  //   axios.get('/rentals', {params: coordinates})
  //     .then((rentals) => {setRentalData(rentals.data);})
  //     .catch((err) => {console.log('AxiosError: ', err)})
  // }, [state.searchedLocation])

  const onLocationChange = (lat, lng) => {
    setState((prevState) => {return {...prevState, searchedLocation: {lat: lat, lng: lng}}})
  }

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED WITH UPDATED COORDINATES (state.searchedLocation)
  useEffect(() => {
    console.log('new place clicked', state.searchedLocation)
  }, [state.searchedLocation])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prevState) =>  { return {...prevState,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        })
        }, (err) => {console.log(err)}
      )
    } else {
      err => console.log(err)
    }
  }

  const convertAddressToCoords = (address) => {
    Geocode.fromAddress(address)
      .then((response) => {
        setState((prevState) => { return {...prevState, userAddressLocation: response.results[0].geometry.location}})
      })
      .catch((err) => {console.log(err)})
  }

  // on component mount, find userLocation and coords for their address
  useEffect(() => {
    getUserLocation();
    convertAddressToCoords(state.userAddress);
  }, [])
=======
import React from 'react';
import {BrowserRouter, Route, Routes, Switch, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import Home from './Home.jsx';
import UserProfile from './UserProfile.jsx';
import Cart from './Cart.jsx';


const App = () => {
>>>>>>> 3053f45f5e170cb0cceb074e83cbb60f805dfe2f

  return (
    <BrowserRouter>
      <div>
        <nav className="navigation">
              <Link to="/">
                <FontAwesomeIcon icon={faHome} size="3x"/>
              </Link>
              <Link to="/user">
                <FontAwesomeIcon icon={faUser} size="3x"/>
              </Link>
              <Link to="/search">
                <FontAwesomeIcon icon={faSearch} size="3x"/>
              </Link>
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} size="3x"/>
              </Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;