import { useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행하자마자 현재 도시기반의 날씨가 보인다
// 2. 날씨정보에는 도시, 썹씨, 화씨 날씨 상황
// 3. 5개의 버튼이 있다 ( 1개는 현재 위치, 4개는 다른도시)
// 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나np온다
// 5. 현재위치 버튼을 누르면 다 현재위치 기반의 위치가 나온다
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다. 

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const apiKey = "402b4356da8d5a36bf92fd7770eed6b9";
  const [loading, setLoading] = useState(false);

      //  Fetch Data from API
      //  When setLoading(true) is called, it signals that a loading process has started. This allows the component to update its UI to reflect this state, typically by displaying a loading indicator or disabling interactive elements.
      //  setLoading(true);
  const getWeatherByCurrentLocation = async(lat,lon) => {   
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
  };


  const getCurrentLocation = () => { 
    // console.log("getCurrentLocation");
    // Google Search- "Javascript getCurrentLocation"
    // getCurrentLocation은 showPosition 펑션을 받는다
      navigator.geolocation.getCurrentPosition( (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        //console.log("Current location", lat, lon);
        getWeatherByCurrentLocation(lat,lon);
      } );
    };
      
  const getWeatherByCity = async()=> {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
  };
  //  Fetch Data from API
  //  When setLoading(true) is called, it signals that a loading process has started. This allows the component to update its UI to reflect this state, typically by displaying a loading indicator or disabling interactive elements.
  //  setLoading(true);

  // 랜더링을 하자마자 바로 useEffect를 실행시킨다
  // UI 꾸미기 - 배경이미지 활용
  useEffect ( ()=> {
    if (city === "") {
      getCurrentLocation();
    }else {
      getWeatherByCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[city]);

  return (
  <div> 
    {loading?( 
      <div className="main-container">
      <ClipLoader
        color='#f88c6b'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/>
      </div>) :(
      <div className="main-container">
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities} setCity={setCity} handleCurrentLocation={getCurrentLocation} />
     </div>
      )}
  </div>
 );
};
export default App;
