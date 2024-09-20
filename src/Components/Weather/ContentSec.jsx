import React, { useState, useEffect } from "react";
import "./Weather.css";
import SunImg from "./images/sun.png";
import BroCimg from "./images/brokenc.png";
import DayCimg from "./images/dayfewclouds.png";
import Nicimg from "./images/nightfewclouds.png";
import DayRain from "./images/day-rain.png";
import NiRain from "./images/nightrain.png";
import MistImg from "./images/mist.png";
import MoonImg from "./images/moon.png";
import ScCld from "./images/scatteredcl.png";
import ShowRain from "./images/showerran.png";
import SnowImg from "./images/snow.png";
import ThonderS from "./images/thunderstorm.png";
import Details from "./Details";
import { useWeather } from "./WeatherContext"; // Use the custom hook

function ContentSec() {
  const [weatherData, setWeatherData] = useState("jaipur"); // Default city: Jaipur
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { weather, setWeather } = useWeather(); // Access context using the custom hook

  const detailArray = {
    wName1: "Wind Speed",
    wName2: "Temperature",
    wName3: "Visibility",
    wName4: "Latitude",
    wName5: "Longitude",
    wName6: "Humidity",
    icon1: "fa-solid fa-wind",
    icon2: "fa-solid fa-temperature-low",
    icon3: "fa-solid fa-eye",
    icon4: "fa-solid fa-location-crosshairs",
    icon5: "fa-solid fa-cloud-meatball",
    speed: " m/sec",
    temp: " c",
    km: " km"
  };

  // Use environment variable for API key
  const apiKey = "340791651da63f0d2465805bede445b3";

  useEffect(() => {
    // Fetch weather data for Jaipur on initial render
    handleCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs once when the component mounts

  useEffect(() => {
    if (weatherData !== "jaipur") {
      // Fetch weather data when the user changes the input
      handleCities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]); // Call handleCities when weatherData changes, except for initial render with default

  function handleCities() {
    if (weatherData) {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${weatherData}&appid=${apiKey}&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setError(null); // Clear any previous error
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to fetch weather data.");
          console.error(error);
          setLoading(false);
        });
    }
  }

  const iconMap = {
    "01d": SunImg,
    "01n": MoonImg,
    "02d": DayCimg,
    "02n": Nicimg,
    "03d": ScCld,
    "03n": ScCld,
    "04d": BroCimg,
    "04n": BroCimg,
    "09d": ShowRain,
    "09n": ShowRain,
    "10d": DayRain,
    "10n": NiRain,
    "11d": ThonderS,
    "11n": ThonderS,
    "13d": SnowImg,
    "13n": SnowImg,
    "50d": MistImg,
    "50n": MistImg
  };

  let weatherImg = weather.weather ? iconMap[weather.weather[0].icon] : null;

  return (
    <div className={`main_content_box h-full`}>
      <div className={`input_sec flex items-center overflow-hidden`}>
        <form
          className="flex w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleCities(); // Call function on form submission
          }}
        >
          <input
            value={weatherData}
            onChange={(e) => setWeatherData(e.target.value)}
            type="search"
            placeholder="Search for cities"
            className="outline-none py-2 px-3 bg-none w-full bg-transparent"
          />
          <button
            onClick={handleCities}
            className={`max-w-xs outline-none text-black font-bold bg-yellow-400 h-full py-2 px-3`}
          >
            Search
          </button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className={`city_sun_moon px-10`}>
        <div className="row">
          <div className={`city_temp col-6`}>
            <h1 className="mt-4 text-4xl font-bold">
              {weather.name || "City"}, {weather.sys && weather.sys.country}
            </h1>
            <p className="text-xs mt-3">
              {weather.weather && weather.weather[0].description}
            </p>
            <div>
              <h1 className={`text-6xl font-bold mt-5 temp_hed`}>
                {weather.main?.temp || "0"}&deg;c
              </h1>
            </div>
          </div>
          <div className={`moon_sun col-6 flex items-center justify-center`}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <img src={weatherImg} alt="weather-icon" />
            )}
          </div>
        </div>
      </div>
      <div className={`weather_details_sec py-3 w-full px-4 pt-4 pb-5`}>
        <h5 className={`details_hed`}>Weather Details</h5>
        <div className="row">
          <Details weather={weather} wName1={detailArray} />
          <Details weather2={weather} wName2={detailArray} />
          <Details weather3={weather} wName3={detailArray} />
        </div>
        <div className="row mt-4">
          <Details weather4={weather} wName4={detailArray} />
          <Details weather5={weather} wName5={detailArray} />
          <Details weather6={weather} wName6={detailArray} />
        </div>
      </div>
    </div>
  );
}

export default ContentSec;
