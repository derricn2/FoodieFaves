const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        flavor: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                isIn: [['savory', 'sweet', 'sour', 'bitter', 'umami']]
            }
        },
        cuisine: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
                // can put a message that says "please put 'home recipe' if unsure what type of cuisine when recording new recipes
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
    },{sequelize}
);

module.exports = Recipe;