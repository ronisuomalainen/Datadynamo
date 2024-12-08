import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUserToDb } from '../services/supabase_client';
import '../index.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      alert('Sähköpostiosoitteet eivät täsmää');
      return;
    }

    const { error } = await addUserToDb(email, password);
    if (error) {
      alert('Rekisteröinti epäonnistui: ' + error);
    } else {
      navigate('/store');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="centered-container">
      <div className="form-container">
        <button className="close-button" onClick={handleClose}>
          x
        </button>

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
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Salasana"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Piilota' : 'Näytä'}
            </button>
          </div>
          <button type="submit">Rekisteröidy</button>

          <div className="login-text">
            <Link to="/login">Kirjaudu</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
