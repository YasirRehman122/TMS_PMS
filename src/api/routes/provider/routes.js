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
router.post('/restaurant/menu/addIngredients', controller.addIngredients.bind(controller));
router.post('/restaurant/menu/updateingredient', controller.updateIngredient.bind(controller));
router.post('/getNearbyRestaurants', controller.getNearbyRestaurants.bind(controller));
router.post('/getProviders', controller.getProviders.bind(controller));
router.post('/saveFeedback', controller.saveFeedback.bind(controller))
router.post('/getFeedback', controller.getFeedback.bind(controller))
router.get('/getRestaurantMenu', controller.getRestaurantMenu.bind(controller));
router.get('/restaurant/status', controller.getQueueState.bind(controller));
router.get('/category', controller.getAllCategories.bind(controller));
router.get('/category/items', controller.getItemsByCategory.bind(controller));


module.exports = router