const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Get all products
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    const productsSnapshot = await db.collection('products')
      .where('isActive', '==', true)
      .orderBy('createdAt', 'desc')
      .get();
    
    const products = [];
    productsSnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get products by seller
// Get products by seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const db = req.db;
    const productsSnapshot = await db.collection('products')
      .where('sellerId', '==', req.params.sellerId)
      .get();
    
    const products = [];
    productsSnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort in JavaScript instead
    products.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return b.createdAt.toMillis() - a.createdAt.toMillis();
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get single product
router.get('/:id', async (req, res) => {
  try {
    const db = req.db;
    const productDoc = await db.collection('products').doc(req.params.id).get();
    
    if (!productDoc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const db = req.db;
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      originalPrice: req.body.originalPrice || null,
      category: req.body.category,
      image: req.body.image,
      stock: req.body.stock,
      rating: 0,
      ecoScore: req.body.ecoScore || 'B',
      sellerId: req.body.sellerId,
      sellerName: req.body.sellerName,
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection('products').add(productData);
    const newProduct = await docRef.get();
    
    res.status(201).json({ id: newProduct.id, ...newProduct.data() });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const db = req.db;
    const productRef = db.collection('products').doc(req.params.id);
    const productDoc = await productRef.get();
    
    if (!productDoc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productData = productDoc.data();
    
    // Check if user is the seller
    if (productData.sellerId !== req.body.sellerId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updateData = {
      ...req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    // Remove sellerId from update to prevent changing ownership
    delete updateData.sellerId;

    await productRef.update(updateData);
    const updatedProduct = await productRef.get();
    
    res.json({ id: updatedProduct.id, ...updatedProduct.data() });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const db = req.db;
    const productRef = db.collection('products').doc(req.params.id);
    const productDoc = await productRef.get();
    
    if (!productDoc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productData = productDoc.data();
    
    // Check if user is the seller
    if (productData.sellerId !== req.body.sellerId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await productRef.delete();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
