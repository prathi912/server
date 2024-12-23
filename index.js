const express = require('express');
const sendEmailRoute = require('./api/send_email');
const paymentRoute = require('./api/payment');
const generateRoute = require('./api/generate');

const app = express();

// List of whitelisted domains
const allowedOrigins = [
  'https://micronanornd.paruluniversity.ac.in', 
  'https://micronanornd.paruluniversity.ac.in/contact',
  'https://micronanornd.paruluniversity.ac.in/payment',
  'https://server-1-22hx.onrender.com',
  'localhost:3000',
  // Add the specific origins you want to allow
];
// Middleware for CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow specific origins
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all for testing
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Include OPTIONS
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // Respond with no content
  }

  next();
});

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Routes for payment and email functionality
app.use('/api/payment', paymentRoute);
app.use('/api/send_email', sendEmailRoute);
app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});
