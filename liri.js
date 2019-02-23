// add packages
// load a .env that holds API keys into process.env
require("dotenv").config();

// using the node-spotify-api module
var Spotify = require('node-spotify-api');

// using Axios for web API calls
var axios = require(`axios`);

// store your spotify API keys in this file
var keys = require(`./keys`) ;

console.log("packages loaded");

// spotify testing

var spotify = new Spotify(keys.spotify);
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });