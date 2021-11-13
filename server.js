const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require("axios");
const { URIKEY } = require('./uriVariable');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null })
})

app.post('/', (req, res) => {
    const { city } = req.body;
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${URIKEY}&units=metric`;
    console.log(city)
    request(apiUrl, (error, docs, body) => {
        body = JSON.parse(body)
        console.log(body)
        if(error && docs.statusCode !== 200) {
            throw error;
        }
        let forcast = "For city "+city+', country '+country;

        const weatherData = {
            weather: body.main,
            description: body.description,
            icon: body.icon,
            main: body.main.temp,
            country: (body.sys.country) ? body.sys.country : '',
        }

        res.render('index', { body: body, forecast: forcast, weatherData: weatherData });
    })
})

app.listen(PORT, () => {
    console.log(`App listening on PORT - ${PORT}`);
})
