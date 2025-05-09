const FavoriteCountry = require('../models/Favorite');

// Add a country to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { userId, countryId, countryName, flagUrl } = req.body;

    const newFavorite = new FavoriteCountry({
      userId,
      countryId,
      countryName,
      flagUrl
    });

    await newFavorite.save();
    res.status(200).json({ message: 'Country added to favorites!' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites', error: error.message });
  }
};

// Get all favorite countries for a user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteCountry.find({ userId: req.params.userId });
    
    if (!favorites.length) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
};

// Remove a country from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const { userId, countryId } = req.params;

    const removedFavorite = await FavoriteCountry.findOneAndDelete({ userId, countryId });
    
    if (!removedFavorite) {
      return res.status(404).json({ message: 'Country not found in favorites' });
    }

    res.status(200).json({ message: 'Country removed from favorites!' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites', error: error.message });
  }
};
