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

const { restaurant, airport, pointsOfInterest, rental, user } =
  require("../db/schema").module;

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

  if (lat === undefined || lng === undefined) {
    return res.send([]);
  }
  let restaurants;
  try {
    restaurants = await restaurant.getRestaurant({
      city: city,
      state: state,
      country: country,
    });
  } catch (err) {
    restaurants = null;
    console.log(err);
  }

  if (restaurants !== null) {
    res.send(JSON.parse(restaurants.apiResult));
    return;
  }

  client
    .textSearch({
      params: {
        query: "restaurant",
        location: {
          lat: lat,
          lng: lng,
        },
        maxprice: 4,
        minprice: 3,
        key: GOOGLE_API_KEY,
      },
    })
    .then(async (r) => {
      try {
        await restaurant.saveRestaurant({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(r.data.results),
        });
      } catch (err) {
        console.log(err);
      }
      res.send(r.data.results);
    })
    .catch((e) => {
      console.log("ERROR: ", e);
      res.send("Error loading restaurants.");
    });
});

/******************CAR RENTALS WITHIN CITY********************/
app.get("/rentals", async (req, res) => {
  // May need to be altered based on front end inputs
  const { lat, lng, city, state = "N/A", country } = req.query;

  if (lat === undefined || lng === undefined) {
    return res.send([]);
  }

  let rentals;

  try {
    rentals = await rental.getRental({
      city: city,
      state: state,
      country: country,
    });
  } catch (err) {
    rentals = null;
    console.log(err);
  }

  if (rentals !== null) {
    res.send(JSON.parse(rentals.apiResult));
    return;
  }

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
    .then(async (r) => {
      try {
        await rental.saveRental({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(r.data.results),
        });
      } catch (err) {
        console.log(err);
      }
      res.send(r.data.results);
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
app.get("/latLongNearestAirport", async (req, res) => {
  const { lat, lng, city, state = "N/A", country } = req.query;

  if (lat === undefined || lng === undefined) {
    return res.send([]);
  }

  let airports;
  try {
    airports = await airport.getAirport({
      city: city,
      state: state,
      country: country,
    });
  } catch (err) {
    airports = null;
    console.log(err);
  }

  if (airports !== null) {
    res.send(JSON.parse(airports.apiResult));
    return;
  }

  amadeus.referenceData.locations.airports
    .get({
      longitude: lng,
      latitude: lat,
      radius: 500,
      "page[limit]": 10,
      sort: "distance",
    })
    .then(async function (response) {
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
      try {
        await airport.saveAirport({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(responseData),
        });
      } catch (err) {
        console.log(err);
      }
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
app.get("/POI", async (req, res) => {
  const { lat, lng, city, state = "N/A", country } = req.query;

  if (lat === undefined || lng === undefined) {
    return res.send([]);
  }
  let poi;
  try {
    poi = await pointsOfInterest.getPointsOfInterest({
      city: city,
      state: state,
      country: country,
    });
  } catch (err) {
    poi = null;
    console.log(err);
  }

  if (poi !== null) {
    res.send(JSON.parse(poi.apiResult));
    return;
  }
  client
    .textSearch({
      params: {
        query: "point_of_interest",
        location: {
          lat: lat,
          lng: lng,
        },
        key: GOOGLE_API_KEY,
      },
    })
    .then(async (r) => {
      try {
        await pointsOfInterest.savePointsOfInterest({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(r.data.results),
        });
      } catch (err) {
        console.log(err);
      }
      res.send(r.data.results);
    })
    .catch((e) => {
      console.log("ERROR: ", e);
      res.send("Error loading POIs.");
    });
});
//   amadeus.referenceData.locations.pointsOfInterest
//     .get({
//       latitude: lat,
//       longitude: lng,
//       radius: 20,
//     })
//     .then(function (response) {
//       let poiData = JSON.parse(response.body);
//       let poiResponse = [];
//       poiData.data.map((poi) => {
//         let poiDetail = {
//           location: poi.geoCode,
//           name: poi.name,
//           category: poi.category,
//           rank: poi.rank,
//           tags: poi.tags,
//         };
//         poiResponse.push(poiDetail);
//       });
//     })
//     .then(async function (response) {
//       let poiData = JSON.parse(response.body);
//       let poiResponse = [];
//       poiData.data.map((poi) => {
//         let poiDetail = {
//           location: poi.geoCode,
//           name: poi.name,
//           category: poi.category,
//           rank: poi.rank,
//           tags: poi.tags,
//         };
//         poiResponse.push(poiDetail);
//       });
//       await pointsOfInterest.savePointsOfInterest({
//         city: city,
//         state: state,
//         country: country,
//         coordinates: {
//           latitude: lat,
//           longitude: lng,
//         },
//         dateAdded: Date.now(),
//         apiResult: JSON.stringify(poiResponse),
//       });
//       res.send(poiResponse);
//     })
//     .catch(function (response) {
//       res.status(404).send(response);
//     });
// });

// setTimeout(dbRefresher, 1000);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// async function dbRefresher() {
//   const now = Date.now();
//   const airports = await airport.getAirports();
//   airports.forEach((airport) => {
//     if (now - airport.dateAdded > 86400000) {
//       console.log("updated over a day ago");
//       amadeus.referenceData.locations.airports
//         .get({
//           longitude: airport.coordinates[0].longitude,
//           latitude: airport.coordinates[0].latitude,
//           radius: 500,
//           "page[limit]": 10,
//           sort: "distance",
//         })
//         .then(async function (response) {
//           /**lat long and airport name */
//           let airportData = JSON.parse(response.body);
//           let responseData = [];
//           airportData.data.map((airport) => {
//             let airportDetail = {
//               location: airport.geoCode,
//               city: airport.address.cityName,
//               country: airport.address.countryName,
//               name: airport.name,
//             };
//             responseData.push(airportDetail);
//           });
//           airport.UpdateAirport({ _id: airport._id,
//         })
//         .catch(function (response) {
//           console.log(response);
//         });
//     }
//   });
//   setTimeout(dbRefresher, 60000);
// }
