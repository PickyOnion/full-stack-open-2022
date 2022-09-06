import { useEffect, useState } from "react";
import axios from "axios";

const Weather = (props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.props.capitalInfo.latlng[0]}&lon=${props.props.capitalInfo.latlng[1]}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setTemp(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  }, [props.props.capitalInfo.latlng, apiKey]);

  return (
    <>
      <h2>Weather in {props.props.capital[0]}</h2>
      <p>temperature {temp} celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather-icon"
      ></img>
      <p>Wind {wind} m/s</p>
    </>
  );
};

export default Weather;
