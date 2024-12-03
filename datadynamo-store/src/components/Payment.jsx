import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase, sendConfirmationEmail } from '../services/supabase_client'

const stripePromise = loadStripe('pk_test_51QRcKAFJyPUoiWyOfn7rJC4mznPSeGoaihQkISmwx9pFgq9SyFh5fU4mAxwsfxq6WeYrXly7sKswEInLTZEenuj300spVxytOA')

const Payment = () => {
  const [amount, setAmount] = useState(3000)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const location = useLocation()

  const size = location.state?.size
  const price = location.state?.price
  const quantity = location.state?.quantity
  const totalPrice = price * quantity
  const user = location.state?.user

  const handlePayment = async () => {
    if (!stripe || !elements) {
        return
    }

    setLoading(true)

    try {
        const response = await axios.post('http://localhost:4000/create-payment-intent', { amount })
        const clientSecret = response.data.clientSecret

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Customer',
                },
            },
        })

        if (error) {
            console.error(error.message)
            alert(error.message)
        } else if (paymentIntent.status === 'succeeded') {
            alert('Maksu onnistui!')

            const orderData = {
              name: user.name,
              email: user.email,
              address: user.address,
              city: user.city,
              product: "Hiirimatto",
              size: size,
              quantity: quantity,
              price: totalPrice,
              payment_method: 'Pankkikortti',
          }

          const { data, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select('*')
  
      if (orderError) {
          console.error('Error creating order: ', orderError)
          alert('Order creation failed. Please try again.')
          return
      }

    const emailResponse = await sendConfirmationEmail(data[0])
    if (emailResponse.error) {
        console.error(emailResponse.error)
    } else {
        console.log('Email sent successfully')
    }

    setTimeout(() => {
      navigate('/endpage', { state: { order: data[0], price: totalPrice } })
  }, 300)
}
    } catch (error) {
        console.error(error)
        alert('Payment failed')
    } finally {
        setLoading(false)
    }
  }



  return (
    <div className="payment-container">
      <h2>Viimeistele ostos</h2>
      <form onSubmit={(e) => e.preventDefault()} className="payment-form">
        <label htmlFor="card-element">Pankkikortti</label>
        <div className="card-element-container">
          <CardElement id="card-element" />
        </div>
        <button disabled={loading} onClick={handlePayment} className="button">
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  )
}

export default function WrappedPaymentComponent() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  )
}
