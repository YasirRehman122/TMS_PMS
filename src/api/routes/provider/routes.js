const express = require('express');
const router = express.Router();

const RestaurantController = require('../../controllers/RestaurantController');
const controller = new RestaurantController();


router.post('/createRestaurant', controller.createRestaurant.bind(controller));
router.post('/updateRestaurant', controller.updateRestaurant.bind(controller));
router.post('/restaurant/addContact', controller.addContact.bind(controller));
router.post('/restaurant/updateContact', controller.updateContact.bind(controller));
router.post('/restaurant/createMenu', controller.createMenu.bind(controller));
router.post('/restaurant/updateMenu', controller.updateMenu.bind(controller));
router.get('/restaurant/status', controller.getQueueState.bind(controller));
router.get('/category', controller.getAllCategories.bind(controller));
router.get('/category/items', controller.getItemsByCategory.bind(controller));


module.exports = router