import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [city, setCity] = useState("pune");
  const [temperature, setTemperature] = useState(0);
  const [message, setMessage] = useState("");

  const loadWeatherInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`
      );

      setTemperature((response.data.main.temp - 273).toFixed(2));
      setMessage(<h1>Data Fetched Successfully</h1>);
    } catch (err) {
      setTemperature(0);
      setMessage("City not found");
    }
  }, [city]);

  useEffect(() => {
    loadWeatherInfo();
  }, [loadWeatherInfo]);

  return (
    <div>
      <h1 className="app-title">Weather App For {city}</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Enter City...."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <p className="message-text">{message}</p>
      <h1 className="temperature-text">Temperature: {temperature} C</h1>
    </div>
  );
}

export default Home;
