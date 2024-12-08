<<<<<<< Updated upstream:datadynamo-store/src/pages/Payment.jsx
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase, sendConfirmationEmail } from '../services/supabase_client'

const stripePromise = loadStripe('pk_test_51QRcKAFJyPUoiWyOfn7rJC4mznPSeGoaihQkISmwx9pFgq9SyFh5fU4mAxwsfxq6WeYrXly7sKswEInLTZEenuj300spVxytOA')

const Payment = () => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const location = useLocation()

  const { size, price, quantity, totalPrice, user } = location.state

  useEffect(() => {
    const calcAmount = totalPrice * 100
    setAmount(calcAmount)
  }, [totalPrice])

  const handlePayment = async () => {
    if (!stripe || !elements) return

    setLoading(true)

    try {
      console.log('Payment amount: ', amount)

      const response = await axios.post('http://localhost:4000/create-payment-intent', { amount })
      const clientSecret = response.data.clientSecret

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, { 
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: 'user.name' },
        },
      })

      if (error) {
        console.error(error.message)
        alert('Maksu ei onnistunut: ', error.message)
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
          price: price,
          total_price: totalPrice,
          payment_method: 'Pankkikortti',
        }

        const { data, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select('*')
  
        if (orderError) {
          console.error('Error creating order: ', orderError)
          alert('Tilauksen lähetys epäonnistui. Yritä uudelleen.')
          return
        }

        const emailResponse = await sendConfirmationEmail(data[0])
        if (emailResponse.error) {
          console.error(emailResponse.error)
        } else {
          console.log('Email sent successfully')
        }

        setTimeout(() => {
          navigate('/endpage', {
            state: {
              order: data[0],
              price: price,
              totalPrice: totalPrice
            },
          })
        }, 300)
      }
    } catch (error) {
        console.error(error)
        alert('Maksu epäonnistui')
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
          <CardElement 
            id="card-element"
            options={{
              style: {
                base: {
                  backgroundColor: '#333344',
                  color: '#ffffff',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontSize: '16px',
                  '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                },
                invalid: {
                  color: '#ff4d4d',
                },
              },
            }}
          />
        </div>
        <button disabled={loading} onClick={handlePayment} className="button">
          {loading ? 'Odota...' : 'Maksa nyt'}
        </button>
      </form>
      <p><strong>Testikortin tiedot:</strong></p>
      <p>4242 4242 4242 4242, 11/28, 123, 96300</p>
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
=======
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase, sendConfirmationEmail } from '../services/supabase_client';

const stripePromise = loadStripe(
  'pk_test_51QRcKAFJyPUoiWyOfn7rJC4mznPSeGoaihQkISmwx9pFgq9SyFh5fU4mAxwsfxq6WeYrXly7sKswEInLTZEenuj300spVxytOA'
);

const Payment = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const { size, price, quantity, totalPrice, user } = location.state;

  useEffect(() => {
    const calcAmount = totalPrice * 100;
    setAmount(calcAmount);
  }, [totalPrice]);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      console.log('Payment amount: ', amount);

      const response = await axios.post(
        'http://localhost:4000/create-payment-intent',
        { amount }
      );
      const clientSecret = response.data.clientSecret;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: 'user.name' },
          },
        }
      );

      if (error) {
        console.error(error.message);
        alert('Maksu ei onnistunut: ', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Maksu onnistui!');

        const orderData = {
          name: user.name,
          email: user.email,
          address: user.address,
          city: user.city,
          product: 'Hiirimatto',
          size: size,
          quantity: quantity,
          price: price,
          total_price: totalPrice,
          payment_method: 'Pankkikortti',
        };

        const { data, error: orderError } = await supabase
          .from('orders')
          .insert([orderData])
          .select('*');

        if (orderError) {
          console.error('Error creating order: ', orderError);
          alert('Tilauksen lähetys epäonnistui. Yritä uudelleen.');
          return;
        }

        const emailResponse = await sendConfirmationEmail(data[0]);
        if (emailResponse.error) {
          console.error(emailResponse.error);
        } else {
          console.log('Email sent successfully');
        }

        setTimeout(() => {
          navigate('/endpage', {
            state: {
              order: data[0],
              price: price,
              totalPrice: totalPrice,
            },
          });
        }, 300);
      }
    } catch (error) {
      console.error(error);
      alert('Maksu epäonnistui');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Viimeistele ostos</h2>
      <form onSubmit={(e) => e.preventDefault()} className="payment-form">
        <label htmlFor="card-element">Pankkikortti</label>
        <div className="card-element-container">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  backgroundColor: '#333344',
                  color: '#ffffff',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  fontSize: '16px',
                  '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                },
                invalid: {
                  color: '#ff4d4d',
                },
              },
            }}
          />
        </div>
        <button disabled={loading} onClick={handlePayment} className="button">
          {loading ? 'Odota...' : 'Maksa nyt'}
        </button>
      </form>
      <p>
        <strong>Testikortin tiedot:</strong>
      </p>
      <p>4242 4242 4242 4242, 11/28, 123, 96300</p>
    </div>
  );
};

export default function WrappedPaymentComponent() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}
>>>>>>> Stashed changes:datadynamo-store/src/components/Payment.jsx
