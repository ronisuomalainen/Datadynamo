import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to="/" className='company-name'>
                Datadynamo
            </Link>
        </div>
        <div className='navbar-right'>
            <a href='/profile' className='nav-link'>
                Profiili
            </a>
            <a href='/logout' className='nav-link'>
                Kirjaudu ulos
            </a>
        </div>
    </nav>
  )
}

export default NavBar
