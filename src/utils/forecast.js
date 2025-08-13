const axios = require('axios');

const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=2aa3fca9cf2341613003496616344c0e&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                location: body.location.name, // Changed from response.body to body
                temperature: body.current.temperature, // Changed from response.body to body
                feelslike: body.current.feelslike, // Changed from response.body to body
                weather_descriptions: body.current.weather_descriptions[0] // Changed from response.body to body
            });
        }
    });
};

module.exports = forecast;
