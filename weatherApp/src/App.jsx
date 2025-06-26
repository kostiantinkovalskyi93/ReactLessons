import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const API_KEY = import.meta.env.VITE_API_KEY || 'd1de8f8132a72a9817485243c1dd3beb';
const DEFAULT_CITY = 'Kyiv';
const LEAFLET_MARKER = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const fetchCurrentWeather = async (city, apiKey) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) throw new Error('City not found');
  return response.json();
};

const fetchForecast = async (city, apiKey) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) throw new Error('Forecast not available');
  return response.json();
};

const filterDailyForecast = (forecastList) => {
  const dailyForecast = [];
  const seenDates = new Set();
  for (const item of forecastList) {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!seenDates.has(date) && item.dt_txt.includes('12:00:00')) {
      dailyForecast.push(item);
      seenDates.add(date);
    }
    if (dailyForecast.length >= 5) break;
  }
  return dailyForecast;
};

const SearchForm = ({ inputValue, setInputValue, onSearch }) => (
  <form onSubmit={onSearch} className="search-form">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Введіть назву міста..."
      className="search-input"
    />
    <button type="submit" className="search-button">Пошук</button>
  </form>
);

const WeatherCard = ({ weather }) => (
  <div className="weather-card card">
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
);

const ForecastCard = ({ day }) => (
  <div className="forecast-card card">
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
);

const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const formatDate = (dt) => new Date(dt * 1000).toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric'
});

// Основний компонент
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
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(cityName, API_KEY),
        fetchForecast(cityName, API_KEY),
      ]);
      setWeather(weatherData);
      setForecast(filterDailyForecast(forecastData.list));
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
    if (weather?.coord) {
      const map = L.map('map').setView([weather.coord.lat, weather.coord.lon], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.marker([weather.coord.lat, weather.coord.lon], { icon: LEAFLET_MARKER })
        .addTo(map)
        .bindPopup(weather.name)
        .openPopup();
      return () => map.remove();
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

  return (
    <div className="app">
      <header className="header">
        <h1>Weather App</h1>
        <SearchForm inputValue={inputValue} setInputValue={setInputValue} onSearch={handleSearch} />
      </header>
      <main className="main">
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {weather && !loading && (
          <div className="weather-container">
            <WeatherCard weather={weather} />
            <div className="forecast-container">
              <h3>Прогноз погоди на 5 днів</h3>
              <div className="forecast-list">
                {forecast.map((day, index) => (
                  <ForecastCard key={index} day={day} />
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