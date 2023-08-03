const { Recipe, Step } = require('../../models');

const RecipeController = {
    getAllRecipes: async (req, res) => {
        if(!req.session.user_id){
            return res.render("unauthorized")   
           }
           try {
            // Retrieve all recipes from the database associated with the logged-in user
            let recipes = await Recipe.findAll({ where: { user_id: req.session.user_id } });
    
            // If no recipes found, render the 'recipes' view with a message
            if (recipes.length === 0) {
                return res.render('recipes', { loggedIn: req.session.logged_in, recipes });
            }
    
            // Map the recipes to get plain data
            recipes = recipes.map(recipe => recipe.get({ plain: true }));
    
            // Render the 'recipes' view with the recipes data
            res.render('recipes', { recipes });
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).render('error', { error: 'An error occurred while fetching recipes.' });
        }
    },

    getRecipeById: async (req, res) => {
        if(!req.session.user_id){
            return res.render("unauthorized")   
           }
        try {
            // retrieve a single recipe by ID from the database
            const recipeID = req.params.id;
            const recipe = await Recipe.findByPk(recipeID,{
                include: [
                    {
                        model: Step,
                    }
                ]
            });
            const recipeSer = recipe.get({ plain: true });
            // check if the recipe exists
            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }

            // send the recipe as a JSON response
            res.render('singleRecipe', recipeSer);
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            res.status(500).json({ error: 'Unable to fetch recipe' });
        }
    },

    createRecipe: async (req, res) => {
        if(!req.session.user_id){
            return res.render("unauthorized")   
           }
        try {
            console.log(req.body)
            // extract recipe details from the request body
            const { name, description, flavor, cuisine } = req.body;
            let user_id=req.session.user_id
            // create a new recipe in the database
            const newRecipe = await Recipe.create({
                name, description, flavor, cuisine, user_id
                // you may also associate the recipe with the currently logged-in user if you have authentication implemented.
            });

            // send the newly created recipe as a JSON response
            res.redirect("/api/recipes");
        } catch (error) {
            console.error('Error creating recipe:', error);
            res.status(500).json({ error: 'Unable to create recipe' });
        }
    },
    
    deleteRecipe: async (req, res) => {
        if(!req.session.user_id){
            return res.render("unauthorized")   
        }
        try {
            // Retrieve the recipe with the given ID
            const recipe = await Recipe.findOne({ where: { id: req.params.id } });
    
            // Check if the recipe exists and if it belongs to the logged-in user
            if (!recipe || recipe.user_id !== req.session.user_id) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
    
            // Delete the recipe
            await recipe.destroy();
    
            // Redirect to the recipes page
            res.redirect('/api/recipes');
        } catch (error) {
            console.error('Error deleting recipe:', error);
            res.status(500).json({ error: 'Unable to delete recipe' });
        }
    },
};

module.exports = RecipeController;