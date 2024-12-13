import express from 'express'
import cors from 'cors'
import stripeLib from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.STRIPE_SECRET_KEY) {
  console.error('Missing STRIPE_SECRET_KEY in environment')
  process.exit(1)
}

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY)

const app = express()
app.use(cors({
  origin: [
    'https://ronisuomalainen.github.io',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}))
app.use(express.json())

const BACKEND_URL = 'https://datadynamo-backend.onrender.com/'

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).send({ error: 'Invalid amount' })
  }

  try {
    console.log('Creating payment intent for amount:', amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method_types: ['card']
    })

    console.log('Payment intent created:', paymentIntent.id)
    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Detailed error:', error)
    res.status(500).send({ 
      error: error.message,
      type: error.type,
      code: error.code 
    })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
