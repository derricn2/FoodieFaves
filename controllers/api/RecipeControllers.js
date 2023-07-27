const Recipe = require('../../models/Recipe');

const RecipeController = {
    getAllRecipes: async (req, res) => {
        try {
            // Retrieve all recipes from the database
            const recipes = await Recipe.findAll();

            // Send the recipe as a JSON response
            res.json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'Unable to fetch recipes' });
        }
    },

    getRecipeById: async (req, res) => {
        try {
            // retrieve a single recipe by ID from the database
            const recipeID = req.params.id;
            const recipe = await Recipe.findByPk(recipeID);

            // check if the recipe exists
            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            // send the recipe as a JSON response
            res.json(recipe);
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            res.status(500).json({ error: 'Unable to fetch recipe' });
        }
    },

    createRecipe: async (req, res) => {
        try {
            // extract recipe details from the request body
            const { title, contents } = req.body;

            // create a new recipe in the database
            const newRecipe = await Recipe.create({
                title,
                contents,
                // you may also associate the recipe with the currently logged-in user if you have authentication implemented.
            });

            // send the newly created recipe as a JSON response
            res.json(newRecipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({ error: 'Unable to create recipe' });
        }
    },
};

module.exports = RecipeController;