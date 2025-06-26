import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const API_KEY = import.meta.env.VITE_API_KEY || 'd1de8f8132a72a9817485243c1dd3beb';
const DEFAULT_CITY = 'Kyiv';

const App = () => {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!currentResponse.ok) {
        throw new Error('Такого міста не знайдено');
      }
      const weatherData = await currentResponse.json();
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!forecastResponse.ok) {
        throw new Error('Прогноз погоди недоступний');
      }
      const forecastData = await forecastResponse.json();
      const dailyForecast = [];
      const seenDates = new Set();
      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (!seenDates.has(date) && item.dt_txt.includes('12:00:00')) {
          dailyForecast.push(item);
          seenDates.add(date);
        }
        if (dailyForecast.length >= 5) break;
      }

      setWeather(weatherData);
      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(DEFAULT_CITY);
  }, []);

  useEffect(() => {
    if (weather && weather.coord) {
      const map = L.map('map').setView([weather.coord.lat, weather.coord.lon], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconRetinaUrl: markerIconRetina,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.marker([weather.coord.lat, weather.coord.lon], { icon: customIcon })
        .addTo(map)
        .bindPopup(weather.name)
        .openPopup();

      return () => {
        map.remove();
      };
    }
  }, [weather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue);
      fetchWeatherData(inputValue);
      setInputValue('');
    }
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const formatDate = (dt) => {
    return new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Прогноз погоди</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введіть назву міста..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Пошук
          </button>
        </form>
      </header>
      <main className="main">
        {loading && <div className="loader">Завантажується...</div>}
        {error && <div className="error">{error}</div>}
        {weather && !loading && (
          <div className="weather-container">
            <div className="weather-card">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <div className="weather-icon">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <p className="temperature">{Math.round(weather.main.temp)}°C</p>
              <p className="description">{weather.weather[0].description}</p>
              <div className="details">
                <p>Відчувається як: {Math.round(weather.main.feels_like)}°C</p>
                <p>Вологість: {weather.main.humidity}%</p>
                <p>Вітер: {weather.wind.speed} m/s, {getWindDirection(weather.wind.deg)}</p>
                <p>Атмосферний тиск: {weather.main.pressure} hPa</p>
              </div>
            </div>

            <div className="forecast-container">
              <h3>Прогноз погоди на 5 днів:</h3>
              <div className="forecast-list">
                {forecast.map((day, index) => (
                  <div key={index} className="forecast-card">
                    <p className="forecast-date">{formatDate(day.dt)}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                      className="forecast-icon"
                    />
                    <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                    <p className="forecast-description">{day.weather[0].description}</p>
                    <div className="forecast-details">
                      <p>Вологість: {day.main.humidity}%</p>
                      <p>Вітер: {day.wind.speed} m/s, {getWindDirection(day.wind.deg)}</p>
                      <p>Атмосферний тиск: {day.main.pressure} hPa</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="map" className="map"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;