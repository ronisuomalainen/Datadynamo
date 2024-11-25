import '../index.css'
import { useNavigate } from 'react-router-dom'


const Order = () => {
    const navigate = useNavigate()
    const handleOrder = () => {
        navigate('/endpage') 
  }
return (
    <div className="form-container">
        <form onSubmit={handleOrder}>
            <label htmlFor="name">Nimi</label>
            <input type="text" id="name" required/>

            <label htmlFor="email">Sähköposti</label>
            <input type="email" id="email" required/>

            <label htmlFor="address">Katuosoite</label>
            <input type="text" id="address" required/>

            <label htmlFor="city">Kaupunki</label>
            <input type="text" id="city" required/>

            <label htmlFor="payment">Valitse maksutapa</label>
            <select id="payment" required>
                <option defaultValue="">Valitse maksutapa</option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="paypal">PayPal</option>
            </select>

        <button type="submit">Maksa</button>
        </form>
    </div>
  )
}
export default Order