const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const RestaurantUtils = require("../utils/restaurant");
const {isEmpty} = require("../helper/helper");
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
                LICENSE_NO: data.licenseNo,
                ORDER_QUEUE_SIZE: data.orderQueueSize,
                CURRENT_QUEUE_SIZE: data.orderQueueSize,
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

    async updateRestaurant(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateUpdateRestaurantParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            let restaurantObject = {};
            if (!isEmpty(data.shopName)) restaurantObject.SHOP_NAME = data.shopName;
            if (!isEmpty(data.openTime)) restaurantObject.OPEN_TIME = data.openTime;
            if (!isEmpty(data.closeTime)) restaurantObject.CLOSE_TIME = data.closeTime;
            if (!isEmpty(data.ownerName)) restaurantObject.OWNER_NAME = data.ownerName;
            if (!isEmpty(data.acceptVoucher)) restaurantObject.ACCEPT_VOUCHER = data.acceptVoucher;
            if (!isEmpty(data.orderQueueSize)) restaurantObject.ORDER_QUEUE_SIZE = data.orderQueueSize;
            if (!isEmpty(data.isOpen)) restaurantObject.IS_OPEN = data.isOpen;


            if (Object.keys(restaurantObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);

            // Preparing data object to save in database
            console.log(">>>>>>>>>>>> Updating restaurant in Database", restaurantObject)

            //restaurantObject.MODIFIED_AT = Date();
            const updatedRestaurant = await restaurantModel.updateRestaurant(data.providerID, restaurantObject);

            console.log(">>>>>>>>>>>>> RESTAURANT: ", updatedRestaurant);

            return updatedRestaurant[0];

        }
        catch(err){
            throw err;
        }

    }

    async addContact(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateAddContactParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            const contact = await this.restaurantUtils.checkContactByValue(data.contactValue);
            if (contact){
                console.log("Contact already registered: ", data.contactValue);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.CONTACT_ALREADY_REGISTERED);
            }

            // Preparing data object to save in database
            const contactObject = {
                PROVIDER_ID: data.providerID,
                CONTACT_TYPE: data.contactType,
                CONTACT_VALUE: data.contactValue,
                ACTIVE_IND: 1
            }

            console.log(">>>>>>>>>>>> Adding Contact in Database", contactObject)

            const newContact = await restaurantModel.addContact(contactObject)

            console.log(">>>>>>>>>>>>> NEW CONTACT: ", newContact);

            return newContact[0];

        }
        catch(err){
            throw err;
        }
    }

    async updateContact(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateUpdateContactParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            const contact = await this.restaurantUtils.checkContactById(data.providerID, data.contactID);
            if (!contact){
                console.log(`No contact found against provider id: ${data.providerID} and contact id: ${data.contactID}`);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_CONTACT_FOUND);
            }

            let contactObject = {};
            if (!isEmpty(data.contactValue)) contactObject.CONTACT_VALUE = data.contactValue;
            if (!isEmpty(data.activeInd)) contactObject.ACTIVE_IND = data.activeInd;

            console.log(">>>>>>>>>>>> Updating Contact in Database", contactObject)

            const updatedContact = await restaurantModel.updateContact(data.contactID, contactObject)

            console.log(">>>>>>>>>>>>> UPDATED CONTACT: ", updatedContact);

            return updatedContact[0];

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

    async updateMenu(data) {

        try{
                
            let [paramsValidated, err] = this.restaurantUtils.validateUpdateMenuParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }
        
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }
            console.log(">>>>> Restaurant Found: ", JSON.stringify(restaurant));

            const menu = await this.restaurantUtils.checkMenu(data.providerID, data.itemID);
            if (!menu){
                console.log(`No menu found against provider id: ${data.providerID} and menu id: ${data.itemID}`);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_MENU_FOUND);
            }
            console.log(">>>>> Menu Item Found: ", JSON.stringify(menu));

            let menuObject = {};
            if (!isEmpty(data.price)) menuObject.PRICE = data.price;
            if (!isEmpty(data.description)) menuObject.DESCRIPTION = data.description;
            if (!isEmpty(data.isAvailable)) menuObject.IS_AVAILABLE = data.isAvailable;

            if (Object.keys(menuObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);


            console.log(">>>>>>>>>>>> Updating menu in Database", menuObject);
            const updatedMenu = await restaurantModel.updateMenu(data.itemID, menuObject);
            console.log(">>>>>>>>>>>>> Menu Updated: ", updatedMenu);

            return updatedMenu[0];
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
            throw err;
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
            throw err;
        }
    }

    async getQueueState(data) {
        try{

            const [paramsValidated, err] = this.restaurantUtils.validateGetQueueStateParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            const provider = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!provider){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            const currentQueueSize = await restaurantModel.getQueueState(data.providerID);
            console.log(currentQueueSize.CURRENT_QUEUE_SIZE);
            if (currentQueueSize.CURRENT_QUEUE_SIZE != 0)
                return true;
            return false;

        }
        catch(err){
            throw err;
        }
    }
}

module.exports = RestaurantService;