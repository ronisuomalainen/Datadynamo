import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/supabase_client'
import '../index.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert('Sähköposti ja salasana tarvitaan')
      return
    }

    const user = await loginUser(email, password)
    console.log('Login result: ', user)

    if (user) {
      navigate('/store')
    } else {
      alert('Kirjautuminen epäonnistui')
    }
  }

  return (
    <div className='centered-container'>
      <div className="login-container">
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              id="email" 
              placeholder="Sähköposti" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              placeholder="Salasana" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <button type="submit">Kirjaudu</button> 
        </form>
        <div className='register-text'>
          <Link to="/register">Rekisteröidy</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
