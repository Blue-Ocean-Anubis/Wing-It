import React from 'react';
import SearchBar from './SearchBar.jsx';
import Autocomplete from "react-google-autocomplete";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearch(query){
    console.log('query: ',query);
    // axios.post('route here', query)
    // .then((response)=>{
    //   console.log(response);
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
  }

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
  }
}

export default App;