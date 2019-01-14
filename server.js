const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')

app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine' , 'hbs')

app.get('/' , (req,res) =>{
    res.render('index',{weather_data:null})
   
})

app.post('/' , (req,res) => {
       let city = req.body.city_name
       let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=83140eda048e6595136fe99194c5a9ea`
       request(url,function(error,response,body) {
                   let weather_json = JSON.parse(body)
                   
                   let weather = {
                       city:city,
                       temperature:Math.round(weather_json.main.temp),
                       description:weather_json.weather[0].description,
                       icon:weather_json.weather[0].icon
                   }
                   let weather_data = {weather:weather}
       res.render('index' ,{weather_data})  
       })
})





app.listen(8080 , () =>{
    console.log('server started at '+ 'http://localhost:8080')
})