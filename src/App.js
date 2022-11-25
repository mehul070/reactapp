import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current_weather/current-weather';
import Forcast from './forcast/forcast';
import {API_URL, API_KEY, APIOptions} from './api'
//import {upstate} from "react";



function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${APIOptions}&units=metric`
    );
    const forecastFetch = fetch(
      `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${APIOptions}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forcast data={forecast} />}
    </div>
  );
}

export default App;