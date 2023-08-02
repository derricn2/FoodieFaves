const { Recipe, Step } = require('../../models');

const RecipeController = {
    getAllRecipes: async (req, res) => {
        if(!req.session.user_id){
            return res.render("unauthorized")   
           }
        try {
            // Retrieve all recipes from the database
            let recipes = await Recipe.findAll();

            // Send the recipe as a JSON response
            //res.json(recipes);
            console.log(recipes[0].dataValues)
            recipes = recipes.map(item => item.dataValues)
            res.render('recipes', {recipes})
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json(error);
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
};

module.exports = RecipeController;