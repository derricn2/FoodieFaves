const sequelize = require('../config/connection');
const { User, Recipe, Step } = require('../models');

const userData = require('./UserData.json');
const recipeData = require('./RecipeData.json');
const stepData = require('./StepData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: false });

    await User.bulkcreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Recipe.bulkcreate(recipeData, {
        individualHooks: true,
        returning: true
    });

    await Step.bulkcreate(stepData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedDatabase();