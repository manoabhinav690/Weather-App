import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";

const Header = ({ city, setCity, fetchWeather, loading }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mb-8"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
          Weather
        </span>
        <span className="text-white">Cast</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
            className="w-full p-3 pl-10 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <CiLocationOn className="absolute left-3 top-3.5 text-gray-500 text-xl" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchWeather}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-all flex items-center gap-2 min-w-[120px] justify-center"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Searching</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <span>Search</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;