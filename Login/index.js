const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { register, login } = require('./controllers/auth');
const { authenticate, authorizeAdmin } = require('./middleware/auth');
const { addProduct, updateProduct, deleteProduct } = require('./controllers/product');
const { addProperty, getProperty, updateProperty, deleteProperty, getAllProperties,getPropertiesBySeller } = require('./controllers/propertiesController');

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb+srv://arwinsekar213:Arwin123@crupapidb.wpc4cex.mongodb.net/?retryWrites=true&w=majority&appName=CrupAPIDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

app.use(express.json());
app.use(cors());

// User authentication routes
app.post('/register', register);
app.post('/login', login);

// Protected route example
app.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});


// Property management routes
app.post('/properties', authenticate, authorizeAdmin, addProperty);
app.get('/properties/:id', authenticate,getProperty);
app.put('/properties/:id', authenticate, authorizeAdmin, updateProperty);
app.delete('/properties/:id', authenticate, authorizeAdmin, deleteProperty);
app.get('/properties', authenticate,getAllProperties);
app.get('/seller', authenticate,authorizeAdmin,getPropertiesBySeller);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});