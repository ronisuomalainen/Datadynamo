import express from 'express'
import cors from 'cors'
import stripeLib from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY)

const app = express()
app.use(cors())
app.use(express.json())

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method_types: ['card'],
        })

        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        console.error('Error creating payment intent:', error)
        res.status(500).send({ error: error.message })
    }
});

// Start the server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
