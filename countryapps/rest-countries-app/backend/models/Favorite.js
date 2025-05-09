const mongoose = require('mongoose');

const favoriteCountrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  countryId: {
    type: String,  // This could be a country code or an ID from the country API
    required: true,
  },
  countryName: {
    type: String,
    required: true
  },
  flagUrl: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const FavoriteCountry = mongoose.model('FavoriteCountry', favoriteCountrySchema);

module.exports = FavoriteCountry;
