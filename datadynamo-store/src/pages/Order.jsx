import '../index.css'
import { Navigate, useNavigate } from 'react-router-dom'


const Order = () => {
return (
    <div class="form-container">
        <form>
            <label for="name">Nimi</label>
            <input type="text" id="name" placeholder="Nimi"/>

            <label for="email">Sähköposti</label>
            <input type="email" id="email" placeholder="Sähköposti"/>

            <label for="address">Katuosoite</label>
            <input type="text" id="address" placeholder="Katuosoite"/>

            <label for="city">Kaupunki</label>
            <input type="text" id="city" placeholder="Kaupunki"/>

            <label for="payment">Valitse maksutapa</label>
            <select id="payment">
                <option>Visa</option>
                <option>MasterCard</option>
                <option>PayPal</option>
            </select>

        <button type="submit">Maksa</button>
        </form>
    </div>
  )
}
export default Order