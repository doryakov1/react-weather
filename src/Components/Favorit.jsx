import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Favorit.css'

export default function Favorit(props) {
  const nav = useNavigate()
  const onSearch = (city , id) => {
    props.searchF(city , id)
    nav('/react-weather')
  }
  return (
    <div className='favorit'>
      {props.favorits.map((city) => {
        return <div className='favorits'>
          <button onClick={() => onSearch(city.name ,city.id)}>
            <span>{city.name}</span>
            <span>{city.temp}C</span>
          </button>
        </div>
      })}
    </div>
  )
}
