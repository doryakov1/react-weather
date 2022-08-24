import React from 'react'
import './HomePage.css'
export default function HomePage(props) {
    const getWeather = () => {
        try {
            if (props.currentWeather[0].Temperature.Metric.Value != undefined) {
                return <div className='current-weather'>
                    <div className='city-weather'>
                        <span>{props.city}</span>
                        <span>{props.currentWeather[0].Temperature.Metric.Value}C</span>
                    </div>
                    <h2>{props.currentWeather[0].WeatherText}</h2>
                    <div className='forecast'>
                        <div>
                            <span>Sun</span>
                            <span>{props.foreCast.DailyForecasts[0].Temperature.Maximum.Value}C</span>
                        </div>
                        <div>
                            <span>Mon</span>
                            <span>{props.foreCast.DailyForecasts[1].Temperature.Maximum.Value}C</span>
                        </div>
                        <div>
                            <span>Tue</span>
                            <span>{props.foreCast.DailyForecasts[2].Temperature.Maximum.Value}C</span>
                        </div>
                        <div>
                            <span>Wed</span>
                            <span>{props.foreCast.DailyForecasts[3].Temperature.Maximum.Value}C</span>
                        </div>
                        <div>
                            <span>Thu</span>
                            <span>{props.foreCast.DailyForecasts[4].Temperature.Maximum.Value}C</span>
                        </div>
                    </div>
                </div>
            }
        } catch (error) {
            return <span>City could not found!</span>
        }
    }


    return (
        <div className='weather'>
            <input onChange={e => props.onSearch(e.target.value)} type="text" placeholder='City' />
            <div>
                <button onClick={props.search}>Search</button>
                <button onClick={props.addToFavorit}>Add to favorit</button>
            </div>
            {getWeather()}
        </div>
    )
}
