const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./UserData.json');
const recipeData = require('./RecipeData.json');
const stepData = require('./StepData.json');

const seedDatabase = async () => {
    await sequelize.sync({  })
}