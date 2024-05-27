const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { register, login } = require('./controllers/auth');
const { authenticate, authorizeAdmin } = require('./middleware/auth');
const { addProperty, getProperty, updateProperty, deleteProperty, getAllProperties,getPropertiesBySeller } = require('./controllers/propertiesController');

const app = express();
const PORT = process.env.PORT || 3000;

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
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