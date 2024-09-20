import React from "react";
import "./Weather.css";
import AsideSec from "./AsideSec";
import ContentSec from "./ContentSec";
import { WeatherProvider } from "./WeatherContext"; // Import the provider

function Weather() {
  return (
    <WeatherProvider>
      <div className={`weather_container overflow-hidden`}>
        <div className={`weather_box`}>
          <div className={`flex justify-between h-full main_box`}>
            <AsideSec />
            <ContentSec />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default Weather;
