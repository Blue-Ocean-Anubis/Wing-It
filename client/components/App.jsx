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

  return (
    <div>
      <div key='MapComponent' className='map'>
      <GoogleMap searchedLocation={state.searchedLocation} userLocation={state.userLocation} userAddressLocation={state.userAddressLocation} onLocationChange={onLocationChange}/>
      </div>
      <div key='ListComponent' className='list'>
    <List list={['a', 'b', 'C', 'D']} />
      </div>
    </div>
  )
}

export default App;