const { v4: uuidv4 } = require('uuid');

let products = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'A high-performance laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: uuidv4(),
    name: 'Smartphone',
    description: 'Latest smartphone model',
    price: 799.99,
    category: 'Electronics',
    inStock: true
  }
];

module.exports = products;
