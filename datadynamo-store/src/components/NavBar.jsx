import React from 'react'
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase_client'

const NavBar = () => {
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
            <Link to="/" className='company-name'>
                Datadynamo
            </Link>
        </div>
        <div className='navbar-right'>
            <Link to="/profile" className="nav-link">
              Profiili
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button">
              Kirjaudu ulos
            </button>
        </div>
    </nav>
  )
}

export default NavBar
