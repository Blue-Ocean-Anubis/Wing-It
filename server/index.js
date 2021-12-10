const express = require('express');
const app = express();
const morgan = require("morgan");
const axios = require("axios");
var Amadeus = require("amadeus");
const config = require("../config.js");

var amadeus = new Amadeus({
  clientId: config.TOKEN.client,
  clientSecret: config.TOKEN.secret
});

const PORT = 3000;

app.use(express.json());
app.use(express.static('dist'));

/******************NEAREST AIRPORT TO LAT/LONG******************** */
app.get("/latLongNearestAirport", (req, res) => {
  let lat = req.query.lat;
  let long = req.query.long;
amadeus.referenceData.locations.airports.get({
  longitude: 2.55,
  latitude: 49.0000,
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

/********************POINT OF INTEREST***********************
 * Include in response: Geocode, name, category, rank, tags
 */
app.get('/POI', (req, res) => {
  amadeus.referenceData.locations.pointsOfInterest.get({
    latitude: 41.397158,
    longitude: 2.160873,
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
  console.log(`Listening on port: ${PORT}`)
});