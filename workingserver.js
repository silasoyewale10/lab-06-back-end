'use strict';
// let lat;
// let lng;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
// LOCATION DATA

function FormattedData(query, location) {
    this.search_query = query;
    this.formatted_query = location.formatted_address;
    this.latitude = location.geometry.location.lat;
    this.longitude = location.geometry.location.lng;
}


app.get('/location', handleLocationRequest)

function handleLocationRequest(request, response) {

    let query = request.query.data;

    const interestedData = require('./data/geo.json')

    let newLocation = new FormattedData(query, interestedData.results[0]) 

    response.send(newLocation)
}



// app.get('/weather', handleWeatherRequest)

// function handleWeatherRequest(request, response) {

//     let query = request.query.data;

//     const interestedData = require('./darksky/geo.json')

//     let newLocation = new FormattedData(query, interestedData) 

//     response.send(newLocation)
// }

//for error message

app.get('/*', function(request, response){
    response.status(404).send('Error Loading Results')
  })



console.log('LOCATIONS END FIRING');

app.listen(PORT, () => {
    console.log("Port is working and listening  onnnnn port " + PORT)
});