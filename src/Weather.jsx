import {useState, useEffect} from 'react'
import Loader from './Loader'
import cloudy from './assets/cloudy.svg'
import cloudy_night from './assets/cloudy+night.svg';
import cloudy_sun from './assets/cloudy+sun.svg';
import moon from './assets/moon.svg'
import rain_cloud from './assets/rain+cloud.svg';
import rain_sun from './assets/rain+sun.svg';
import sun from './assets/sun.svg';
import thunder from './assets/thunder.svg';
import StrongRainy from './assets/StrongRainy.svg';
import "./weather.css"




function fetchWeatherData() {
    const [loading, setLoading] = useState([]);
    const [data, setData] = useState([]);
    const apiKey = 'Vb7CqXlBMysoAqDUniEMCVlS7A0yrKeQ'; // Replace with your Tomorrow.io API key
    const location = "padang";

    // const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?units=metric&location=${location}&apikey=${apiKey}`;
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${apiKey}`;


    useEffect(() =>{
      setLoading(true);
      fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setData(responseJson.timelines.hourly);
        setLoading(false)
      })
      .catch(err => console.error(err));
    }, []);
   return {loading, data};
}

function getWeatherCondition(weatherCode) {
  const d = new Date();
  let hour = d.getHours();
  var time;
  if(hour > 18 || (hour >= 0 && hour <= 6)) time = "night";
  else time = "day";
  switch(time){
    case("night"):
    switch (weatherCode) {
      case 1000:
        return {"source":moon,"condition":'Clear'};
      case 1100:
        return {"source":moon,"condition":'Mostly Clear'};
      case 1101:
        return {"source":cloudy_night,"condition":'Partly Cloudy'};
      case 1102:
        return {"source":cloudy,"condition":'Mostly Cloudy'};
      case 1001:
        return {"source":cloudy,"condition":'Cloudy'};
      case 2000:
      case 2100:
        return {"source":cloudy,"condition":'Fog'};
      case 3000:
        return  {"source":cloudy,"condition":'Light Wind'};
      case 3001:
        return {"source":cloudy,"condition":'Wind'};
      case 3002:
        return {"source":cloudy,"condition":'Strong Wind'};
      case 4000:
        return {"source":rain_cloud,"condition":'Drizzle'};
      case 4001:
        return {"source":rain_cloud,"condition":'Rain'};
      case 4200:
        return {"source":rain_cloud,"condition":'Light Rain'};
      case 4201:
        return {"source":StrongRainy,"condition":'Heavy Rain'};
      case 8000:
        return {"source":thunder,"condition":'Thunderstorm'};
      default:
        return 'Unknown';
    }

    case("day"):
    switch (weatherCode) {
      case 1000:
        return {"source":sun,"condition":'Clear'};
      case 1100:
        return {"source":sun,"condition":'Mostly Clear'};
      case 1101:
        return {"source":cloudy_sun,"condition":'Partly Cloudy'};
      case 1102:
        return {"source":cloudy,"condition":'Mostly Cloudy'};
      case 1001:
        return {"source":cloudy,"condition":'Cloudy'};
      case 2000:
      case 2100:
        return {"source":cloudy,"condition":'Fog'};
      case 3000:
        return {"source":cloudy,"condition":'Light Wind'};
      case 3001:
        return {"source":cloudy,"condition":'Wind'};
      case 3002:
        return {"source":cloudy,"condition":'Strong Wind'};
      case 4000:
        return {"source":rain_cloud,"condition":'Drizzle'};
      case 4001:
        return {"source":rain_cloud,"condition":'Rain'};
      case 4200:
        return {"source":rain_sun,"condition":'Light Rain'};
      case 4201:
        return {"source":StrongRainy,"condition":'Heavy Rain'};
      case 8000:
        return {"source":thunder,"condition":'Thunderstorm'};
      default:
        return 'Unknown';
    }
  }
 
}


function Weather() {
  const {loading, data} = fetchWeatherData();

  if (loading) {
    return <Loader></Loader>;
  }

  

  const forecast_value = [[getWeatherCondition(data[8].values.weatherCode),data[8]], [getWeatherCondition(data[33].values.weatherCode),data[9]], [getWeatherCondition(data[9].values.weatherCode),data[9]], [getWeatherCondition(data[10].values.weatherCode),data[10]], [getWeatherCondition(data[11].values.weatherCode),data[11]]];
  console.log(forecast_value[0][0])
  const weather = getWeatherCondition(data[31].values.weatherCode);




  // console.log(weather['source']);


  // // // Call the fetchWeatherData function when the page loads

  // // // Function to get weather condition based on weather code
  
  return (
    <>
    
    <div className='flex justify-center items-center h-1/3 grid grid-row-2'>
      <div className="weather-container m-auto">
        <div className="weather-icon"><img src={weather['source']} alt="" /></div>
        <div className="Hourplace">{new Date().getHours()}:00</div>
        <div className="temperature">{data[7].values.temperature}</div>
        <div className="weather-status">{weather['condition']}</div>
      </div>

      <div className="weather-forecast grid grid-cols-5  m-auto mt-4">
        {forecast_value.map((forecast_data, index) => (
          <div key={index} className={`weather-container flex flex-col w-full m-2 items-center gap-3 col-span-1`}>
            <div className="weather-icon flex justify-center items-center h-24 w-24"><img className=' w-full h-full object-contain' src={forecast_data[0]['source']} alt="" /></div>
            <div className="Hourplace">{new Date().getHours() + index}:00</div>
            <div className="temperature text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">{forecast_data[1].values.temperature}</div>
            <div className="weather-status">{forecast_data[0]['condition']}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Weather



