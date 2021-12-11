import React, {useState, useEffect} from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY)
Geocode.setLocationType("ROOFTOP")
import GoogleMap from './GoogleMap.jsx';
import SearchBox from './SearchBox.jsx';
import List from './List.jsx';
import AirportDetails from './AirportDetails.jsx';
import axios from 'axios';


const App = () => {
  const [state, setState] = useState ({
    searchedLocation: {},
    userLocation: {},
    userAddressLocation: {},
    userAddress: TEST_USER_ADDRESS, // placeholder - will have to insert user address here
    searchBoxText: 'Search a City!'
  })
  const [airportData, setAirportData] = useState([]);

  const onLocationChange = (lat, lng) => {
    setState((prevState) => {return {...prevState, searchedLocation: {lat: lat, lng: lng}}})
  }

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED WITH UPDATED COORDINATES (state.searchedLocation)
  useEffect(() => {
    console.log('new place clicked', state.searchedLocation)
    const airportParams = {lat: state.searchedLocation.lat,long: state.searchedLocation.lng};
    axios.get('/latLongNearestAirport', {params: airportParams})
      .then((airports) => {setAirportData(airports.data);})
      .catch((err) => {console.log(error)})
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
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <GoogleMap searchedLocation={state.searchedLocation} userLocation={state.userLocation} userAddressLocation={state.userAddressLocation} onLocationChange={onLocationChange}/>
      </div>
      <div key='airport-list-component' className='airport-list-component'>
      <AirportDetails airports={airportData} />
      </div>
    </div>
  )
}

export default App;