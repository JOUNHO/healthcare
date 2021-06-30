import axios from "axios";
import styles from "./index.module.css";
import { fetchHourlyWeather, fetchWeather } from "../../../apis/fetchWeather";
import { useEffect, useState } from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";

function Weather(props) {
  
  
  const [weather, setWeather] = useState(null);
  const [hourlyWeather,setHourlyWeather] = useState(null);
  const work = async () => {
    try{
      const response = await fetchWeather();
      const hourlyResponse = await fetchHourlyWeather();

      let weatherList=hourlyResponse.data.list; 
      for(let i=0; i<weatherList.length; i++){
        let date=weatherList[i].dt_txt;
        let tempDate = new Date(date.substr(0,4),date.substr(5,2)-1,date.substr(8,2),parseInt(date.substr(11,2))+9);
        weatherList[i].weather[0].icon="http://openweathermap.org/img/w/"+weatherList[i].weather[0].icon+".png";
        weatherList[i].dt_txt=tempDate.toLocaleDateString()+ tempDate.toTimeString();
      }

      response.data.weather[0].icon = "http://openweathermap.org/img/w/"+response.data.weather[0].icon+".png";
      setWeather(response.data);
      setHourlyWeather(weatherList);
      
    } catch(error){
      throw error;
    }
  }
 
  useEffect(() => {
    work();
  },[])



  return(
    <div className={styles.Weather_contain}>
      <div className={`${styles.Weather_header} d-flex justify-content-between`}>
        <div>
          <i class="fas fa-bullhorn"></i>
          <span className={styles.info}>날씨정보</span>
        </div>

        <button onClick={work} className={styles.refresh}><i class="fas fa-redo-alt"></i></button>
      
      </div>
      <CurrentWeather weather={weather}></CurrentWeather>
      <HourlyWeather hourlyWeather={hourlyWeather}></HourlyWeather>

    </div>
  );
}
export default Weather;