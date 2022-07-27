const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const restaurantModel = require('../models/restaurant');

class RestaurantUtils extends CommonUtils{
    constructor() {super()}

    validateCreateRestaurantParams(data){

        const requiredParams = ['shopName', 'ownerCNIC', 'ownerName', 'orderQueueSize'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateGetItemsByCategoryParams(data){

        const requiredParams = ['id'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateCreateMenuParams(data){

        const requiredParams = ['providerID','itemID','price','description'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    async checkRestaurant(id){

        const restaurant = await restaurantModel.getProvider(id);

        return restaurant ?? false;
    }

    async checkCategory(id){

        const restaurant = await restaurantModel.getCategoryById(id);

        return restaurant ?? false;
    }
}

module.exports = RestaurantUtils;