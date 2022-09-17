const express = require('express');
const router = express.Router();

const RestaurantController = require('../../controllers/RestaurantController');
const controller = new RestaurantController();


router.post('/createRestaurant', controller.createRestaurant.bind(controller));


module.exports = router