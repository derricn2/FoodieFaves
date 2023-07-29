const User = require('./User');
const Recipe = require('./Recipe');
const Step = require('./Step');

User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Recipe.hasOne(Step, {
    foreignKey: 'recipe_id'
});

Step.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});


module.exports = {User,Recipe,Step}