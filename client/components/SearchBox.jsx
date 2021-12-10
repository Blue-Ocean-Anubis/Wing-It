import React, {useState, useEffect, useRef, useCallback} from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';

const SearchBox = ({ maps, onPlacesChanged, placeholder }) => {
  const input = useRef(null);
  const searchBox = useRef(null);

  console.log(searchBox.current);

  const handleOnPlacesChanged = useCallback(() => {
      if (onPlacesChanged) {
          onPlacesChanged(searchBox.current.getPlaces());
      }
  }, [onPlacesChanged, searchBox]);

  useEffect(() => {
      if (!searchBox.current && maps) {
          searchBox.current = new maps.places.SearchBox(input.current);
          searchBox.current.addListener('places_changed');
      }

      return () => {
          if (maps) {
              searchBox.current = null;
              maps.event.clearInstanceListeners(searchBox);
          }
      };
  }, [maps, handleOnPlacesChanged]);

  return <input ref={input} placeholder={placeholder} type="text" />;
};

export default SearchBox;



