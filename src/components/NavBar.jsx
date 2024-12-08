import React, { useState, useEffect } from 'react'
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase_client'

import sunIcon from '../assets/sunicon.png'
import moonIcon from '../assets/moonicon.png'

const NavBar = ({ user }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut()
      if (error) {
          console.error('Uloskirjautuminen ei onnistunut: ', error.message)
      } else {
          navigate('/')
      }
    }

    // Lataa teema localStoragesta tai käytä oletuksena tummaa teemaa
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Aseta teema `data-theme`-attribuutiksi ja tallenna localStorageen
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Teeman vaihtamisen logiikka
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="company-name">
          Datadynamo
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/admin-dashboard" className='nav-link'>
              Dashboard
            </Link>
            <Link to="/profile" className="nav-link">
              Profiili
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button">
              Kirjaudu ulos
            </button>
          </>
        ): (
          // If not logged in, show nothing or show other links as needed
          <></>
        )}
        <button onClick={toggleTheme} className="theme-toggle">
          <img 
            src={theme === 'dark' ? sunIcon : moonIcon} 
            alt={theme === 'dark' ? 'Vaalea teema' : 'Tumma teema'} 
            className="theme-icon" 
          />
        </button>
      </div>
    </nav>
  )
}

export default NavBar
