import React, { useState } from "react";
import Spinner from "./Spinner";
import LOGO from "../assets/weather_logo.png";
//e167a121565880362a4769a2e4acf518 //api code

export default function Weather() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  function handleSubmit(event) {
    // console.log(event); //to know which key is pressed
    if (event.key === "Enter") {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=e167a121565880362a4769a2e4acf518`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Some error occured while fecthing weather data");
        })
        .then((data) => {
          setLoading(false);
          setError("");
          setData(data);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }

  if (loading === true) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="app-name">
          Weather Wiz{" "}
          <span>
            <img src={LOGO} alt="" />
          </span>
        </h1>

        <div className="search-bar">
          <input
            type="text"
            className="city-search"
            placeholder="Search City.."
            name="query"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            onKeyUp={handleSubmit}
          />
        </div>

        <ErrorMessage error={error} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="app-name">
        Weather Wiz{" "}
        <span>
          <img src={LOGO} alt="" />
        </span>
      </h1>

      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyUp={handleSubmit}
        />
      </div>

      <ErrorMessage error={error} />

      <WeatherData data={data} />
    </div>
  );
}

function ErrorMessage(props) {
  if (props.error) {
    return (
      <>
        <span className="error-message">Sorry, City not found</span>
      </>
    );
  } else {
    return null;
  }
}

function WeatherData(props) {
  const data = props.data;
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const formattedTime = currentDate.toLocaleTimeString();
  console.log(data);
  if (props.data) {
    return (
      <>
        <div className="city-name">
          <h2>
            {data?.name}, <span>{data.sys.country}</span>
          </h2>
        </div>
        <div className="date">
          <span>{formattedDate}</span>
          <br />
          <span>{formattedTime}</span>
        </div>

        <div className="icon-temp">
          <img
            className="image-weather"
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          {data ? Math.round(data.main.temp - 273) : ""}
          <sup className="deg">&deg;C</sup>
        </div>
        <div className="des-wind">
          <p>{data.weather[0].description}</p>
          {/* <p>Wind Speed: {data.wind.speed} m/s</p> */}
        </div>
      </>
    );
  } else {
    return null;
  }
}
