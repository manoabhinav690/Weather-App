import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DaySky from "../assets/day-sky.mp4";
import NightSky from "../assets/night-sky.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true);

  // Update time and check if it's daytime
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hours = now.getHours();
      setIsDaytime(hours >= 6 && hours < 18);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const goToWeatherPage = () => {
    navigate("/weather");
  };

  // Floating weather icons data
  const weatherIcons = ["☀️", "🌤️", "🌦️", "⛅", "🌧️", "❄️"];

  return (
    <div className="main relative min-h-screen overflow-hidden">
      {/* Dynamic background video */}
      <video
        autoPlay
        muted
        loop
        src={isDaytime ? DaySky : NightSky}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Animated logo/text */}
          <motion.div 
            className="mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h1
              className="text-6xl sm:text-8xl font-bold mb-4 text-white drop-shadow-2xl"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                Weather
              </span>
              <span className="text-white">Cast</span>
            </motion.h1>
            <motion.div 
              className="h-1 w-24 bg-blue-400 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl mb-12 font-light text-gray-100 max-w-2xl mx-auto leading-relaxed"
          >
            Real-time forecasts with hyper-accurate data and stunning visuals.
            <br />
            <span className="text-blue-200 font-medium">
              Plan your day with confidence.
            </span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={goToWeatherPage}
              className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl shadow-xl transition-all duration-300 group"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Explore Weather
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating weather icons */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6">
          {weatherIcons.map((icon, index) => (
            <motion.span
              key={index}
              className="text-3xl cursor-default select-none"
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [0, -15, 0],
                opacity: [0, 1, 0.8, 1]
              }}
              transition={{
                delay: index * 0.2,
                duration: 4 + index,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.span>
          ))}
        </div>

        {/* Current time display */}
        <motion.div 
          className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white font-mono">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;