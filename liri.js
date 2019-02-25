// add packages
// load a .env that holds API keys into process.env
require("dotenv").config();

// using the node-spotify-api module
var Spotify = require("node-spotify-api");

// using Axios for web API calls
var axios = require(`axios`);

// using momentjs to manipulate the date and time
var moment = require(`moment`);

var fs = require(`fs`);

// store your spotify API keys in this file
var keys = require(`./keys`);

// 1. `concert-this`
//    this command will search the bands-in-town API for an artist and output the following information for each event:
//      1. name of the venue
//      2. venue location
//      3. date of the event (use moment format MM/DD/YYY)
// var queryUrl = "https://rest.bandsintown.com/artists/" + searchName + "/events?app_id=codingbootcamp";
var concertThis = function(band) {
  if (band) {
    // a band name was passed
    console.log("good name");
  } else {
    // no band name
    band = "Metallica";
  }

  band = band.replace(/ /g, `%20`);
  let url = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;

  axios
    .get(url)
    .then(function(response) {
      console.log("Concert Results Powered by BandsInTown");
      if (response.data.length > 0) {
        for (let i = 0; i < response.data.length; i++) {
          console.log(`Event ${i + 1}`);
          // log the name of the venue
          console.log(`Venue: ${response.data[i].venue.name}`);
          // log the venue location: city, country
          console.log(
            `Location: ${response.data[i].venue.city}, ${
              response.data[i].venue.country
            }`
          );
          // log the date of the event
          console.log(
            `Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`
          );
        }
      } else {
        console.log("No events found for that name.");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

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
      console.log(`Results powered by Spotify API`);
      let myTrack = response.tracks.items[0];
      // log the Artist(s)
      for (let i = 0; i < myTrack.artists.length; i++) {
        console.log(`Artist: ${myTrack.artists[i].name}`);
      }
      // log the song's name
      console.log(`Song Title: ${myTrack.name}`);
      // log a preview link to the song on Spotify
      console.log(`Preview Link: ${myTrack.external_urls.spotify}`);
      // log the album
      console.log(`Album: ${myTrack.album.name}`);
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
  // console.log(`movieThis(${movie})`);
  if (movie) {
    // song is not undefined, just search for it
    //console.log("true");
  } else {
    console.log(`No movie argument provided, searching for "Mr. Nobody"`);
    movie = "Mr. Nobody";
  }

  let url = `http://www.omdbapi.com/?apikey=${
    keys.omdb.apiKey
  }&s=${movie.replace(/ /g, `+`)}`;
  axios
    .get(url)
    .then(function(response) {
      console.log(`Results powered by OMDB Web API`);
      // console.log(response);
      if (!response.data) {
        console.log("Movie not found, try searching again...");
      } else {
        // good response, log out the stuff
        let myMovie = response.data.Search[0];
        axios
          .get(
            `http://www.omdbapi.com/?apikey=${
              keys.omdb.apiKey
            }&t=${myMovie.Title.replace(/ /g, `+`)}`
          )
          .then(function(response) {
            //console.log(response.data);
            let myMovie = response.data;
            console.log(`Title: ${myMovie.Title}`);
            console.log(`Year: ${myMovie.Year}`);
            for (let i = 0; i < myMovie.Ratings.length; i++) {
              console.log(
                `${myMovie.Ratings[i].Source} rated this: ${
                  myMovie.Ratings[i].Value
                }`
              );
            }
            console.log(`Produced in: ${myMovie.Country}`);
            console.log(`Language: ${myMovie.Language}`);
            console.log(`Plot: ${myMovie.Plot}`);
            console.log(`Actors: ${myMovie.Actors}`);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

// 4. `do-what-it-says`
//    This will use the 'fs' node package to read in from random.txt and execute that command
var doWhatItSays = function() {
  // read the file and execute that command
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(`reading random.txt for commands`);

    data.split(`\r\n`).forEach(function(element) {
      if (element.length > 0) {
        let args = element.split(`,`);
        processArgs(args[0], args[1]);
      }
    });
  });
};

var processArgs = function(arg1, arg2) {
  switch (arg1) {
    case "concert-this":
      concertThis(arg2);
      break;

    case "spotify-this-song":
      spotifyThis(arg2);
      break;

    case "movie-this":
      movieThis(arg2);
      break;

    case "do-what-it-says":
      doWhatItSays();
      break;

    default:
      console.log(
        `Unrecognized command, options are: "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says"`
      );
  }
};

// main code execution here
processArgs(process.argv[2], process.argv[3]);
