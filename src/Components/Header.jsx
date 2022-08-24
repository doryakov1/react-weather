import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
export default function Header() {
  return (
    <div className='header'>
        <Link className='link' to='/'>Home</Link>
        <Link className='link' to='/favorit'>Favorit</Link>
    </div>
  )
}
