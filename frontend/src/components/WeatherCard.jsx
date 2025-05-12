const WeatherCard = ({ icon, title, children }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default WeatherCard;