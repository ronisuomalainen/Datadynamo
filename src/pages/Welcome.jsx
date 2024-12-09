import '../index.css';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome-container">
<<<<<<< HEAD
      <h1>Tervetuloa Datadynamoon....!</h1>
=======
      <h1>Tervetuloa Datadynam........oon!</h1>
>>>>>>> 93e0d180c8d8f58677416f0b9e8900ef2aaca23f
      <p>Kirjaudu sisään tai rekisteröidy alla</p>
      <div className="button-container">
        <Link to="/login" className="button">
          Kirjaudu
        </Link>
        <Link to="/register" className="button">
          Rekisteröidy
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
