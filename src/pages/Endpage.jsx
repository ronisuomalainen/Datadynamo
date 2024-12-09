import '../index.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Endpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;
  const price = location.state?.price;

  if (!order) {
    return (
      <div>
        Error: No order data available.
        <button onClick={() => navigate('/store')} className="button">
          Takaisin
        </button>
      </div>
    );
  }

  const {
    name,
    email,
    address,
    product,
    size,
    quantity,
    price: orderPrice,
  } = order;
<<<<<<< HEAD
  
  const totalPrice = price * quantity;
=======
  const totalPrice = price || orderPrice || 0;
>>>>>>> 93e0d180c8d8f58677416f0b9e8900ef2aaca23f

  return (
    <div className="endpage-container">
      <h1>Kiitos tilauksesta!</h1>
      {order && (
        <div className="order-details">
          <h2>Tilaustiedot</h2>
          <p>
            <strong>Nimi: </strong>
            {name}
          </p>
          <p>
            <strong>Sähköposti: </strong>
            {email}
          </p>
          <p>
            <strong>Osoite: </strong>
            {address}
          </p>
          <p>
            <strong>Maksutapa: </strong>
            {order.payment_method}
          </p>
          <p>
            <strong>Tuote: </strong>
            {product}
          </p>
          <p>
            <strong>Koko: </strong>
            {size || 'Ei valittu'}
          </p>
          <p>
            <strong>Määrä: </strong>
            {quantity || 'Ei valittu'}
          </p>
          <p>
            <strong>Yksikköhinta: </strong>
            {price}€
          </p>
          <p>
            <strong>Kokonaishinta: </strong>
            {totalPrice}€
          </p>
          <h3>Tiedot lähetetty myös sähköpostilla.</h3>
        </div>
      )}
      <button onClick={() => navigate('/store')} className="button">
        Takaisin
      </button>
    </div>
  );
};

export default Endpage;
