const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Firebase Admin
try {
  const serviceAccount = require('./firebase-service-account.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET
  });

  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  // Make db and bucket available to routes
  app.use((req, res, next) => {
    req.db = db;
    req.bucket = bucket;
    next();
  });

  console.log('✅ Firebase Initialized Successfully');
} catch (error) {
  console.error('❌ Firebase Initialization Error:', error.message);
  console.error('Make sure firebase-service-account.json exists in the backend folder');
}

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/sellers', require('./routes/sellers'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server running', message: 'Backend is operational' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});
