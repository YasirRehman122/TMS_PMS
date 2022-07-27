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

}


module.exports =  RestaurantController;