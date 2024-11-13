import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addUserToDb } from '../services/supabase_client';

const Register = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Call the addUserToDb function to insert user into the database
    const user = await addUserToDb(username, password);
    if (user) {
      // If registration is successful, navigate to the /store page
      navigate('/store');
    } else {
      // Handle error case (e.g., invalid input)
      alert('Rekisteröinti epäonnistui');
    }
  };

  return (
    <div className="login-container">
      <h2>Rekisteröidy</h2>
      <form onSubmit={handleSubmit}> {/* Handle form submission */}
        <div className="form-group">
          <input
            type="text"
            id="username"
            placeholder="Käyttäjätunnus"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Handle input changes
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle input changes
            required
          />
        </div>
        <button type="submit">Rekisteröidy</button> {/* Submit the form */}
      </form>
    </div>
  );
};

export default Register;
