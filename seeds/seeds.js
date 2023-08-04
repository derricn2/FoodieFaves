const sequelize = require('../config/connection');
const { User, Recipe, Step } = require('../models');

const userData = require('./UserData.json');
const recipeData = require('./RecipeData.json');
const stepData = require('./StepData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true
    });

    await Step.bulkCreate(stepData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedDatabase();
