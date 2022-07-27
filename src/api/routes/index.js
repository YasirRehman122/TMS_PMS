// Library Imports
const express = require("express");

// Local Imports
const providerRoutes = require('./provider/routes');
const response = require('../middlewares/Response');


// COntains all routes of the application
const router = express.Router();

router.use('/provider', response, providerRoutes);


router.get('/', async (_req, res, _next) => {
    res.status(200).json({
        status: "PMS Service up and running", 
        version: process.env.APP_VERSION,
        env: process.env.NODE_ENV
    });
});

module.exports = router