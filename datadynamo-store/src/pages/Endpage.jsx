import '../index.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Endpage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const order = location.state?.order
    const price = location.state?.price

    const handleExit = () => {
        navigate('/store')
    }

    return ( 
        <div className='endpage-container'>
            <h1>Kiitos tilauksesta!</h1>
            {order && (
                <div className='order-details'>
                    <h2>Tilaustiedot</h2>
                    <p><strong>Nimi: </strong>{order.name}</p>
                    <p><strong>Sähköposti: </strong>{order.email}</p>
                    <p><strong>Osoite: </strong>{order.address}</p>
                    <p><strong>Maksutapa: </strong>{order.payment_method}</p>
                    <p><strong>Tuote: </strong>{order.product}</p>
                    <p><strong>Koko: </strong>{order.size}</p>
                    <p><strong>Määrä: </strong>{order.quantity}</p>
                    <p><strong>Yksikköhinta: </strong>{price}€</p>
                    <p><strong>Kokonaishinta: </strong>{order.price}€</p>
                    <h3>Tiedot lähetetty myös sähköpostilla.</h3>
                    <button onClick={handleExit} className='button'>Takaisin</button>
                </div>
            )}
        </div>
    )
}

export default Endpage