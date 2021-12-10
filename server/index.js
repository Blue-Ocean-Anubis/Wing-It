require("dotenv").config();
const { GOOGLE_API_KEY } = require('../config.js');
const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({});

require("../db");
const express = require("express");
const app = express();

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

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
