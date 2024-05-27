const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { register, login } = require('./controllers/auth');
const { authenticate, authorizeAdmin } = require('./middleware/auth');
const { addProperty, getProperty, updateProperty, deleteProperty, getAllProperties, getPropertiesBySeller } = require('./controllers/propertiesController');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // List of domains that are allowed to access the server
        const allowedOrigins = [
            'https://presidio-rentify-omega.vercel.app',
            'https://presidio-rentify-4xlt.vercel.app'
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

app.use(express.json());

// User authentication routes
app.post('/register', register);
app.post('/login', login);

// Protected route example
app.get('/protected', authenticate, (req, res) => {
  res.send('This is a protected route');
});

// Property management routes
app.post('/properties', authenticate, authorizeAdmin, addProperty);
app.get('/properties/:id', authenticate, getProperty);
app.put('/properties/:id', authenticate, authorizeAdmin, updateProperty);
app.delete('/properties/:id', authenticate, authorizeAdmin, deleteProperty);
app.get('/properties', authenticate, getAllProperties);
app.get('/seller', authenticate, authorizeAdmin, getPropertiesBySeller);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});