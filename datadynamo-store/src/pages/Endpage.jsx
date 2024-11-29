import '../index.css'
import { useLocation } from 'react-router-dom'

const orderConfirmed = () => {
    const location = useLocation()
    const order = location.state?.order

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
                    <p><strong>Määrä: </strong>{order.quantity}</p>
                    <p><strong>Hinta: </strong>{order.price}€</p>
                </div>
            )}
        </div>
    )
}

export default orderConfirmed