import React from 'react'
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase_client'

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
      </div>
    </nav>
  )
}

export default NavBar
