import '../index.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase_client'

const Order = () => {
    const navigate = useNavigate()

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
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormData({ ...formData, [id]: value })
    }

    const handleOrder = async (e) => {
        e.preventDefault()
        const product = "Mouse pad"
        const quantity = 1
        const price = 40
        const designUrl = ''

        const { data, error } = await supabase
            .from('orders')
            .insert({
                name: formData.name,
                email: formData.email,
                address: formData.address,
                city: formData.city,
                payment_method: formData.payment,
                product: product,
                quantity: quantity,
                price: price,
                design_url: designUrl,
            })
            .select('*')

            if (error) {
                console.error('Error creating order: ', error)
                alert('Tilaus epäonnistui, yritä uudelleen.')
            } else {
                console.log('Order created: ', data)
                navigate('/endpage', { state: { order: data[0] } })
            }
    }

return (
    <div className="form-container">
        <form onSubmit={handleOrder}>
            <label htmlFor="name">Nimi</label>
            <input type="text" id="name" value={formData.name} onChange={handleInputChange} required/>

            <label htmlFor="address">Katuosoite</label>
            <input type="text" id="address" value={formData.address} onChange={handleInputChange} required/>

            <label htmlFor="city">Kaupunki</label>
            <input type="text" id="city" value={formData.city} onChange={handleInputChange} required/>

            <label htmlFor="payment">Valitse maksutapa</label>
            <select id="payment" value={formData.payment} onChange={handleInputChange} required>
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