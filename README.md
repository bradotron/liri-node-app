# Welcome to the ReadMe for Brad's LIRI App
This goal of this app is to interface with three API's, so the user can search for movies, bands, or songs. The user will interface with the app on the command line.

## How to use the App
The user interfaces with the app via the command line. The user passes a command and a search term as arguments. There are four possible commands for the app: 

1. "concert-this"
2. "spotify-this-song"
3. "movie-this"
4. "do-what-it-says"

### Example Command and Output

```
  $ node liri movie-this "The Terminator"
  packages loaded`
  Results powered by OMDB Web API
  Title: The Terminator
  Year: 1984
  Internet Movie Database rated this: 8.0/10
  Rotten Tomatoes rated this: 100%
  Metacritic rated this: 84/100
  Produced in: UK, USA
  Language: English, Spanish
  Plot: A seemingly indestructible android is sent from 2029 to 1984 to assassinate a waitress, whose unborn son will lead humanity in a war against the machines, while a soldier from that war is sent to protect her at all costs.
  Actors: Arnold Schwarzenegger, Michael Biehn, Linda Hamilton, Paul Winfield
```

### Link to YouTube example video:
  * https://youtu.be/rO-u9_1aidY

## Commands in Detail

1. "concert-this"
  * This command will search for any upcoming events for the band name that is passed as a second argument. 

  * If no band name is passed, this function will default to "Taylor Swift"

  * Example: 
  ```
  $ node liri concert-this "Red Hot Chili Peppers"
  searching for concerts by: Red+Hot+Chili+Peppers
  Event 1
  Venue: Brisbane Entertainment Centre
  Location: Boondall, Australia
  Date: 02/25/2019
  ```

  * Note: For band names that are multiple words, you must put double quotes around the band name. Refer to the example for proper syntax.

2. "spotify-this-song"
  * This command will search for the song that is passed as argument two to the function. This function uses the spotify API, with the Tracks endpoint.

  * If no song name is passed, this function will default to "The Sign"

  * Example: 
  ```
  $ node liri spotify-this-song "Shake It Off"
  Results powered by Spotify API
  Artist: Taylor Swift
  Song Title: Shake It Off
  Preview Link: https://open.spotify.com/track/5xTtaWoae3wi06K5WfVUUH
  Album: 1989
  ```

  * Note: For song names that are multiple words, you must put double quotes around the song name. Refer to the example for proper syntax.

3. "movie-this"
  * This command will search for a movie with the title that is passed as the second argument. The function will return the first search result from the omdbAPI.

  * If no movie name is passed, this function will default to "Mr. Nobody"

  * Example: 
  ```
  $ node liri movie-this "this is the end"
  Results powered by OMDB Web API
  Title: This Is the End
  Year: 2013
  Internet Movie Database rated this: 6.6/10
  Rotten Tomatoes rated this: 83%
  Metacritic rated this: 67/100
  Produced in: USA
  Language: English, Spanish
  Plot: 6 Los Angeles celebrities are stuck in James Franco's house after a series of devastating events just destroyed the city. Inside, the group not only will have to face with the apocalypse, but with themselves.
  Actors: James Franco, Jonah Hill, Seth Rogen, Jay Baruchel
  ```
  
  * Note: For movie names that are multiple words, you must put double quotes around the movie name. Refer to the example for proper syntax.

4. "do-what-it-says"
  * This command will read in the file "random.txt" from the same directory that you execute liri.js from. Each line in "random.txt" will contain one of the previous three commands and arguments. Each line will be formatted as follows:
    * command-one,"search-term"

  * The function is designed to execute as many commands as are in the file.





