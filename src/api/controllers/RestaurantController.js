const RestaurantService = require("../services/RestaurantService");
const BaseController  = require("./BaseController");
const STATUS_CODES = require('../constants/StatusCodes');
const RESPONSE_MESSAGE = require('../constants/ResponseMessages');

class RestaurantController extends BaseController {
    constructor() {
        
        super();
        
        this.restaurantService = new RestaurantService();
    
    }

    
    async createRestaurant(req, res, next){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CREATE RESTAURANT API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const restaurant = await this.restaurantService.createRestaurant(req.body);

            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.RESTAURANT_CREATED, restaurant);
        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }    
    }

    async updateRestaurant(req, res, next){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> UPDATE RESTAURANT API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const restaurant = await this.restaurantService.updateRestaurant(req.body);

            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.RESTAURANT_UPDATED, restaurant);
        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }    
    }

    async addContact(req, res, next){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> ADD CONTACT API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const contact = await this.restaurantService.addContact(req.body);

            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.CONTACT_ADDED, contact);
        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }    
    }

    async updateContact(req, res, next){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> UPDATE CCONTACT API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const contact = await this.restaurantService.updateContact(req.body);

            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.CONTACT_UPDATED, contact);
        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }    
    }

    async createMenu(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CREATE MENU API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const menu = await this.restaurantService.createMenu(req.body);
            
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.MENU_CREATED, menu);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async updateMenu(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> UPDATE MENU API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const menu = await this.restaurantService.updateMenu(req.body);
            
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.MENU_UPDATED, menu);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async addIngredients(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> ADD INGREDIENTS API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const menu = await this.restaurantService.addIngredients(req.body);
            
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.INGREDINETS_ADDED, menu);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async updateIngredient(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> UPDATE INGREDIENT API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            const menu = await this.restaurantService.updateIngredient(req.body);
            
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.INGREDIENT_UPDATED, menu);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getAllCategories(req, res, next) {
       
        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET ALL CATEGORIES API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const categories = await this.restaurantService.getAllCategories();

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.CATEGORIES_FETCHED, categories);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }


    async getItemsByCategory(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET ITEMS BY CATEGORY API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const items = await this.restaurantService.getItemsByCategory(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.ITEM_FETCHED, items);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getQueueState(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET QUEUE STATE API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const isAvailable = await this.restaurantService.getQueueState(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.ITEM_FETCHED, {isQueueAvailable: isAvailable});

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getNearbyRestaurants(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET NEARBY RESTAURANTS API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const restaurants = await this.restaurantService.getNearbyRestaurants(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.RESTAURANTS_FOUND, restaurants);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getBestSellingRestaurants(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET BEST SELLING RESTAURANTS API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const restaurants = await this.restaurantService.getBestSellingRestaurants(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.RESTAURANTS_FOUND, restaurants);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getPastRestaurants(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET PAST RESTAURANTS API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const restaurants = await this.restaurantService.getPastRestaurants(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.RESTAURANTS_FOUND, restaurants);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getProviders(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET PROVIDERS API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const restaurants = await this.restaurantService.getProviders(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, restaurants);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getRestaurantMenu(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET RESTAURANT MENU API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const menu = await this.restaurantService.getRestaurantMenu(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.MENU_FOUND, menu);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async saveFeedback(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SAVE FEEDBACK API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const feedback = await this.restaurantService.saveFeedback(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<", feedback);

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, feedback);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getFeedback(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET FEEDBACK API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const feedback = await this.restaurantService.getFeedback(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async savePendingFeedback(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SAVE PENDING FEEDBACK API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const feedback = await this.restaurantService.savePendingFeedback(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<", feedback);

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, feedback);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async savePendingFeedbackAgain(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SAVE PENDING FEEDBACK AGAIN API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const feedback = await this.restaurantService.savePendingFeedbackAgain(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<", feedback);

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, feedback);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async getPendingFeedback(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET PENDING FEEDBACK API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const feedback = await this.restaurantService.getPendingFeedback(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, feedback);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async updateQueue(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> UPDATE QUEUE API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            const queue = await this.restaurantService.updateQueue(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, queue);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }


}


module.exports =  RestaurantController;