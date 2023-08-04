const express = require('express');
const router = express.Router();
const RecipeController = require('./RecipeControllers');

// GET all recipes
router.get('/', RecipeController.getAllRecipes);

// GET a single recipe by ID
router.get('/:id', RecipeController.getRecipeById);

// POST a new recipe
router.post('/', RecipeController.createRecipe);

// DELETE a recipe
router.delete('/:id', RecipeController.deleteRecipe);

module.exports = router;