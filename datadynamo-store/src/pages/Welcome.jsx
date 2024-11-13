import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='welcome-container'>
        <h1>Tervetuloa Datadynamoon!</h1>
        <p>Kirjaudu sisään tai rekisteröidy alla</p>
        <div className='button-container'>
            <Link to='/login' className="button">
                Kirjaudu
            </Link>
            <Link to='/register' className='button'>
                Rekisteröidy
            </Link>
        </div>
    </div>
  )
}

export default Welcome
