const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items array' });
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name || 'Product',
        },
        unit_amount: Math.round(item.price * 100), // 💵 cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3009/success', // ✅ frontend success URL
      cancel_url: 'http://localhost:3009/cancel',   // ✅ frontend cancel URL
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe session creation failed:', error);
    res.status(500).json({ error: 'Stripe checkout session failed.' });
  }
});

module.exports = router;
