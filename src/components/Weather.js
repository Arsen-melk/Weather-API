import "./weather.css";
import React, { useEffect, useState } from 'react';
import cloudIcon from '../icons/cloudy.png'; 
import sunnyIcon from '../icons/sunny.png'; 

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Yerevan'); 

  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const fetchWeather = async () => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(); 
  }, [city]); 

  if (loading) {
    return <div className="weather">Loading...</div>;
  }

  if (error) {
    return <div className="weather-err" style={{color:'red',textAlign:"center",fontSize:24}}>Error: {error}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const cityName = e.target.city.value;
    setCity(e.target.city.value); 
    e.target.city.value = '';
  };

  return (
    <div className="weather">
        
        
       <h1>Weather API</h1>
       <img src={sunnyIcon} alt="Cloud Icon" className="cloud-icon" />
       <img src={cloudIcon} alt="Cloud Icon" className="cloud-icon" />
      {weatherData && (
        <div className="weather-info">
          <p><strong>City</strong> {weatherData.name}</p>
          <p><strong>Temperature</strong> {weatherData.main.temp} °C</p>
          <p><strong>Weather</strong> {weatherData.weather[0].description}</p>
          <p><strong>Wind Speed</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Humidity</strong> {weatherData.main.humidity}%</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default Weather;
