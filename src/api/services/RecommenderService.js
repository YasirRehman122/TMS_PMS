const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const RestaurantUtils = require("../utils/restaurant");
const {isEmpty} = require("../helper/helper");
const restaurantModel = require("../models/restaurant");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");
const moment = require('moment');

class RecommenderService extends BaseService{
    constructor() {
        super()

        this.restaurantUtils = new RestaurantUtils();
    }

    
}

module.exports = RecommenderService;