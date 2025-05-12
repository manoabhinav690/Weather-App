import { motion } from "framer-motion";
import { FaArrowLeft, FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import {
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherCloudy
} from "react-icons/ti";

const WeatherForecast = ({ forecast, locationName, kelvinToCelsius, mpsToKmph, setShowForecast }) => {
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
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          5-Day Forecast for {locationName}
        </h2>
        <button
          onClick={() => setShowForecast(false)}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl flex items-center gap-2 transition-all"
        >
          <FaArrowLeft />
          Back to Current
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.list.slice(0, 5).map((item, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
            <h3 className="font-semibold text-white mb-2">
              {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">
                {getWeatherIcon(item.weather[0].main)}
              </span>
              <span className="text-xl font-bold text-white">
                {kelvinToCelsius(item.main.temp)}°C
              </span>
            </div>
            <p className="text-gray-200 capitalize mb-3">
              {item.weather[0].description}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1 text-gray-200">
                <FaTemperatureLow className="text-blue-300" />
                {kelvinToCelsius(item.main.temp_min)}°C
              </div>
              <div className="flex items-center gap-1 text-gray-200">
                <FaTemperatureHigh className="text-red-300" />
                {kelvinToCelsius(item.main.temp_max)}°C
              </div>
              <div className="flex items-center gap-1 text-gray-200">
                <FaWind className="text-blue-300" />
                {mpsToKmph(item.wind.speed)} km/h
              </div>
              <div className="flex items-center gap-1 text-gray-200">
                <WiHumidity className="text-blue-300" />
                {item.main.humidity}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherForecast;