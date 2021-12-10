import React, {useState, useEffect} from 'react';
import Geocode from 'react-geocode';
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from '../../config.js';
Geocode.setApiKey(GOOGLE_API_KEY)
Geocode.setLocationType("ROOFTOP")
import GoogleMap from './GoogleMap.jsx';
import SearchBox from './SearchBox.jsx';


const App = () => {
  const [state, setState] = useState ({
    searchedLocation: {},
    userLocation: {},
    userAddressLocation: {},
    userAddress: TEST_USER_ADDRESS, // placeholder - will need to set this to be geocoded form address string to lat/lng object,
    searchBoxText: 'Search a City!'
  })

  const onLocationChange = (lat, lng) => {
    setState((prevState) => {return {...prevState, searchedLocation: {lat: lat, lng: lng}}})
  }

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

  useEffect(() => {
    // console.log(' initial load: ', state)
    getUserLocation();
    convertAddressToCoords(state.userAddress);
  }, [])

  useEffect(() => {
    // console.log('updating App state: ', state)

  })

  return (
    <div>
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <GoogleMap searchedLocation={state.searchedLocation} userLocation={state.userLocation} userAddressLocation={state.userAddressLocation} onLocationChange={onLocationChange}/>
    </div>
  )
}

export default App;