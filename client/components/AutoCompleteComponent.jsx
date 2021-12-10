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
      <GooglePlacesAutocomplete
      //  apiOptions={{ language: 'fr', region: 'fr' }}
        // selectProps={{
        //   styles: {
        //     input: (provided) => ({
        //       ...provided,
        //       color: 'blue',
        //     }),
        //     option: (provided) => ({
        //       ...provided,
        //       color: 'blue',
        //     }),
        //     singleValue: (provided) => ({
        //       ...provided,
        //       color: 'blue',
        //     }),

        //     types: (provided) => ({
        //       ...provided,
        //       types: 'cities',
        //     }),
        //   },
        // }}
      />
    </div>
  );
}
export default AutoCompleteComponent;