import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import Header from './Components/Header';
import Favorit from './Components/Favorit';
function App() {
  const [flag, setFlag] = useState(true);
  const [currentWeather, setCurrentWeather] = useState()
  const [autoComplete, setAutoComplete] = useState([])
  const [city, setCity] = useState('Tel Aviv')
  const [foreCast, setForeCast] = useState()
  const [favorits, setFavorits] = useState([])
  useEffect(() => {
    fetch(`https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }, [flag]);

  const onSearch = (city) => {
    fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL&q=${city}`)
      .then(res => { return res.json() })
      .then(data => { setAutoComplete(data) })
  }

  const search = () => {
    setCity(autoComplete[0].LocalizedName)
    fetch(`https://dataservice.accuweather.com/currentconditions/v1/${autoComplete[0].Key}?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${autoComplete[0].Key}?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }


  const searchF = (name,key) => {
    setCity(name)
    fetch(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL`)
      .then(res => { return res.json() })
      .then(data => { setCurrentWeather(data) })
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=Dyh2WwfANnjyiv94oTOfrLxabBrpGZfL&metric=true`)
      .then(res => { return res.json() })
      .then(data => { setForeCast(data) })
  }
  const addToFavorit = () => {
    let cityObj = {
      temp: currentWeather[0].Temperature.Metric.Value,
      name: city,
      id: autoComplete[0].Key
    }
    const found = favorits.find(element => element.name == city);
    if (found == undefined) {
      setFavorits([...favorits, cityObj])
    }


  }

  const deleteFromFavorit = (index)=>{
    let copyFavorits=[...favorits];
    copyFavorits.splice(index,1);
    setFavorits([...copyFavorits])
  }

  return (
    <div className="App">
      <BrowserRouter>
        {console.log(currentWeather)}
        <Header />
        <Routes>
            <Route path='/react-weather' element={<HomePage addToFavorit={addToFavorit} foreCast={foreCast} searchF={searchF} city={city} search={search} onSearch={onSearch} currentWeather={currentWeather} autoComplete={autoComplete} favorits={favorits} deleteFromFavorit={deleteFromFavorit}/>} />
          <Route path='/react-weather/favorit' element={<Favorit favorits={favorits} searchF={searchF} onSearch={onSearch} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
