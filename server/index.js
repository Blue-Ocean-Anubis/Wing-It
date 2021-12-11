require("dotenv").config();
const { GOOGLE_API_KEY } = require("../config.js");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

require("../db");
const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios");
var Amadeus = require("amadeus");
const { airport, restaurant, pointsOfInterest, rental, user } =
  require("../db/schema").module;
const { saveRestaurant } = require("../db/schema/restaurant.js");

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("dist"));

/******************RESTAURANTS WITHIN CITY********************/
app.get("/restaurants", async (req, res) => {
  // May need to be altered based on front end inputs
  const { lat, lng, city, state = "N/A", country } = req.query;

  // const restaurants = await restaurant.getRestaurant({
  //   city: city,
  //   state: state,
  //   country: country,
  // });

  client
    .textSearch({
      params: {
        query: "restaurant",
        location: {
          lat: lat,
          lng: lng,
        },
        maxprice: 4,
        minprice: 4,
        key: GOOGLE_API_KEY,
      },
    })
    .then(async (r) => {
      await restaurant.saveRestaurant({
        city: city,
        state: state,
        country: country,
        coordinates: {
          latitude: lat,
          longitude: lng,
        },
      });
      res.send(r.data);
    })
    .catch((e) => {
      console.log("ERROR: ", e);
      res.send("Error loading restaurants.");
    });
});

/******************CAR RENTALS WITHIN CITY********************/
app.get("/rentals", (req, res) => {
  // May need to be altered based on front end inputs
  const { lat, lng } = req.query;

  client
    .textSearch({
      params: {
        query: "car_rental",
        location: {
          lat: lat,
          lng: lng,
        },
        key: GOOGLE_API_KEY,
      },
    })
    .then((r) => {
      res.send(r.data);
    })
    .catch((e) => {
      console.log("ERROR: ", e);
      res.send("Error loading vehicle rentals.");
    });
});

/******************NEAREST AIRPORT TO LAT/LONG********************
 * 'lat': <latitude>
 *  'long': <longitude>
 * example query parameters: 'lat': 38.407524
 *                           'long': -89.764714
 */
app.get("/latLongNearestAirport", (req, res) => {
  const { lat, lng } = req.query;

  amadeus.referenceData.locations.airports
    .get({
      longitude: lat,
      latitude: lng,
      radius: 500,
      "page[limit]": 10,
      sort: "distance",
    })
    .then(function (response) {
      /**lat long and airport name */
      let airportData = JSON.parse(response.body);
      let responseData = [];
      airportData.data.map((airport) => {
        let airportDetail = {
          location: airport.geoCode,
          city: airport.address.cityName,
          country: airport.address.countryName,
          name: airport.name,
        };
        responseData.push(airportDetail);
      });
      res.send(responseData);
    })
    .catch(function (response) {
      res.status(404).send(response);
    });
});

/********************** AIRPORT BY CITY NAME ***********************
 * 'city': 'CityNameHere'
 * example query parameters: 'city': 'Dallas'
 */

app.get("/cityNameAirport", (req, res) => {
  const { city } = req.query;
  amadeus.referenceData.locations
    .get({
      subType: "AIRPORT",
      keyword: city,
    })
    .then(function (response) {
      let airportData = JSON.parse(response.body);
      let responseData = [];
      airportData.data.map((airport) => {
        let airportDetail = {
          location: airport.geoCode,
          city: airport.address.cityName,
          country: airport.address.countryName,
          name: airport.name,
        };
        responseData.push(airportDetail);
      });
      res.send(responseData);
    })
    .catch(function (response) {
      res.status(404).send(response);
    });
});

/********************POINT OF INTEREST***********************
 * Include in response: Geocode, name, category, rank, tags
 *  'lat': <latitude>
 *  'long': <longitude>
 * example query parameters: 'lat': 38.407524
 *                           'long': -89.764714
 */
app.get("/POI", (req, res) => {
  const { lat, lng } = req.query;
  amadeus.referenceData.locations.pointsOfInterest
    .get({
      latitude: lat,
      longitude: lng,
      radius: 20,
    })
    .then(function (response) {
      let poiData = JSON.parse(response.body);
      let poiResponse = [];
      poiData.data.map((poi) => {
        let poiDetail = {
          location: poi.geoCode,
          name: poi.name,
          category: poi.category,
          rank: poi.rank,
          tags: poi.tags,
        };
        poiResponse.push(poiDetail);
      });
      res.send(poiResponse);
    })
    .catch(function (response) {
      res.status(404).send(response);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
