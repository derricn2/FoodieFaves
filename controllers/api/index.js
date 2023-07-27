const express = require('express');
const router = express.Router();
const recipeRoutes = require('./RecipeRoutes');
const userRoutes = require('./UserRoutes');

router.use('/api', recipeRoutes);
router.use('/api', userRoutes);

module.exports = router;
