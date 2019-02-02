import React, { Component } from "react";

import "./App.css";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      weatherData: '',
      weatherDetails: []
    }
  }

  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition((position)=>{
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?&units=metric&APPID=4aaaa639843c46f319b776cf78f80291&lat=12.9762&lon=77.6033`)
        .then((response)=>response.json())
        .then((data)=>this.setState({
          weatherDetails: this.getTemperatures(data)
        }))
        .catch(error => console.log("error",error))
      })
    });
  }

  getWeekDayName = (i) => {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const weekday = new Date().getDay();
    return isNaN(weekday) ? null : days[(weekday+i)%7]
    
  }
  
  getSrc = (weathertype) => {
    if(weathertype.includes("Clear")){
      return "https://cdn3.iconfinder.com/data/icons/weather-and-weather-forecast/32/sunny-512.png";
    }else if(weathertype.includes("Rain")){
      return "https://previews.123rf.com/images/surfupvector/surfupvector1607/surfupvector160700070/59718324-cloud-with-raindrops-illustration-cloudy-weather-rain-weather-forecast-weather-concept-can-be-used-f.jpg";  
    }else if(weathertype.includes("Clouds")){
      return "https://i.pinimg.com/originals/f8/58/48/f858484ac0df9bbfe369de7d3362fa70.jpg";  
    }else if(weathertype.includes("Sun")){
      return "https://cdn1.iconfinder.com/data/icons/weather-elements/512/Weather_SunGradient.png";  
    }else{
      return weathertype
    }
  }

  getCurrentTimeImage = () => {
    let currTime = new Date().getHours()
    if([0,1,2].indexOf(currTime)!==-1){
      return "00"
    }else if([3,4,5].indexOf(currTime)!==-1){
      return "03"
    }else if([6,7,8].indexOf(currTime)!==-1){
      return "06"
    }else if([9,10,11].indexOf(currTime)!==-1){
      return "09"
    }else if([12,13,14].indexOf(currTime)!==-1){
      return "12"
    }else if([15,16,17].indexOf(currTime)!==-1){
      return "15"
    }else if([18,19,20].indexOf(currTime)!==-1){
      return "18"
    }else if([21,22,23].indexOf(currTime)!==-1){
      return "21"
    }
  }

  getTemperatures = (data) => {
    const weatherDetails = []
    let previousDate = data.list[0].dt_txt.substring(0,10)      
    let {temp_min, temp_max} = data.list[0].main
    let imgsrc = data.list[0].weather.main
    data.list.forEach(weather => {
      if(weather.dt_txt.substring(0,10) === previousDate){
        temp_min = temp_min<=weather.main.temp_min?temp_min:weather.main.temp_min
        temp_max = temp_max>=weather.main.temp_max?temp_max:weather.main.temp_max
        if(weather.dt_txt.substr(11,2) === this.getCurrentTimeImage()){
          imgsrc = this.getSrc(weather.weather[0].main)
        }
      }else{
        weatherDetails.push({date:previousDate,min:Math.round(temp_min),max:Math.round(temp_max),imgsrc:imgsrc})
        temp_min = weather.main.temp_min
        temp_max = weather.main.temp_max
        previousDate = weather.dt_txt.substring(0,10)
      }
    });
    return weatherDetails  
  }

  render(){
    const weather_cards = [];
    
    this.state.weatherDetails.forEach(temperature => {
      weather_cards.push(
        <div key={temperature.date} className={weather_cards.length===0?"weathercardactive":"weathercard"}>
          <div className="heading">
            <p className="days">{this.getWeekDayName(weather_cards.length)}</p>
          </div>

          <div className="imagediv">
            <img className="image" src={temperature.imgsrc} alt={temperature.imgsrc} />‎⁨
          </div>

          <div className="footer">
            <p className="temperatures">{temperature.min}&#176;&nbsp; {temperature.max}&#176;</p>
          </div>
        </div>  
      )
    })
    

    return (
      <div className="App">
        {weather_cards}
      </div>
    );
  }
}

export default App;

