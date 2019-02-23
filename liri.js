// add packages
// load a .env that holds API keys into process.env
require("dotenv").config();

// using the node-spotify-api module
var Spotify = require("node-spotify-api");

// using Axios for web API calls
var axios = require(`axios`);

// store your spotify API keys in this file
var keys = require(`./keys`);

console.log("packages loaded");

var arg1 = process.argv[2];
var arg2 = process.argv[3];

// hardcoded args for testing
arg1 = "movie-this";
arg2 = "the biggest terminator";

// this app can take in four commands:
// 1. `concert-this`
//    this command will search the bands-in-town API for an artist and output the following information for each event:
//      1. name of the venue
//      2. venue location
//      3. date of the event (use moment format MM/DD/YYY)

// 2. `spotify-this-song`
//    this will search for a song and output:
//      1. Artist(s)
//      2. Song name
//      3. preview link of the song
//      4. album the song is from
//    * if there is no song provided, default search is for "The Sign" by Ace of Base
var spotifyThis = function(song) {
  let spotify = new Spotify(keys.spotify);
  // check the song argument 
  if (song) {
    // song is not undefined, just search for it
    //console.log("true");
  } else {
    console.log(`No song argument provided, searching for "The Sign"`);
    song = "The Sign";
  }

  spotify
    .search({ type: "track", query: song })
    .then(function(response) {
      let myTrack = response.tracks.items[0];
      // log the Artist(s)
      for(let i=0; i<myTrack.artists.length; i++) {
        console.log(`Artist: ${myTrack.artists[i].name}`);
      };
      // log the song's name
      console.log(`Song Title: ${myTrack.name}`);
      // log a preview link to the song on Spotify
      console.log(`Preview Link: ${myTrack.external_urls.spotify}`);
      // log the album
      console.log(`Album: ${myTrack.album.name}`)
    })
    .catch(function(err) {
      console.log(err);
    });
};

// 3. `movie-this`
//    This will search for a movie from omdbAPI and output:
//      * Title of the movie.
//      * Year the movie came out.
//      * IMDB Rating of the movie.
//      * Rotten Tomatoes Rating of the movie.
//      * Country where the movie was produced.
//      * Language of the movie.
//      * Plot of the movie.
//      * Actors in the movie.
//    * if no movie provided, search for "Mr. Nobody"
let movieThis = function(movie) {
  console.log(`movieThis(${movie})`);
  if (movie) {
    // song is not undefined, just search for it
    //console.log("true");
  } else {
    console.log(`No movie argument provided, searching for "Mr. Nobody"`);
    movie = "Mr. Nobody";
  }

  let url = `http://www.omdbapi.com/?apikey=${keys.omdb.apiKey}&t=${movie.replace(/ /g, `+`)}`;

  axios.get(url)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}


// 4. `do-what-it-says`
//    This will use the 'fs' node package to read in from random.txt and execute that command

switch (arg1) {
  case "concert-this":
    console.log(`searching for concerts by: ${arg2}`);
    break;

  case "spotify-this-song":
    console.log(`Results powered by Spotify API`);
    spotifyThis(arg2);
    break;

  case "movie-this":
    console.log(`Results powered by OMDB Web API`);
    movieThis(arg2);
    break;

  case "do-what-it-says":
    console.log(`reading random.txt for commands`);

    break;

  default:
    console.log(
      `Unrecognized command, options are: "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says"`
    );
}
