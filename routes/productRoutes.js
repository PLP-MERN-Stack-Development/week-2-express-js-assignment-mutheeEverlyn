const express = require('express');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// In-memory product store
let products = [];

// GET all products with optional filtering, search, and pagination
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json({ page, limit, total, products: paginated });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product
router.post(
  '/',
  body('name').isString().notEmpty(),
  body('description').isString().optional(),
  body('price').isFloat({ gt: 0 }),
  body('category').isString().notEmpty(),
  body('inStock').isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const newProduct = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description || '',
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  }
);

// PUT update product
router.put(
  '/:id',
  body('name').isString().notEmpty(),
  body('description').isString().optional(),
  body('price').isFloat({ gt: 0 }),
  body('category').isString().notEmpty(),
  body('inStock').isBoolean(),
  (req, res) => {
    const productIndex = products.findIndex(p => p.id === req.params.id);
    if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    products[productIndex] = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description || '',
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
    };

    res.json(products[productIndex]);
  }
);

// DELETE product
router.delete('/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });

  products.splice(productIndex, 1);
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
