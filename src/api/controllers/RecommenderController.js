const RecommenderService = require("../services/RecommenderService");
const BaseController  = require("./BaseController");
const STATUS_CODES = require('../constants/StatusCodes');
const RESPONSE_MESSAGE = require('../constants/ResponseMessages');

class RecommenderController extends BaseController {
    constructor() {
        
        super();
        
        this.recommenderService = new RecommenderService();
    
    }

}


module.exports =  RestaurantController;