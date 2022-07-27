const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const RestaurantUtils = require("../utils/restaurant");
const restaurantModel = require("../models/restaurant");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");

class RestaurantService extends BaseService{
    constructor() {
        super()

        this.restaurantUtils = new RestaurantUtils();
    }

    async createRestaurant(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateCreateRestaurantParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            // Preparing data object to save in database
            const restaurantObject = {
                SHOP_NAME: data.shopName,
                OWNER_NAME: data.ownerName,
                OWNER_CNIC: data.ownerCNIC,
                ORDER_QUEUE_SIZE: data.orderQueueSize,
                ACTIVE_IND: 1,
                IS_OPEN: 1,
            }

            console.log(">>>>>>>>>>>> Inserting user in Database", restaurantObject)

            const newRestaurant = await restaurantModel.createRestaurant(restaurantObject)

            console.log(">>>>>>>>>>>>> NEW USER: ", newRestaurant);

            return newRestaurant[0];

        }
        catch(err){
            throw err;
        }

    }


    async createMenu(data) {

        try{
            
            if (!Array.isArray(data)) {
                throw new Exception(STATUS_CODES.BAD_REQUEST, "Array Expected.")
            }
                
            data.forEach(x => {
                
                let [paramsValidated, err] = this.restaurantUtils.validateCreateMenuParams(x);
                if (!paramsValidated){
                    throw new Exception(STATUS_CODES.BAD_REQUEST, err)
                }
            });
        
            const restaurant = await this.restaurantUtils.checkRestaurant(data[0].providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            console.log(">>>>> Restaurant Found: ", JSON.stringify(restaurant));

            
            let menuItems = [];
            for (const x of data) {

                const menuObject = {
                    PROVIDER_ID: x.providerID,
                    ITEM_ID: x.itemID,
                    PRICE: x.price,
                    DESCRIPTION: x.description,
                    ACTIVE_IND: 1,
                    IS_AVAILABLE: 1,
                }

                console.log(">>>>>>>>>>>> Inserting menu in Database", menuObject);
                const menu = await restaurantModel.createMenu(menuObject);
                console.log(">>>>>>>>>>>> Inserted menu in Database", menu);
                menuItems.push(menu);
            }

            console.log(">>>>>>>>>>>>> Menu Created: ", menuItems);
            return menuItems;
        }
        catch (err){
            throw err;
        }
    }


    async getAllCategories() {
        try{
            return await restaurantModel.getAllCategories();
        }
        catch(err){
            throw errr;
        }
    }

    async getItemsByCategory(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateGetItemsByCategoryParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            const category = await this.restaurantUtils.checkCategory(data.id);
            if (!category){
                console.log("No category found against id: ", data.id);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_CATEGORY_FOUND);
            }

            return await restaurantModel.getItemsByCategories(data.id);
        }
        catch(err){
            throw errr;
        }
    }
}

module.exports = RestaurantService;