require("dotenv").config();
const { GOOGLE_API_KEY } = require('../config.js');
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

require("../db");
const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios");
var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("dist"));

app.get('/restaurants', (req, res) => {
  client.findPlaceFromText({
    params: {
      input: 'Paris',
      inputtype: 'textquery',
      fields: ['name', 'place_id', 'geometry', 'types', 'formatted_address'],
      key: GOOGLE_API_KEY,
    },
    timeout: 1000, // milliseconds
  })
  .then((r) => {
    console.log('SUCCESS: ', r.data.candidates);
    res.send(r.data.candidates)
  })
  .catch((e) => {
    console.log('ERROR: ', e);
  });
})

/******************NEAREST AIRPORT TO LAT/LONG********************
 * 'lat': <latitude>
 *  'long': <longitude>
 * example query parameters: 'lat': 38.407524
 *                           'long': -89.764714
*/
app.get("/latLongNearestAirport", (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
amadeus.referenceData.locations.airports.get({
  longitude: long,
  latitude: lat,
  radius: 500,
  'page[limit]': 10,
  sort: 'distance'
}).then(function (response) {
  /**lat long and airport name */
  let airportData = JSON.parse(response.body);
  let responseData = [];
  airportData.data.map((airport) => {
    let airportDetail = {
      'location': airport.geoCode,
      'city': airport.address.cityName,
      'country': airport.address.countryName,
      'name': airport.name
    }
    responseData.push(airportDetail);
  })
  res.send(responseData);
}).catch(function (response) {
  res.status(404).send(response);
});
});

/********************** AIRPORT BY CITY NAME ***********************
 * 'city': 'CityNameHere'
 * example query parameters: 'city': 'Dallas'
*/

app.get('/cityNameAirport', (req, res) => {
  let city = req.query.city;
  amadeus.referenceData.locations.get({
    subType: 'AIRPORT',
    keyword: city
  })
  .then(function (response) {
    let airportData = JSON.parse(response.body);
    let responseData = [];
    airportData.data.map((airport) => {
      let airportDetail = {
        'location': airport.geoCode,
        'city': airport.address.cityName,
        'country': airport.address.countryName,
        'name': airport.name
      }
      responseData.push(airportDetail);
    })
    res.send(responseData);
  }).catch(function (response) {
    res.status(404).send(response);
  });
})


/********************POINT OF INTEREST***********************
 * Include in response: Geocode, name, category, rank, tags
 *  'lat': <latitude>
 *  'long': <longitude>
 * example query parameters: 'lat': 38.407524
 *                           'long': -89.764714
 */
app.get('/POI', (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;

  amadeus.referenceData.locations.pointsOfInterest.get({
    latitude: lat,
    longitude: long,
    radius: 20
  }).then(function (response) {
    let poiData = JSON.parse(response.body);
    let poiResponse = [];
    poiData.data.map((poi) => {
      let poiDetail = {
        'location': poi.geoCode,
        'name': poi.name,
        'category': poi.category,
        'rank': poi.rank,
        'tags': poi.tags
      }
      poiResponse.push(poiDetail);
    })
    res.send(poiResponse);
  }).catch(function (response) {
    res.status(404).send(response);
  });
})




app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
