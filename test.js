'use strict';
let lat;
let lng;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const user = require('user');
app.use(cors());
const PORT = process.env.PORT;
// LOCATION DATA
function FormattedData(searchQuery, formattedQuery, latitude, longitude) {
  this.search_query = searchQuery;
  this.formatted_query = formattedQuery;
  this.latitude = latitude;
  this.longitude = longitude;
}
app.get('./data/geo.json', (request, response) => {
  const searchQuery = request.query.data;
  const urlToVisit = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${process.env.GOOGLE_MAPS}`;
  user.get(urlToVisit).then(responseFromUser => {
    const geoData = responseFromUser.body;
    //console.log('geodata', geoData);
    const specificGeoData = geoData.results[0];
    const formattedQuery = specificGeoData.formatted_address;
    lat = specificGeoData.geometry.location.lat;
    //console.log(lat);
    lng = specificGeoData.geometry.location.lng;
    response.send(new FormattedData(searchQuery, formattedQuery, lat, lng));
  }).catch(error => {
    response.status(500).send(error.message);
    console.error(error);
  });
})
app.get('./data/geo.json', getLocation);