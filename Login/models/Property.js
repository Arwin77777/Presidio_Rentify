const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String], 
    default: []
  },
  proximityToHospitals: {
    type: Boolean,
    default: false
  },
  proximityToColleges: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String], // Array of image URLs
    default: []
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User who is the seller
    required: true
  },
  available: {
    type: Boolean,
    default: true
  }
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;