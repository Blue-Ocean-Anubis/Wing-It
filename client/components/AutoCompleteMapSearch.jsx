import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class AutoCompleteMapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      text: ''
    };
  }

  handleChange = address => {
    this.setState({address});
  };

  handleSelect = address => {
    this.setState({address});
 
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // Updating location based on selected search dropdown. Will trigger axios call to populate data.
        this.props.onLocationChange(latLng.lat, latLng.lng);
      })
      .catch(error => console.error('Searchbar geocode address error: ', error));
  };

  handleTextChange=text=>{
    this.setState({text});
  };

  render() {
    const searchOptions = {
      types: ['(cities)']
    }
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='search-container'>
            <input
              onChange={this.handleTextChange}
              {...getInputProps({
                placeholder: 'What city would you like to visit?',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                  key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}