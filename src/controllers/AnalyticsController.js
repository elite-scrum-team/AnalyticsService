const db = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {

    numberOfTotalWarnings: async (startDate, endDate) =>
        db.warning.findOne({
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                ...whereAddOn
            }
        }).then(it => it.dataValues),


    numberOfWarningsLinechart: async (startDate, endDate, dateFormat, whereAddOn) =>
        db.warning.findAll({
            attributes: [
                [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('createdAt'), dateFormat), 'date'],
                [Sequelize.literal('COUNT(*)'), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                ...whereAddOn
            },
            group: ['date']
        }).then(it => it.map(data => data.dataValues)),

    
    numberOfWarningsWithStatus: async (startDate, endDate, statusCode, whereAddOn) =>
        db.warning.findOne({
            attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count']
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
                latestStatusType: statusCode,
                ...whereAddOn
            }
        }).then(it => it.dataValues),


    categoriesWithNumberOfWarnings: async (startDate, endDate, whereAddOn) =>
        db.category.findAll()
        .then(data => Promise.all(data.map(async it => {
            let output = { name: it.dataValues.name }
            output.warnings = await it.countWarnings({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                ...whereAddOn
            })
            return output
        })))


}