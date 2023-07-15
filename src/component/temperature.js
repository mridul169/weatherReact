// https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=109845839a0ddf7e648ffe402c55b387

import React, { useEffect, useState } from "react";
import Weather from "./weather";
import "./style.css";

const Temperature = () => {
  const [searchValue, setSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeather = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=109845839a0ddf7e648ffe402c55b387`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const newWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(newWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search ..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" type="button" onClick={getWeather}>
            Search
          </button>
        </div>
      </div>

      {/* our temperature card */}
      <Weather tempInfo={tempInfo} />
    </>
  );
};

export default Temperature;
