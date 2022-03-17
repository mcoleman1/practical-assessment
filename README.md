# FrontendPractical

A demo project to demonstrate core competency with the Angular Framework. 

## Features

Search Recent Tweets - Courtesy of the Twitter API, the application allows the user to search recent tweets by suppling a search term or hashtag. The search is done automatically, no button click is required. Once the user has a table of search results, there is the option to modify the maximum results, which will automatically trigger a new search; the user can also click the Refresh button to get the latest tweets. NOTE: Due to Twitter security policies regarding Cross-Origin Resource Sharing (CORS), this application depends on a NodeJS/Express application which acts as a proxy server to the Twitter API. The repository for that application can be found here: https://github.com/mcoleman1/practical-assessment-backend

Weather Data - Courtesy of the OpenWeatherMap API, the application allows the user to search for basic weather data by supplying a City Name. Weather data, including temperature, humidity, visibility, and wind, will be displayed, assuming the City Name provided is valid. If it is invalid, an error message will be displayed the user. Additionally, the weather data is refreshed every thirty seconds with no user interaction required and the template is updated automatically. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. If you need to access the Search Recent Tweets feature, you will also need to download the NodeJS/Express application mentioned above and run `npm run dev` from the project root. 

