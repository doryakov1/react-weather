import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
export default function Header() {
  return (
    <div className='header'>
        <Link className='link' to='/react-weather'>Home</Link>
        <Link className='link' to='/react-weather/favorit'>Favorit</Link>
    </div>
  )
}
