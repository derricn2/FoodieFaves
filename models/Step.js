const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Step extends Model {}

Step.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'step'
    }
);

module.exports = Step