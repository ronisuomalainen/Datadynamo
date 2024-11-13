import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/supabase_client'
import '../index.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.perventDefault()

    const user = await loginUser(email, password)

    if (user) {
      navigate('/store')
    }
  }

  return (
    <div className='centered-container'>
      <div className="login-container">
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
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