import { motion } from "framer-motion";

const WeatherEffects = ({ weatherCondition }) => {
  if (weatherCondition === "rain") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-0.5 bg-blue-300 rounded-full"
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: window.innerHeight,
              opacity: [0, 0.5, 0],
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              delay: Math.random()
            }}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`
            }}
          />
        ))}
      </div>
    );
  }
  if (weatherCondition === "snow") {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-white rounded-full"
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: window.innerHeight,
              opacity: [0, 0.8, 0],
              x: Math.random() * 100
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random()
            }}
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 5}px`
            }}
          >
            ❄
          </motion.div>
        ))}
      </div>
    );
  }
  return null;
};

export default WeatherEffects;