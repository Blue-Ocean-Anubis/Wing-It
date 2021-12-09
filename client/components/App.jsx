import React, {useState, useEffect} from 'react';
import GoogleMap from './GoogleMap.jsx';
import SearchBox from './SearchBox.jsx';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render () {
//     return (
//       <div>
//         <GoogleMap />
//         Hello There!
//       </div>
//     )
//   }
// }

const App = () => {
  const [state, setState] = useState ({
    location: {lat: 39.0997, lng: -94.5786},
    searchBoxText: 'Search a City!'
  })

  const onPlacesChanged = (input) => {
    console.log(input);
  }

  const onLocationChange = (lat, lng) => {
    setState((prevState) => {return {...prevState, location: {lat: lat, lng: lng}}})
  }

  useEffect(() => {
    console.log(state)
  })

  return (
    <div>
      <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/>
      <GoogleMap location={state.location} onLocationChange={onLocationChange}/>
    </div>
  )
}

export default App;