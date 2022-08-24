import React from 'react'
import './HomePage.css'
export default function HomePage(props) {
    const getWeather = () => {
        try {
            if (props.currentWeather[0].Temperature.Metric.Value != undefined) {
                return <div className='current-weather'>
                    <div className='city-weather'>
                        <span>{props.city}</span>
                        <span>{Math.round(props.currentWeather[0].Temperature.Metric.Value)}C</span>
                    </div>
                    <h2>{props.currentWeather[0].WeatherText}</h2>
                    <div className='forecast'>
                        <div>
                            <span>Sun</span>
                            <span>{Math.round(props.foreCast.DailyForecasts[0].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Mon</span>
                            <span>{Math.round(props.foreCast.DailyForecasts[1].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Tue</span>
                            <span>{Math.round(props.foreCast.DailyForecasts[2].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Wed</span>
                            <span>{Math.round(props.foreCast.DailyForecasts[3].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Thu</span>
                            <span>{Math.round(props.foreCast.DailyForecasts[4].Temperature.Maximum.Value)}C</span>
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
        if(props.autoComplete != null || props.autoComplete != undefined){
            return  props.autoComplete.map((city) => {
                return <div className='cities'>
                    <button className='city' onClick={() => props.searchF(city.LocalizedName, city.Key)}>{city.LocalizedName}</button>
                </div>
            })
        }
     } catch (error) {
        
     } 


    }

    const switchButton = ()=>{

const isNameEquel = (element) => element.name == props.city;

console.log(props.favorits.findIndex(isNameEquel));
        if (props.favorits.findIndex(isNameEquel) == -1) {
          return <button onClick={props.addToFavorit}>Add to favorit</button>
          }else{
            return <button onClick={()=>props.deleteFromFavorit(props.favorits.findIndex(isNameEquel))}>Delete from favorit</button>
          }
    }


    return (
        <div className='weather'>
               <div>
            <input onChange={e => props.onSearch(e.target.value)} type="search" placeholder='City' />
            {/* <button onClick={props.addToFavorit}>Add to favorit</button> */}
            {switchButton()}
            </div>
                {/* <button onClick={props.search}>Search</button> */}
            <div className='display-cities'>
                {displayCities()}
            </div>
            {getWeather()}

        </div>
    )
}
