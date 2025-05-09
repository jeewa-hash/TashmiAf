const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoritesController');

// Route for adding a country to favorites
router.post('/favorites', favoriteController.addFavorite);

// Route for getting all favorite countries of the user
router.get('/favorites', favoriteController.getFavorites);

// Route for removing a favorite country
router.delete('/favorites', favoriteController.removeFavorite);

module.exports = router;
