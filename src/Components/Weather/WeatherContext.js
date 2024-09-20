import React, { createContext, useState, useContext } from 'react';

// Create WeatherContext
const WeatherContext = createContext();

// Custom hook to use the WeatherContext
export const useWeather = () => {
  return useContext(WeatherContext);
};

// WeatherProvider component
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  
  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
