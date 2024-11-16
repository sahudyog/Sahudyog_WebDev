const express = require('express');
const guideController = require('../controllers/guideController');
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();


router.route('/signup').post(async (req, res, next) => {
    try {
        await guideController.guideSignup(req, res);
    } catch (error) {
        next(error);
    }
});

router.route('/signin').post(async (req, res, next) => {
    try {
        await guideController.guideSignin(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;