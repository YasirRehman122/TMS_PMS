const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const restaurantModel = require('../models/restaurant');

class RestaurantUtils extends CommonUtils{
    constructor() {super()}

    validateCreateRestaurantParams(data){

        const requiredParams = ['shopName', 'licenseNo', 'ownerName', 'orderQueueSize'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateUpdateRestaurantParams(data){

        const requiredParams = ['providerID'];

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

    validateUpdateMenuParams(data){

        const requiredParams = ['providerID','itemID'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateAddContactParams(data){

        const requiredParams = ['providerID', 'contactType', 'contactValue'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateUpdateContactParams(data){

        const requiredParams = ['providerID', 'contactID'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateGetQueueStateParams(data){

        const requiredParams = ['providerID'];

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

    async checkContactById(id, contactID){

        const contact = await restaurantModel.getContactById(id, contactID);

        return contact ?? false;
    }

    async checkContactByValue(value){

        const contact = await restaurantModel.getContactByValue(value);

        return contact ?? false;
    }

    async checkMenu(providerID, providerItemID){

        const menu = await restaurantModel.getMenuItem(providerID, providerItemID);

        return menu ?? false;
    }

    async checkCategory(id){

        const category = await restaurantModel.getCategoryById(id);

        return category ?? false;
    }
}

module.exports = RestaurantUtils;