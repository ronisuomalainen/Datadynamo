import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/supabase_client'
import '../index.css'

const Profile = () => {
  const navigate = useNavigate()
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [currentPassword, setCurrenPassword] = useState('')

  const handleClose = () => {
    navigate('/store')
  }

  const handleEmailChange = async (e) => {
    e.preventDefault()

    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail })
      if (error) {
        alert('Sähköpostin vaihto epäonnistui: ' + error.message)
      } else {
        alert('Sähköposti vaihdettu!')
      }
    } catch (error) {
      console.error('Odottamaton virhe: ', error)
      alert('Odottamaton virhe tapahtui')
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) {
        alert('Salasanan vaihto epäonnistui: ' + error.message)
      } else {
        alert('Salasana vaihdettu')
      }
    } catch (error) {
      console.error('Odottamaton virhe: ', error)
      alert('Odottamaton virhe tapahtui')
    }
  }

  return (
    <div className='centered-container'>
      <div className="profile-container">

        <button className='close-button' onClick={handleClose}>x</button>

        <div className='profile-form form-container'>
          <h2>Vaihda sähköpostiosoitteesi</h2>
          <form onSubmit={handleEmailChange}>
            <div className="form-group">
              <input 
                type="email" 
                id="newEmail" 
                placeholder="Uusi Sähköposti"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit">OK</button> 
          </form>
        </div>

        <div className='profile-form form-container'>
          <h2>Vaihda salasana</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <input 
                type="password" 
                id="currentPassword" 
                placeholder="Vanha salasana" 
                value={currentPassword}
                onChange={(e) => setCurrenPassword(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                id="newPassword" 
                placeholder="Uusi salasana" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required />
            </div>
            <button type="submit">OK</button> 
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile