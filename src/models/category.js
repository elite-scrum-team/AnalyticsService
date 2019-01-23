const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        name: {
            type: DataTypes.TEXT,
        },
    });
    Category.associate = models => {
        Category.hasMany(models.warning)
    }
    return Category;
};
