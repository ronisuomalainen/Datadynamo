import '../index.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase, sendConfirmationEmail } from '../services/supabase_client'

const Order = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const size = location.state?.size
    const price = location.state?.price
    const quantity = location.state?.quantity
    const totalPrice = price * quantity
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        payment: '',
    })

    useEffect(() => {
        const getUserData = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (data?.user) {
                setFormData(prevData => ({
                    ...prevData,
                    email: data.user.email
                }))
            } else if (error) {
                console.error("Error fetching user data: ", error)
            }
        }
        getUserData()
    }, [])

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value })
    }

    const handleOrder = async (e) => {
        e.preventDefault()
    
        const product = "Hiirimatto"
        const designUrl = ''
    
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    payment_method: formData.payment,
                    product: product,
                    size: size,
                    quantity: quantity,
                    price: totalPrice,
                    design_url: designUrl,
                })
                .select('*')
            console.log('Response from supabase: ', { data, error })
    
            if (error) {
                console.error('Error creating order: ', error)
                alert('Tilaus epäonnistui, yritä uudelleen.')
                return
            }
    
            console.log('Order created: ', data)
    
            const emailResponse = await sendConfirmationEmail(data[0])
            if (emailResponse.error) {
                console.error(emailResponse.error)
            } else {
                console.log(emailResponse.success)
            }
    
            navigate('/endpage', { state: { order: data[0], price: price } })
    
        } catch (error) {
            console.error('Error during order processing: ', error)
            alert('Tilaus epäonnistui, yritä uudelleen.')
        }
    }
    
return (
    <div className="form-container">
        <h2>Tilauksen tiedot</h2>
        <p><strong>Koko:</strong> {size}</p>
        <p><strong>Yksikköhinta:</strong> {price}€</p>
        <p><strong>Määrä:</strong> {quantity}</p>
        <p><strong>Kokonaishinta:</strong> {totalPrice}€</p>

        <form onSubmit={handleOrder}>
            <label htmlFor="name">Nimi</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} required/>

            <label htmlFor="address">Katuosoite</label>
            <input type="text" id="address" value={formData.address} onChange={handleInputChange} required/>

            <label htmlFor="city">Kaupunki</label>
            <input type="text" id="city" value={formData.city} onChange={handleInputChange} required/>

            <label htmlFor="payment">Valitse maksutapa</label>
            <select id="payment" value={formData.payment} onChange={handleInputChange} required>
                <option value="">Valitse maksutapa</option>
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