const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const restaurantModel = require('../models/restaurant');
const Blob = require('node:buffer');

class RestaurantUtils extends CommonUtils{
    constructor() {super()}

    validateCreateRestaurantParams(data){

        const requiredParams = ['shopName', 'licenseNo', 'ownerName', 'orderQueueSize', 'latitude', 'longitude'];

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

    validateGetRestaurantParams(data){

        const requiredParams = ['latitude', 'longitude'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateGetProvidersParams(data){

        const requiredParams = ['ids'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateGetMenuParams(data){

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

        const requiredParams = ['providerID','itemID','price','description', 'image', 'imageType'];

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

    validateAddIngredientsParams(data){

        const requiredParams = ['providerID','itemID','ingredients'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateUpdateIngredientParams(data){

        const requiredParams = ['providerID', 'ingredientID'];

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

    validateSaveFeedbackParams1(data){

        const requiredParams = ['providerID', 'userID', 'feedback'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateSaveFeedbackParams2(data){

        const requiredParams = ['itemID', 'rating', 'review'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateGetFeedbackParams(data){

        const requiredParams = ['itemID', 'providerID'];

        const [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    async checkRestaurant(id){

        //gets the provider with the given provider id
        const restaurant = await restaurantModel.getProvider([id]);
        //returns false if no restaurant (null or undefined) is returned
        return restaurant ?? false;
    }

    async checkContactById(id, contactID){

        //gets the contact with the given provider id and contact id
        const contact = await restaurantModel.getContactById(id, contactID);
        //returns false if no contact (null or undefined) is returned
        return contact ?? false;
    }

    async checkContactByValue(value){

        //gets the contact with the given value
        const contact = await restaurantModel.getContactByValue(value);
        //returns false if no contact (null or undefined) is returned
        return contact ?? false;
    }

    async checkMenu(providerID, providerItemID){

        //gets the menu item with the given provider id and item id
        const menu = await restaurantModel.getMenuItem(providerID, providerItemID);
        //returns false if no menu item (null or undefined) is returned
        return menu ?? false;
    }

    async checkIngredient(id){

        //gets the ingredient with the given ingredient id
        const ingredient = await restaurantModel.getIngredient(id);
        //returns false if no ingredient (null or undefined) is returned
        return ingredient ?? false;
    }

    async checkCategory(id){

        //gets the category with the given category id
        const category = await restaurantModel.getCategoryById(id);
        //returns false if no category (null or undefined) is returned
        return category ?? false;
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }
}

module.exports = RestaurantUtils;