const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Warning = sequelize.define('warning', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        description: {
            type: DataTypes.TEXT,
        },
        userId: {
            type: DataTypes.UUID,
        },
        locationId: {
            type: DataTypes.UUID,
        },
        latestStatusType: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
    Warning.associate = models => {
        Warning.belongsTo(models.category);
    };
    return Warning;
};
