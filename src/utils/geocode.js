const axios = require('axios');

const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1Ijoic3VyYWoxMjM2IiwiYSI6ImNtZTg1a3h2eDA2aGwybHNmdGtieTE3bDAifQ.sEXS_OeHetVBrRMCJ_9YLw`;
    
    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            // Corrected the variable name from 'response' to 'body'
            const data = body.features[0];
            callback(undefined, {
                latitude: data.geometry.coordinates[1],
                longitude: data.geometry.coordinates[0],
                location: data.place_name
            });
        }
    });
};

module.exports = geocode;
