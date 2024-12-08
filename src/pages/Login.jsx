import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/supabase_client'
import '../index.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await loginUser(email, password)

    if (error) {
      alert('Kirjautuminen epäonnistui: ' + error)
    } else {
      navigate('/store')
    }
  }

  const handleClose = () => {
    navigate('/')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='centered-container'>
      <div className="form-container">

        <button className='close-button' onClick={handleClose}>x</button>

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
              type={showPassword ? "text" : "password"}
              id="password" 
              placeholder="Salasana" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
              {showPassword ? "Piilota" : "Näytä"}
            </button>
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