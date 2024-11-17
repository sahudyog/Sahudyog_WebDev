const express = require('express');
const tripController = require('../controllers/tripController')
const router = express.Router();

router.route('/createTrip').post(async (req, res, next) => {
    try{
        await tripController.createTrip(req, res);
    } catch (error) {
        next(error);
    }
})
router.route('/deleteTrip').delete(async (req, res, next) => {
    try{
        await tripController.deleteTrip(req, res);
    } catch (error) {
        next(error);
    }
})

module.exports = router;