const express = require('express');
const router = express.Router();

const RestaurantController = require('../../controllers/RestaurantController');
const controller = new RestaurantController();


router.post('/restaurant', controller.createRestaurant.bind(controller));
router.post('/restaurant/menu', controller.createMenu.bind(controller));
router.get('/category', controller.getAllCategories.bind(controller));
router.get('/category/items', controller.getItemsByCategory.bind(controller));


module.exports = router