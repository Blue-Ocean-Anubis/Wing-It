require("dotenv").config();
const { GOOGLE_API_KEY } = require("../config.js");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const Promise = require("bluebird");
const path = require("path");

require("../db");
const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios");
var Amadeus = require("amadeus");

const { restaurant, airport, pointsOfInterest, rental, user } =
  require("../db/schema").module;
const { Card } = require("react-bootstrap");
const { markAsUntransferable } = require("worker_threads");
const { send } = require("process");

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("dist"));

const getDetails = (placeId) => {
  return client.placeDetails({
    params: {
      place_id: placeId,
      fields: [
        "name",
        "rating",
        "price_level",
        "rating",
        "international_phone_number",
        "website",
      ],
      key: GOOGLE_API_KEY,
    },
  });
};

const detailDecorator = async (resultsArray, limit) => {
  let details = [];
  limit = limit || 5;

  resultsArray = resultsArray
    .sort(function (a, b) {
      return a["user_ratings_total"] - b["user_ratings_total"];
    })
    .reverse();

  resultsArray.forEach((result, i) => {
    if (i < limit) {
      details.push(getDetails(result.place_id));
    }
  });

  details = await Promise.all(details);
  details = details.map((response) => {
    return response.data.result;
  });

  for (let i = 0; i < resultsArray.length; i++) {
    resultsArray[i]["details"] = details[i];
  }

  return resultsArray;
};

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
        query: `${city} fine dining`,
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
        const results = await detailDecorator(r.data.results);
        await restaurant.saveRestaurant({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(results),
        });
        res.send(results);
      } catch (err) {
        console.log(err);
      }
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
        query: `${city} exotic car rental`,
        location: {
          lat: lat,
          lng: lng,
        },
        key: GOOGLE_API_KEY,
      },
    })
    .then(async (r) => {
      try {
        const results = await detailDecorator(r.data.results);
        await rental.saveRental({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(results),
        });
        res.send(results);
      } catch (err) {
        console.log(err);
      }
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
          code: airport.iataCode,
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
        res.send(responseData);
      } catch (err) {
        console.log(err);
      }
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
          code: airport.iataCode,
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
        query: `${city} point of interest`,
        location: {
          lat: lat,
          lng: lng,
        },
        key: GOOGLE_API_KEY,
      },
    })
    .then(async (r) => {
      try {
        const results = await detailDecorator(r.data.results);
        await pointsOfInterest.savePointsOfInterest({
          city: city,
          state: state,
          country: country,
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
          dateAdded: Date.now(),
          apiResult: JSON.stringify(results),
        });
        res.send(results);
      } catch (err) {
        console.log(err);
      }
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

app.post("/register", async (req, res) => {
  const {
    uid,
    firstName,
    lastName,
    email,
    street,
    city,
    state = "N/A",
    country,
    zipCode,
  } = req.body;
  console.log(req.body);
  try {
    await user.saveUser({
      _id: uid,
      firstName,
      lastName,
      email,
      address: {
        street,
        city,
        state,
        country,
        zipCode,
      },
    });
    res.send("COOL!");
  } catch (err) {
    console.error(err);
  }
});
// user info:

app.put("/toggleCart", async (req, res) => {
  const { uid, cartItem } = req.body;
<<<<<<< HEAD
=======
  console.log(cartItem, "<<");
>>>>>>> dev
  try {
    const userData = await user.getUser({ _id: uid });

    if (userData.cart.includes(cartItem)) {
      console.log("Item is here!");
      const itemIndex = userData.cart.indexOf(cartItem);
      userData.cart.splice(itemIndex, 1);
      await user.updateUser(uid, { cart: [...userData.cart] });
      res.status(204).send("Item removed!");
    } else {
      await user.updateUser(uid, { cart: [...userData.cart, cartItem] });
      res.status(200).send("Item Added!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/cart", async (req, res) => {
  const { uid } = req.query;
  try {
    const userData = await user.getUser({ _id: uid });
    let cart = [];
    for (let item of userData.cart) {
      cart.push(JSON.parse(item));
    }
    res.send(cart);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/user/:uid", async (req, res) => {
  try {
    res.send(await user.getUser({ _id: req.params.uid }));
  } catch (error) {
    res.status(500).send(error);
  }
});

// setTimeout(dbRefresher, 1000);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./../dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// turn each item in the lists into a tile.
// each tile will have a different
