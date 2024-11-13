import React, { useState } from 'react'
import '../index.css'
import { useNavigate } from 'react-router-dom'
import { addUserToDb } from '../services/supabase_client'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email !== confirmEmail) {
      alert('Sähköpostiosoitteet eivät täsmää')
      return
    }

    const user = await addUserToDb(email, password)
    if (user) {
      navigate('/store')
    } else {
      alert('Rekisteröinti epäonnistui')
    }
  }

  return (
    <div className='centered-container'>
      <div className="register-container">
        <h2>Rekisteröidy</h2>
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
              type="email"
              id="confirmEmail"
              placeholder="Sähköpostiosoite uudelleen"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
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
              required
            />
          </div>
          <button type="submit">Rekisteröidy</button>
        </form>
      </div>
    </div>
  )
}

export default Register
