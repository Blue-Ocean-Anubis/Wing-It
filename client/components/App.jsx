// import React from 'react';
import SearchBar from './SearchBar.jsx';
import Autocomplete from "react-google-autocomplete";
import React, {useState, useEffect} from 'react';
import GoogleMap from './GoogleMap.jsx';
import SearchBox from './SearchBox.jsx';


const App = () => {
  const [state, setState] = useState ({
    location: {lat: 39, lng: -94},
    searchBoxText: 'Search a City!'
  })

  const onPlacesChanged = (input) => {
    // console.log(input);
  }

  const onLocationChange = (lat, lng) => {
    setState((prevState) => {return {...prevState, location: {lat: lat, lng: lng}}})
  }

  // handleSearch(query){
  //   console.log('query: ', query)
  //   // axios.post('route here', query)
  //   // .then((response)=>{
  //   //   console.log(response);
  //   // })
  //   // .catch((err)=>{
  //   //   console.log(err);
  //   // })
  // }

  render () {

    return (
      <div>
        Hello There!
        <SearchBar handleSearch={this.handleSearch.bind(this)}></SearchBar>
        import Autocomplete from "react-google-autocomplete";

<Autocomplete
  apiKey={YOUR_GOOGLE_MAPS_API_KEY}
  onPlaceSelected={(place) => {
    console.log(place);
  }}
/>;
      </div>
    )
  const showCurrentLocation = () => {
    // console.log('finding user position', navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('position: ', position);
          setState((prevState) =>  { return {
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }
        })
        }, (err) => {console.log(err)}
      )
    } else {
      error => console.log(error)
    }
  }

  useEffect(() => {
    // console.log(' initial load: ', state)
    showCurrentLocation();
  }, [])

  useEffect(() => {
    // console.log('updating App state: ', state)
  })

  return (
    <div>
      <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/>
      <GoogleMap location={state.location} onLocationChange={onLocationChange}/>
    </div>
  )
}

export default App;