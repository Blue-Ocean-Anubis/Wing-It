import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

// var apiOptions={
//   language: 'fr',
//   region: 'fr'
// };

const AutoCompleteComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <div>
      <GooglePlacesAutocomplete/>
    </div>
  );
}
export default AutoCompleteComponent;