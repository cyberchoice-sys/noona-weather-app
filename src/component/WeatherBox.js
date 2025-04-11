import React from 'react'

// use Destructuring : props라는 object 안의 키(weather)만 언급하면 데이터를 뽑아올 수 있다.
const WeatherBox = ({weather}) => {
  return (
    <div>
      <div className="weather-box">
        <div>{weather?.name}</div>
        <h2>{(Math.round(weather?.main.temp))}°C &nbsp;&nbsp; {(Math.round(weather?.main.temp) * 9/5) + 32} °F</h2>
        <h3>{weather?.weather[0].description} </h3>
      </div>
    </div>
  );
};

export default WeatherBox