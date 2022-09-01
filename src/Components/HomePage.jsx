import React from 'react'
import { useState } from 'react'
import './HomePage.css'
export default function HomePage(props) {
    const [name, setName] = useState('')
    const [city, setCity] = useState('Tel Aviv')
    const [key, setKey] = useState('215854')
    const searchCity = (city, key) => {
        props.searchF(city, key)
        setCity(city)
        setKey(key)
        setName(city)
    }
    const onSearch = (value) => {
        setName(value)
        props.onSearch(value)
    }
    const getForeCastsIcon = (iconNumber , iconName)=>{
   
        if(iconNumber < 10){
            return <img src={`https://developer.accuweather.com/sites/default/files/0${iconNumber}-s.png`} alt={iconName} />
        }
         return <img src={`https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`} alt={iconName} />

    }
    const getWeather = () => {
        try {
            if (props.currentWeather[0].Temperature.Metric.Value != undefined) {
                return <div className='current-weather'>
                    <div className='city-weather'>
                        <span>{props.city}</span>
                        <span>{parseInt(props.currentWeather[0].Temperature.Metric.Value)}°C</span>
                    </div>
                    <h2>{props.currentWeather[0].WeatherText}</h2>
                    <div className='forecast'>
                        <div>
                            <span>Sun</span>
                            {console.log(props.foreCast.DailyForecasts)}
                            <span>{parseInt(props.foreCast.DailyForecasts[0].Temperature.Maximum.Value)}°C</span>
                            {getForeCastsIcon(props.foreCast.DailyForecasts[0].Day.Icon,props.foreCast.DailyForecasts[0].Day.IconPhrase)}
                        </div>
                        <div>
                            <span>Mon</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[1].Temperature.Maximum.Value)}°C</span>
                            {getForeCastsIcon(props.foreCast.DailyForecasts[1].Day.Icon,props.foreCast.DailyForecasts[1].Day.IconPhrase)}
                        </div>
                        <div>
                            <span>Tue</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[2].Temperature.Maximum.Value)}°C</span>
                            {getForeCastsIcon(props.foreCast.DailyForecasts[2].Day.Icon,props.foreCast.DailyForecasts[2].Day.IconPhrase)}
                        </div>
                        <div>
                            <span>Wed</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[3].Temperature.Maximum.Value)}°C</span>
                            {getForeCastsIcon(props.foreCast.DailyForecasts[3].Day.Icon,props.foreCast.DailyForecasts[3].Day.IconPhrase)}
                        </div>
                        <div>
                            <span>Thu</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[4].Temperature.Maximum.Value)}°C</span>
                            {getForeCastsIcon(props.foreCast.DailyForecasts[4].Day.Icon,props.foreCast.DailyForecasts[4].Day.IconPhrase)}
                        </div>
                    </div>
                </div>
            }
        } catch (error) {
            return <span>City could not found!</span>
        }
    }
    const displayCities = () => {
        try {
            if (props.autoComplete != null || props.autoComplete != undefined) {
                return props.autoComplete.map((city) => {
                    return <div className='cities'>
                        <button className='city' onClick={() => searchCity(city.LocalizedName, city.Key)}>{city.LocalizedName}</button>
                    </div>
                })
            }
        } catch (error) {

        }


    }

    const switchButton = () => {

        const isNameEquel = (element) => element.name == props.city;

        if (props.favorits.findIndex(isNameEquel) == -1) {
            return <button className='switch-button' onClick={() => props.addToFavorit(city, key)}>Add to Favorites</button>
        } else {
            return <button className='switch-button' onClick={() => props.deleteFromFavorit(props.favorits.findIndex(isNameEquel))}>Delete from Favorites</button>
        }
    }


    return (
        <div className='weather'>
            <div className='switch-input'>
            <input value={name} onChange={e => onSearch(e.target.value)} type="search" placeholder='City' />
            {displayCities()}
            </div>
            {switchButton()}
            {getWeather()}

        </div>
    )
}
