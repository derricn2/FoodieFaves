const express = require('express');
const router = express.Router();
const recipeRoutes = require('./RecipeRoutes');
const userRoutes = require('./UserRoutes');

//maybe change to /recipe and /user
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;
