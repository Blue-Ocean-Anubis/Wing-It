require("dotenv").config();

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

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
