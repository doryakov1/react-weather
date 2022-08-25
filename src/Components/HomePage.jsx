import React from 'react'
import { useState } from 'react'
import './HomePage.css'
export default function HomePage(props) {
    const [city,setCity] = useState('Tel Aviv')
    const [key ,setKey] = useState('215854')
    const searchCity = (city,key)=>{
        props.searchF(city, key)
        setCity(city) 
        setKey(key)  
    }
    const getWeather = () => {
        try {
            if (props.currentWeather[0].Temperature.Metric.Value != undefined) {
                return <div className='current-weather'>
                    <div className='city-weather'>
                        <span>{props.city}</span>
                        <span>{parseInt(props.currentWeather[0].Temperature.Metric.Value)}C</span>
                    </div>
                    <h2>{props.currentWeather[0].WeatherText}</h2>
                    <div className='forecast'>
                        <div>
                            <span>Sun</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[0].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Mon</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[1].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Tue</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[2].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Wed</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[3].Temperature.Maximum.Value)}C</span>
                        </div>
                        <div>
                            <span>Thu</span>
                            <span>{parseInt(props.foreCast.DailyForecasts[4].Temperature.Maximum.Value)}C</span>
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
                    <button className='city' onClick={() => searchCity(city.LocalizedName, city.Key)}>{city.LocalizedName}</button>
                </div>
            })
        }
     } catch (error) {
        
     } 


    }

    const switchButton = ()=>{

const isNameEquel = (element) => element.name == props.city;

        if (props.favorits.findIndex(isNameEquel) == -1) {
          return <button onClick={()=>props.addToFavorit(city , key)}>Add to favorit</button>
          }else{
            return <button onClick={()=>props.deleteFromFavorit(props.favorits.findIndex(isNameEquel))}>Delete from favorit</button>
          }
    }


    return (
        <div className='weather'>
               <div>
            <input onChange={e => props.onSearch(e.target.value)} type="search" placeholder='City' />
            {switchButton()}
            </div>
            <div className='display-cities'>
                {displayCities()}
            </div>
            {getWeather()}

        </div>
    )
}
