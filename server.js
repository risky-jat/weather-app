const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine' , 'ejs')

app.get('/' , (req,res) =>{
    res.render('index')
})

app.post('/' , (req,res) => {
   let city = req.body.city_name
   console.log(city)
   let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=83140eda048e6595136fe99194c5a9ea'
   request(url,(error,response,body) => {
        weathor_json = JSON.parse(body)
        console.log(weathor_json)
   })
})





app.listen(8080 , () =>{
    console.log('server started at '+ 'http://localhost:8080')
})