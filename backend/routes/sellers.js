const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock seller storage (replace with MongoDB model later)
let sellers = [];

// Get all sellers (admin only)
router.get('/all', async (req, res) => {
  try {
    // Return sellers without passwords
    const sellersData = sellers.map(seller => ({
      id: seller.id,
      name: seller.name,
      email: seller.email,
      businessName: seller.businessName,
      createdAt: seller.createdAt
    }));
    
    res.json(sellersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seller Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, businessName } = req.body;

    // Check if seller exists
    const existingSeller = sellers.find(s => s.email === email);
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      businessName,
      createdAt: new Date().toISOString(),
    };

    sellers.push(newSeller);

    // Create token
    const token = jwt.sign(
      { id: newSeller.id, email: newSeller.email, role: 'seller' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      seller: {
        id: newSeller.id,
        name: newSeller.name,
        email: newSeller.email,
        businessName: newSeller.businessName,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seller Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = sellers.find(s => s.email === email);
    if (!seller) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: seller.id, email: seller.email, role: 'seller' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      seller: {
        id: seller.id,
        name: seller.name,
        email: seller.email,
        businessName: seller.businessName,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
