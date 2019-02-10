const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const cookieSession = require('cookie-session')
const flash = require('connect-flash')
const SERVER_PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine' , 'hbs')
app.use(cookieSession({
    maxAge: 24 * 60 *60 *1000 ,
    keys: 'hjkadgfahdskfjhgadskjgfjkasdg'
}))
    app.use(flash());
 app.get('/' , (req,res) =>{
    res.render('index',{weather_data:null,error:null})
})

app.post('/' , (req,res) => {
       let city = req.body.city_name
       let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=83140eda048e6595136fe99194c5a9ea`
       request(url,function(error,response,body) {
                   let weather_json = JSON.parse(body)  
                   console.log(weather_json) 
                  if(weather_json.main === undefined) {
                     res.render('index' , {error:'city not found'})
                  }      
                  else {
                    let weather = {
                        city:city,
                        temperature:Math.round(weather_json.main.temp),
                        description:weather_json.weather[0].description,
                        icon:weather_json.weather[0].icon,
                        pressure:weather_json.main.pressure,
                        humidity:weather_json.main.humidity,
                        min_temp:weather_json.main.temp_min,
                        max_temp:weather_json.main.temp_max
                    }
                    let weather_data = {weather:weather}
                      res.render('index' ,{weather_data,error:null}) 
                  }        
                   
       })
})





app.listen(SERVER_PORT, () =>{
    console.log('server started at '+ 'http://localhost:8080')
})