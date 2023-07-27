const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/api/RecipeController');

// GET all recipes
router.get('/recipes', RecipeController.getAllRecipes);

// GET a single recipe by ID
router.get('/recipes/:id', RecipeController.getRecipeById);

// POST a new recipe
router.post('/recipes', RecipeController.createRecipe);

module.exports = router;