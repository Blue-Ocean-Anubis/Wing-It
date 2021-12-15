import React, { useState, useEffect, useContext } from "react";
import Geocode from "react-geocode";
import { GOOGLE_API_KEY, TEST_USER_ADDRESS } from "../../config.js";
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLocationType("ROOFTOP");
import GoogleMap from "./GoogleMap.jsx";
import AirportDetails from "./AirportDetails.jsx";
import PointsOfInterest from "./PointsOfInterest.jsx";
import RentalDetails from "./RentalDetails.jsx";
import RestaurantDetails from "./RestaurantDetails.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";
import axios from "axios";
import { Button } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Nav from "./Nav.jsx";
import Offcanvas from 'react-bootstrap/Offcanvas';
import OffcanvasHeader from 'react-bootstrap/OffcanvasHeader';
import OffcanvasTitle from 'react-bootstrap/OffcanvasTitle';
import OffcanvasBody from 'react-bootstrap/OffcanvasBody';

const Home = () => {
  const [userLocation, setUserLocation] = useState({});
  const [userAddress, setUserAddress] = useState({
    string: TEST_USER_ADDRESS,
    coordinates: {},
  });
  // TEST_USER_ADDRESS is placeholder - will have to insert user address here
  const [searchedLocation, setSearchedLocation] = useState({
    city: "",
    coordinates: {},
  });
  const [restaurantData, setRestaurantData] = useState([]);
  const [rentalData, setRentalData] = useState([]);
  const [airportData, setAirportData] = useState([]);
  const [points, setPoints] = useState([]);
  const [show, setShow] = useState(false);

  //SEARCH BAR OFFCANVAS CLICK HANDLER
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useEffect(() => {

  // }, [show])


  const [currentTab, setCurrentTab] = useState('');

  // ON MAP CLICK, ADD COORDS AND CITY/COUNTRY TO SEARCHED LOCATION STATE
  const onLocationChange = (lat, lng) => {
    Geocode.fromLatLng(lat.toString(), lng.toString())
      .then((response) => {
        setSearchedLocation({
          city: response.plus_code.compound_code.substring(9),
          coordinates: { lat: lat, lng: lng },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // MAKE YOUR SERVER REQUESTS HERE, WILL EXECUTE WHEN NEW LOCATION IS CLICKED
  useEffect(() => {
    console.log("new place clicked", searchedLocation);

    let cityData, location;
    if (searchedLocation.city) {
      cityData = searchedLocation.city.split(', ');
      location = {
        lat: searchedLocation.coordinates.lat,
        lng: searchedLocation.coordinates.lng,
        city: cityData[0],
        state: (cityData[2] ? cityData[1] : ''),
        country: (cityData[2] ? cityData[2] : cityData[1])
      };
    } else { // IF NOTHING YET SEARCHED, DEFAULT TO USER ADDRESS
      cityData = userAddress.string.split(', ');
      location = {
        lat: userAddress.coordinates.lat,
        lng: userAddress.coordinates.lng,
        city: cityData[0],
        state: (cityData[2] ? cityData[1] : ''),
        country: (cityData[2] ? cityData[2] : cityData[1])
      };
    }

    axios
      .get("/restaurants", { params: location })
      .then((restaurants) => {
        setRestaurantData(restaurants.data);
      })
      .catch((err) => {
        console.log("AxiosError: ", err);
      });

    axios
      .get("/rentals", { params: location })
      .then((rentals) => {
        setRentalData(rentals.data);
      })
      .catch((err) => {
        console.log("AxiosError: ", err);
      });

    axios
      .get("/latLongNearestAirport", { params: location })
      .then((airports) => {
        setAirportData(airports.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/POI", { params: location })
      .then((points) => {
        setPoints(points.data);
      })
      .catch((err) => {
        console.log("Axios Error: ", err);
      });
  }, [searchedLocation, userAddress]);

  // GET USER LOCATION DATA
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      (err) => console.log(err);
    }
  };

  // TURN USER ADDRESS INTO COORDINATES
  const convertAddressToCoords = (address) => {
    Geocode.fromAddress(address)
      .then((response) => {
        setUserAddress({
          string: TEST_USER_ADDRESS,
          coordinates: response.results[0].geometry.location,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ON COMPONENT MOUNT, FIND USERLOCATION AND COORDS FOR THEIR ADDRESS
  useEffect(() => {
    convertAddressToCoords(userAddress.string);
    getUserLocation();
  }, []);

  useEffect(() => {
    // console.log('rentals: ', rentalData, '\nrestaurants: ', restaurantData, '\nairports: ', airportData,
    // '\nPOIs', points)
  });

  const handleTabSelect = (event) => {
    // console.log(event)
    setCurrentTab(event);
  }

  return (
    <div className="page">
      {/* <SearchBox placeholder={state.searchBoxText} onPlacesChanged={onPlacesChanged}/> */}
      <Nav handleShow={handleShow} show={show}/>
      <GoogleMap
        handleClose={handleClose}
        show={show}
        searchedLocation={searchedLocation}
        userLocation={userLocation}
        userAddressLocation={userAddress.coordinates}
        onLocationChange={onLocationChange}
        restaurants={restaurantData}
        rentals={rentalData}
        airports={airportData}
        POIs={points}
        currentTab={currentTab}
      />
      <Container className="tabs-container container">
        <Tabs
          defaultActiveKey="airports"
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={handleTabSelect}
        >
          <Tab eventKey="airports" title="Airports">
            <AirportDetails airports={airportData} />
          </Tab>
          <Tab eventKey="rentals" title="Rentals" >
            <RentalDetails rentals={rentalData} />
          </Tab>
          <Tab eventKey="restaurants" title="Restaurants" >
            <RestaurantDetails restaurants={restaurantData} />
          </Tab>
          <Tab eventKey="POIs" title="Points of Interest" >
            <PointsOfInterest points={points} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Home;
