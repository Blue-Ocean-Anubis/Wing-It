const Places = require('google-places-web');
const GOOGLE_API_KEY = require('../config.js');

Places.apiKey = GOOGLE_API_KEY;

async function run() {
  try {
    const response = await Places.textsearch({
      query: 'Sydney Austrailia'
    });

    console.log('Example Text Results', response.results[0]);
  } catch (error) {
    console.log('Error', error);
  }
}