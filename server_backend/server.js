const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // ✅ Load .env before using any env vars

const admin = require('./utils/firebaseAdmin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ after dotenv.config()

const app = express();
const PORT = process.env.PORT || 5020; // ✅ Allow dynamic port fallback

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Stripe Debug (optional)
console.log('✅ STRIPE KEY loaded:', process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No');

// console.log(process.env.STRIPE_SECRET_KEY);

// ✅ Routes

app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));


app.use('/api/payments', require('./routes/payments'));
app.use('/api/stripe', require('./routes/stripe')); // if using a separate stripe route

// ✅ Base route
app.get('/', (req, res) => {
res.send('✅ Amazon Backend API is running...');
});

// ✅ Start server
app.listen(PORT, () => {
console.log(`🚀 Server is running at http://localhost:${PORT}`);
});










// const express = require('express')
// const cors = require('cors')
// const dotenv = require('dotenv')
// const admin = require('./utils/firebaseAdmin') 

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// // const serviceAccount = require('../server_backend/firebase-service-account.json')

// // Load environment variables
// dotenv.config()

// // Initialize Firebase Admin
// // admin.initializeApp({
// //     credential: admin.credential.cert(serviceAccount)
// // })

// // Initialize Express
// const app = express()
// const PORT =  5020 // Process.env.PORT || 5020

// const paymentsRoute = require('./routes/payments');
// app.use('/api/payments', paymentsRoute);

// // Middleware
// app.use('/api/payments', require('./routes/payments'));

// app.use('/api/stripe', require('./routes/stripe'));
// app.use(cors())
// app.use(express.json())

// // Routes
// app.use('/api/products', require('./routes/products'))

// app.use('/api/orders', require('./routes/orders'))

// // Base route
// app.get('/', (req, res) => {
//     res.send('Amazon Backend API Running...')
// })
// console.log('✅ STRIPE KEY:', process.env.STRIPE_SECRET_KEY);

// // Start server
// app.listen(5020, () => {
//     console.log(`✅ Server is running at http://localhost:${PORT}`)
// })







// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const admin = require('./utils/firebaseAdmin');
// const path = require('path');


// // Load environment variables
// dotenv.config();

// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5020;

// // ✅ Middleware
// app.use(cors());
// app.use(express.json());

// // ✅ Stripe Initialization (after loading .env)
// const stripeKey = process.env.STRIPE_SECRET_KEY;
// if (!stripeKey) {
//   console.error('❌ STRIPE_SECRET_KEY not set in .env');
//   process.exit(1);
// }
// const stripe = require('stripe')(stripeKey);
// console.log('✅ STRIPE KEY loaded: Yes');

// // ✅ Routes
// app.use('/api/products', require('./routes/products'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/payments', require('./routes/payments'));
// app.use('/api/stripe', require('./routes/stripe'));

// // ✅ Base route
// app.get('/', (req, res) => {
//   res.send('✅ Amazon Backend API Running...');
// });

// // ✅ Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server is running at http://localhost:${PORT}`);
// });
