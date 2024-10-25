const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3010

app.use(express.static('public'));
app.use(express.urlencoded({ extended:true}))

mongoose.connect('mongodb://0.0.0.0:27017/Weather')
const db = mongoose.connection
db.once('open', ()=>{
    console.log('Connected to MongoDB')
})

const WeatherSchema = new mongoose.Schema({
    temp: Number,
    city: String,
    humidityyy: Number,
    windSpeed: String
})

const Weather = mongoose.model('Weather', WeatherSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/post', async(req, res) => {
fetch("https://api.openweathermap.org/data/2.5/weather?q=&appid=d700eb1511c86fc96fe0f4b276e7878e&units=metric")

    const {temp, city, humidityyy, windSpeed} = req.body
    const weatherData = new Weather({temp, city, humidityyy, windSpeed})
    await weatherData.save()
    console.log(weatherData)
    // res.send("Data Saved Successfully!")
})


app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
