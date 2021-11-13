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

app.post('/', (req, res, input) => {
    const { city } = req.body;
    let apiUrl = `http://maps.openweathermap.org/maps/2.0/weather?q=${city}&appid=${URIKEY}&units=metric`;
    console.log(city)
    return axios.post(`${apiUrl}`).then((response) => {
        let weather = JSON.parse(response.data)
        // if(weather === undefined) {
        //     res.render('index', { weather: null, error: 'Error, please try again' })
        // } else {
            let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
            res.render('index', { weather: weatherText, error: null });
            console.log(`Data: ${response.data}`)
        // }
    })
    // request(apiUrl, (error, docs, body) => {
    //     // if(error) {
    //     //     res.render('error', { error: '' })
    //     // }
    //     body = JSON.parse(body)
    //     console.log(body)
    //     if(error && docs.statusCode !== 200) {
    //         throw error;
    //     }
    //     let country = (body.sys.country) ? body.sys.country : '';
    //     let forcast = "For city "+city+', country '+country;
    //
    //     res.render('index', {body: body, forecast: forcast });
    // })
})

app.listen(PORT, () => {
    console.log(`App listening on PORT - ${PORT}`);
})
