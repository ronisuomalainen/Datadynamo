import React from 'react'
import '../index.css'

const NavBar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <span className='company-name'>
                Datadynamo
            </span>
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
