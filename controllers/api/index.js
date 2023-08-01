const express = require('express');
const router = express.Router();
const recipeRoutes = require('./RecipeRoutes');
const userRoutes = require('./UserRoutes');
const favoriteRoutes = require('./favoritesRoutes');

//maybe change to /recipe and /user
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;
