import axios from "axios";

// const URL = "https://api.openweathermap.org/data/2.5/forecast";
//https://api.openweathermap.org/data/2.5/weather?lat=37.495987&lon=127.124378&units=metric&appid=
const URL = "https://api.openweathermap.org/data/2.5/weather";
const H_URL = "https://api.openweathermap.org/data/2.5/forecast";

const API_Key =process.env.REACT_APP_OPEN_WEATHER_API_KEY;
export function fetchWeather() {
  const promise = axios.get(URL, {
    params: {
      lat : 37.495987,
      lon : 127.124378,
      units : "metric",
      appid: API_Key
    }
  });
  return promise;
}

export function fetchHourlyWeather() {
  const promise = axios.get(H_URL, {
    params: {
      lat : 37.495987,
      lon : 127.124378,
      units: "metric",
      appid: API_Key
    }
  });
  return promise;
}