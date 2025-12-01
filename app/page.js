"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setError("");
    setWeather(null);
    if (!city) return setError("Please enter a city");

    setLoading(true);
    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();
      setLoading(false);

      if (data.cod === 401) setError("Invalid API key");
      else if (data.cod === "404") setError("City not found");
      else setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main?.temp}°C</p>
          <p>💧 Humidity: {weather.main?.humidity}%</p>
          <p>💨 Wind: {weather.wind?.speed} m/s</p>
          {weather.weather && weather.weather[0] && (
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          )}
        </div>
      )}
    </div>
  );
}
