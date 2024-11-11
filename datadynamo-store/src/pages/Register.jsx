import React from 'react'
import './login.css'
import { addUserToDb } from '../services/supabase_client'

const Register = () => {
  return (
    <div className="login-container">
      <h2>Rekisteröidy</h2>
      <form>
        <div className="form-group">
          <input type="text" id="username" placeholder="Käyttäjätunnus" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" placeholder="Salasana" required />
        </div>
        <button type="submit" onClick={addUserToDb}>Rekisteröidy</button> 
      </form>
    </div>
  )
}

export default Register