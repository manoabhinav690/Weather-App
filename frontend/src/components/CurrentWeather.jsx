import { motion } from "framer-motion";
import {
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherCloudy
} from "react-icons/ti";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind
} from "react-icons/fa";
import {
  WiHumidity,
  WiBarometer,
  WiRain,
  WiSnow
} from "react-icons/wi";
import { CiCompass1 } from "react-icons/ci";

const CurrentWeather = ({ 
  weather, 
  locationName, 
  currentTime, 
  kelvinToCelsius, 
  mpsToKmph, 
  weatherCondition, 
  fetchForecast 
}) => {
  const getWeatherIcon = (condition) => {
    const size = "text-3xl";
    switch (condition.toLowerCase()) {
      case 'thunderstorm': return <TiWeatherStormy className={`${size} text-yellow-400`} />;
      case 'drizzle':
      case 'rain': return <TiWeatherShower className={`${size} text-blue-400`} />;
      case 'snow': return <TiWeatherSnow className={`${size} text-blue-200`} />;
      case 'clouds': return <TiWeatherCloudy className={`${size} text-gray-300`} />;
      default: return <TiWeatherPartlySunny className={`${size} text-yellow-500`} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-8"
    >
      {/* Current Weather Overview */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              {getWeatherIcon(weather.weather[0].main)}
              {locationName}, {weather.sys.country}
            </h2>
            <p className="text-gray-200">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="text-center">
            <p className="text-5xl font-bold text-white">
              {kelvinToCelsius(weather.main.temp)}°C
            </p>
            <p className="text-xl text-gray-200 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaTemperatureHigh className="text-red-400 text-xl" />
            <h3 className="font-semibold text-white">Temperature</h3>
          </div>
          <div className="space-y-1">
            <p className="text-gray-200">Current: {kelvinToCelsius(weather.main.temp)}°C</p>
            <p className="text-gray-200">Feels like: {kelvinToCelsius(weather.main.feels_like)}°C</p>
            <div className="flex justify-between mt-2">
              <span className="text-blue-200 flex items-center gap-1">
                <FaTemperatureLow /> {kelvinToCelsius(weather.main.temp_min)}°C
              </span>
              <span className="text-red-200 flex items-center gap-1">
                <FaTemperatureHigh /> {kelvinToCelsius(weather.main.temp_max)}°C
              </span>
            </div>
          </div>
        </div>

        {/* Wind Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <FaWind className="text-blue-300 text-xl" />
            <h3 className="font-semibold text-white">Wind</h3>
          </div>
          <div className="space-y-1">
            <p className="text-gray-200">Speed: {mpsToKmph(weather.wind.speed)} km/h</p>
            <p className="text-gray-200 flex items-center gap-2">
              <CiCompass1 className="transform" style={{ rotate: `${weather.wind.deg}deg` }} />
              Direction: {weather.wind.deg}°
            </p>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <WiHumidity className="text-blue-400 text-2xl" />
            <h3 className="font-semibold text-white">Humidity</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-200">{weather.main.humidity}%</p>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${weather.main.humidity}%` }}
              />
            </div>
            {weatherCondition === "rain" && (
              <p className="text-blue-200 flex items-center gap-1 text-sm">
                <WiRain /> High chance of rain
              </p>
            )}
            {weatherCondition === "snow" && (
              <p className="text-blue-200 flex items-center gap-1 text-sm">
                <WiSnow /> Snow expected
              </p>
            )}
          </div>
        </div>

        {/* Pressure Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <WiBarometer className="text-purple-300 text-2xl" />
            <h3 className="font-semibold text-white">Pressure</h3>
          </div>
          <p className="text-gray-200 text-2xl">{weather.main.pressure} hPa</p>
          <p className="text-gray-400 text-sm mt-1">
            {weather.main.pressure > 1015 ? "High pressure" : "Low pressure"}
          </p>
        </div>

        {/* Visibility Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <TiWeatherCloudy className="text-gray-300 text-xl" />
            <h3 className="font-semibold text-white">Visibility</h3>
          </div>
          <p className="text-gray-200">{(weather.visibility / 1000).toFixed(1)} km</p>
          <p className="text-gray-400 text-sm mt-1">
            {weather.visibility > 10000 ? "Excellent visibility" :
              weather.visibility > 5000 ? "Good visibility" : "Reduced visibility"}
          </p>
        </div>

        {/* Weather Condition Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            {getWeatherIcon(weather.weather[0].main)}
            <h3 className="font-semibold text-white">Conditions</h3>
          </div>
          <p className="text-gray-200 capitalize">{weather.weather[0].description}</p>
          <p className="text-gray-400 text-sm mt-1">
            {weatherCondition === "clear" ? "Clear skies expected" :
              weatherCondition === "clouds" ? "Mostly cloudy" :
                weatherCondition === "rain" ? "Precipitation likely" :
                  "Winter weather expected"}
          </p>
        </div>
      </div>

      {/* Forecast Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchForecast}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          View 5-Day Forecast
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;