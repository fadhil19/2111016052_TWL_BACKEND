const express = require('express');
const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan

let products = ['tt','ii'];

// Menggunakan middleware bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', (req, res) => {
    res.json(products);
  });
  
  app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(product => product.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = { id: generateId(), name, price, description };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });
  
  app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price, description } = req.body;
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], name, price, description };
      res.json(products[productIndex]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const productIndex = products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      res.json(deletedProduct[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
  
  function generateId() {
    const timestamp = Date.now().toString(); // Mendapatkan timestamp saat ini
    const randomNum = Math.floor(Math.random() * 1000).toString(); // Mendapatkan angka acak antara 0-999
    const uniqueId = timestamp + randomNum; // Menggabungkan timestamp dan angka acak
    return uniqueId;
  }
  


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
