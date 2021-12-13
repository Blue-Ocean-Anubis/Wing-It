import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
//test
export default class AutoCompleteMapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        // Updating location based on selected search dropdown. Will trigger axios call to populate data.
        this.props.onLocationChange(latLng.lat, latLng.lng);
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const searchOptions = {
      // location: new google.maps.LatLng(-34, 151),
      // radius: 2000,
      types: ['(cities)']
    }
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
        className='autocomplete'
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='search-container'>
            <input
              {...getInputProps({
                placeholder: 'What city would you like to visit?',
                className: 'location-search-input'
                //need to figure out how to change value here so
                //what the user types will stay on screen after clicking
                //from drop down menu (or rather update what is in searchbar
                //to reflect the option chosen)
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
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