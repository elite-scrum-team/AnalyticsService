
const router = require('express').Router()
const AnalyticsController = require('../controllers/AnalyticsController')
const MapService = require('../services/MapService')

router.get('/distrobution', async (req, res) => {
    const { 
        warning = false, 
        category = false, 
        municipality, 
        startDate = '2000-01-01', 
        endDate = (new Date(Date.now() + 1 * 24*3600*1000)).toISOString().split('T')[0],
        dateFormat = '%Y-%m'
    } = req.query

    let whereAddOn = {}

    // Municipality filter
    if (municipality) {
        let locationIdsFromMunicipality = await MapService.location.retrieve(
            { municipality }
        );

        if (
            locationIdsFromMunicipality instanceof Array &&
            locationIdsFromMunicipality.length > 0 &&
            locationIdsFromMunicipality[0].id !== undefined
        ) {
            locationIdsFromMunicipality = locationIdsFromMunicipality.map(
                it => it.id
            );
            whereAddOn.locationId = { [Op.in]: locationIdsFromMunicipality };
        } else {
            res.status(500).send({ error: "Server could not get warningIds from municipality" })
        }
    }

    // Filters should be done by now, starting to fetch data to return
    let output = {}

    if (warning) {
        output.warning = await AnalyticsController.numberOfWarningsLinechart(startDate, endDate, dateFormat, whereAddOn)
    }

    if (category) {
        output.category = await AnalyticsController.categoriesWithNumberOfWarnings(startDate, endDate, whereAddOn)
    }

    res.send(output)
})


module.exports = router