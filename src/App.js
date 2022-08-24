import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Favorit from './Components/Favorit';
function App() {
  const [flag, setFlag] = useState(true);
  const [currentWeather, setCurrentWeather] = useState()
  const [autoComplete, setAutoComplete] = useState()
  const [city, setCity] = useState('Tel Aviv')
  const [foreCast, setForeCast] = useState()
  const [favorits, setFavorits] = useState([])
  useEffect(() => {
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }, [flag]);

  const onSearch = (city) => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH&q=${city}`)
      .then(res => { return res.json() })
      .then(data => { setAutoComplete(data) })
  }

  const search = () => {
    setCity(autoComplete[0].LocalizedName)
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${autoComplete[0].Key}?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${autoComplete[0].Key}?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }


  const searchF = (name,key) => {
    setCity(name)
    fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=TjKG93meAt99OYfZ37t2X0skimxJ5gGH&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }
  const addToFavorit = () => {
    let cityObj = {
      temp: currentWeather[0].Temperature.Metric.Value + 'C',
      name: city,
      id: autoComplete[0].Key
    }
    const found = favorits.find(element => element.name == city);
    if (found == undefined) {
      setFavorits([...favorits, cityObj])
    }


  }
  return (
    <div className="App">
      <BrowserRouter>
        {console.log(currentWeather)}
        <Header />
        <Routes>
          <Route path='/react-weather' element={<HomePage addToFavorit={addToFavorit} foreCast={foreCast} city={city} search={search} onSearch={onSearch} currentWeather={currentWeather} />} />
          <Route path='/react-weather/favorit' element={<Favorit favorits={favorits} searchF={searchF} onSearch={onSearch} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
