import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "./Header";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import WeatherEffects from "./WeatherEffects";
import DaySky from "../assets/day-sky.mp4";
import NightSky from "../assets/night-sky.mp4";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [locationName, setLocationName] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherCondition, setWeatherCondition] = useState("clear");

  const GEO_CODE = "https://api.openweathermap.org/geo/1.0/direct?";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast?";
  const KEY = import.meta.env.VITE_API_KEY;

  // Update time and weather condition
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Set weather condition for styling
  useEffect(() => {
    if (weather) {
      const condition = weather.weather[0].main.toLowerCase();
      setWeatherCondition(condition.includes("rain") ? "rain" :
        condition.includes("snow") ? "snow" :
          condition.includes("cloud") ? "clouds" : "clear");
    }
  }, [weather]);

  const coordinates = async (q) => {
    try {
      const { data } = await axios.get(`${GEO_CODE}q=${q}&appid=${KEY}`);
      return {
        name: data[0].name,
        lat: data[0].lat,
        lon: data[0].lon
      };
    } catch (err) {
      console.error("Geocoding error:", err);
      throw err;
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const { lat, lon, name } = await coordinates(city);
      setLocationName(name);
      const { data } = await axios.get(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${KEY}`);
      setWeather(data);
      setShowForecast(false);
    } catch (error) {
      console.error("Weather fetch error", error);
      alert("Couldn't fetch weather data. Please try another location.");
    }
    setLoading(false);
  };

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const { lat, lon } = await coordinates(city);
      const { data } = await axios.get(`${FORECAST_URL}lat=${lat}&lon=${lon}&cnt=5&appid=${KEY}`);
      setForecast(data);
      setShowForecast(true);
    } catch (error) {
      console.error("Forecast fetch error", error);
    }
    setLoading(false);
  };

  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
  const mpsToKmph = (mps) => (mps * 3.6).toFixed(1);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video - Only day/night */}
      <video
        autoPlay
        muted
        loop
        src={currentTime.getHours() >= 6 && currentTime.getHours() < 18 ? DaySky : NightSky}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Dynamic overlay based on weather */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${weatherCondition === "rain" ? "bg-blue-900/30" :
        weatherCondition === "snow" ? "bg-blue-200/20" :
          weatherCondition === "clouds" ? "bg-gray-400/30" : "bg-transparent"
        }`} />

      {/* Weather effects (animated rain/snow) */}
      <WeatherEffects weatherCondition={weatherCondition} />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
        <Header
          city={city}
          setCity={setCity}
          fetchWeather={fetchWeather}
          loading={loading}
        />

        <main className="w-full max-w-6xl flex-grow">
          {loading && !weather && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white text-lg">Fetching weather data...</p>
            </motion.div>
          )}

          {weather && !showForecast && (
            <CurrentWeather
              weather={weather}
              locationName={locationName}
              currentTime={currentTime}
              kelvinToCelsius={kelvinToCelsius}
              mpsToKmph={mpsToKmph}
              weatherCondition={weatherCondition}
              fetchForecast={fetchForecast}
            />
          )}

          {forecast && showForecast && (
            <WeatherForecast
              forecast={forecast}
              locationName={locationName}
              kelvinToCelsius={kelvinToCelsius}
              mpsToKmph={mpsToKmph}
              setShowForecast={setShowForecast}
            />
          )}
        </main>

        <footer className="mt-8 text-center text-white/70 text-sm">
          <p className="mt-1">
            {currentTime.toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </footer>

      </div>
    </div>
  );
};

export default WeatherApp;