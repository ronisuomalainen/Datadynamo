import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="login-container">
      <h2>Kirjaudu sisään</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Käyttäjätunnus</label>
          <input type="text" id="username" placeholder="Enter username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Salasana</label>
          <input type="password" id="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

export default Login