'use strict';
let lat;
let lng;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
// LOCATION DATA
function FormattedData(searchQuery, formattedQuery, latitude, longitude) {
  this.search_query = searchQuery;
  this.formatted_query = formattedQuery;
  this.latitude = latitude;
  this.longitude = longitude;
}
// const entry = new FormattedData()

const interestedData = require('./data/geo.json')
console.log(interestedData.results[0].address_components[0].long_name)   // search query
var search_query = interestedData.results[0].address_components[0].long_name;

console.log(interestedData.results[0].formatted_address)         // formatted query
var formatted_query = interestedData.results[0].formatted_address;

console.log(interestedData.results[0].geometry.location.lat)  //latitude
var latitude = interestedData.results[0].geometry.location.lat

console.log(interestedData.results[0].geometry.location.lng)  //latitude
var longitude = interestedData.results[0].geometry.location.lng


app.get('/location', (request, response) => {

    console.log('LOCATIONS END FIRING');
    response.send({
        "search_query": search_query,
        "formatted_query": "Seattle, WA, USA",
        "latitude": latitude,
        "longitude": "-122.332071"
      });
    // response.send(interestedData.results[0].geometry.location)




});


app.listen(PORT, () => {
    console.log("Port is working and listening  on port " + PORT)
});