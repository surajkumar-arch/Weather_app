const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Paths
const publicPath = path.join(__dirname, '../public');

// Serve static files
app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Weather App</h1><p>Welcome to the Weather App!</p>');
});

app.get('/help', (req, res) => {
    res.send({
        name: 'Weather App',
        version: '1.0.0',
        description: 'A simple weather application'
    });
});

app.get('/about', (req, res) => {
    res.send({
        age: 20,
        hobbies: ['coding', 'reading'],
        location: 'India',
    });
});

app.get('/weather', (req, res) => {
    res.set('Cache-Control', 'no-cache'); // Disable caching

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});  // Add location to forecast data

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search)

    res.send({
        products: []
    });
});
// 404 Page (HTML file from public folder)
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicPath, '404.html'));
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
