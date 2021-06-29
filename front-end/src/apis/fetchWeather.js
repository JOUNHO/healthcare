import axios from "axios";

// const URL = "https://api.openweathermap.org/data/2.5/forecast";
//+9시간 해줘야함

//https://api.openweathermap.org/data/2.5/weather?lat=37.495987&lon=127.124378&units=metric&appid=dedffece273156f7df9766be92104c7b
const URL = "https://api.openweathermap.org/data/2.5/weather";
const H_URL = "https://api.openweathermap.org/data/2.5/forecast";

const API_Key = "dedffece273156f7df9766be92104c7b";

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