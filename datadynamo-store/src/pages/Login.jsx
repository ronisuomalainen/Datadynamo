import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className="login-container">
      <h2>Kirjaudu sisään</h2>
      <form>
        <div className="form-group">
          <input type="text" id="username" placeholder="Käyttäjätunnus" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" placeholder="Salasana" required />
        </div>
        <button type="submit">Kirjaudu</button> 
      </form>
    </div>
  )
}

export default Login