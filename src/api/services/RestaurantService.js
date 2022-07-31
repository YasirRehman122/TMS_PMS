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

            //checks if the request body contains all the required parameters
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
            //Executes the insert query to insert a restaurant
            //A list of all objects that are inserted is returned
            const newRestaurant = await restaurantModel.createRestaurant(restaurantObject)

            console.log(">>>>>>>>>>>>> NEW USER: ", newRestaurant);

            //returns the inserted restaurant as an object
            return newRestaurant[0];

        }
        catch(err){
            throw err;
        }

    }

    async updateRestaurant(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateUpdateRestaurantParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            //These are all optional parameters which may be present or not
            //If a parameter is present, the data object is updated which will later update the database
            let restaurantObject = {};
            if (!isEmpty(data.shopName)) restaurantObject.SHOP_NAME = data.shopName;
            if (!isEmpty(data.openTime)) restaurantObject.OPEN_TIME = data.openTime;
            if (!isEmpty(data.closeTime)) restaurantObject.CLOSE_TIME = data.closeTime;
            if (!isEmpty(data.ownerName)) restaurantObject.OWNER_NAME = data.ownerName;
            if (!isEmpty(data.acceptVoucher)) restaurantObject.ACCEPT_VOUCHER = data.acceptVoucher;
            if (!isEmpty(data.orderQueueSize)) restaurantObject.ORDER_QUEUE_SIZE = data.orderQueueSize;
            if (!isEmpty(data.isOpen)) restaurantObject.IS_OPEN = data.isOpen;


            //checks if the restaurantObject has any property
            //If restaurant object is empty, either no or invalid optional parameters are passed
            if (Object.keys(restaurantObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);

            console.log(">>>>>>>>>>>> Updating restaurant in Database", restaurantObject)

            //the provider information with given providerID is updated in the database
            //and an array of all modified objects is returned (which is 1).
            //restaurantObject.MODIFIED_AT = Date();
            const updatedRestaurant = await restaurantModel.updateRestaurant(data.providerID, restaurantObject);

            console.log(">>>>>>>>>>>>> RESTAURANT: ", updatedRestaurant);

            //updated information is returned as an object
            return updatedRestaurant[0];

        }
        catch(err){
            throw err;
        }

    }

    async addContact(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateAddContactParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            //checks if given contact is already registered
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

            //Adds a contact for the given provider in the database
            const newContact = await restaurantModel.addContact(contactObject)

            console.log(">>>>>>>>>>>>> NEW CONTACT: ", newContact);

            //recently added contact is returned
            return newContact[0];

        }
        catch(err){
            throw err;
        }
    }

    async updateContact(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateUpdateContactParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            //checks if the contact that is to be edited exists
            const contact = await this.restaurantUtils.checkContactById(data.providerID, data.contactID);
            if (!contact){
                console.log(`No contact found against provider id: ${data.providerID} and contact id: ${data.contactID}`);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_CONTACT_FOUND);
            }

            //These are all optional parameters which may be present or not
            //If a parameter is present, the data object is updated which will later update the database
            let contactObject = {};
            if (!isEmpty(data.contactValue)) contactObject.CONTACT_VALUE = data.contactValue;
            if (!isEmpty(data.activeInd)) contactObject.ACTIVE_IND = data.activeInd;

            //checks if the contactObject has any property
            //If contactObject is empty, either no or invalid optional parameters are passed
            if (Object.keys(contactObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);

            console.log(">>>>>>>>>>>> Updating Contact in Database", contactObject)

            //updating the database with the given contactID
            const updatedContact = await restaurantModel.updateContact(data.contactID, contactObject)

            console.log(">>>>>>>>>>>>> UPDATED CONTACT: ", updatedContact);

            //returning the updated contact
            return updatedContact[0];

        }
        catch(err){
            throw err;
        }

    }


    async createMenu(data) {

        try{
            
            //This request expects an array of objects in the request body
            if (!Array.isArray(data)) {
                throw new Exception(STATUS_CODES.BAD_REQUEST, "Array Expected.")
            }
                
            //checks if each object of the array contains all the required parameters
            data.forEach(x => {
                
                let [paramsValidated, err] = this.restaurantUtils.validateCreateMenuParams(x);
                if (!paramsValidated){
                    throw new Exception(STATUS_CODES.BAD_REQUEST, err)
                }
            });
        
            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data[0].providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            console.log(">>>>> Restaurant Found: ", JSON.stringify(restaurant));

            
            let menuItems = [];
            for (const x of data) {

                // Preparing data object to save in database
                const menuObject = {
                    PROVIDER_ID: x.providerID,
                    ITEM_ID: x.itemID,
                    PRICE: x.price,
                    DESCRIPTION: x.description,
                    ACTIVE_IND: 1,
                    IS_AVAILABLE: 1,
                }

                console.log(">>>>>>>>>>>> Inserting menu in Database", menuObject);
                //Saving the menu in database
                const menu = await restaurantModel.createMenu(menuObject);
                console.log(">>>>>>>>>>>> Inserted menu in Database", menu);
                //Adding the newly added menu in the array to be returned
                menuItems.push(menu);
            }

            console.log(">>>>>>>>>>>>> Menu Created: ", menuItems);
            //returning all the menu items added in the menu.
            return menuItems;
        }
        catch (err){
            throw err;
        }
    }

    async updateMenu(data) {

        try{
              
            //checks if the request body contains all the required parameters
            let [paramsValidated, err] = this.restaurantUtils.validateUpdateMenuParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }
        
            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }
            console.log(">>>>> Restaurant Found: ", JSON.stringify(restaurant));

            //checks if the menu item that needs to be updated exist in th database
            const menu = await this.restaurantUtils.checkMenu(data.providerID, data.itemID);
            if (!menu){
                console.log(`No menu found against provider id: ${data.providerID} and menu id: ${data.itemID}`);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_MENU_FOUND);
            }
            console.log(">>>>> Menu Item Found: ", JSON.stringify(menu));

            //These are all optional parameters which may be present or not
            //If a parameter is present, the data object is updated which will later update the database
            let menuObject = {};
            if (!isEmpty(data.price)) menuObject.PRICE = data.price;
            if (!isEmpty(data.description)) menuObject.DESCRIPTION = data.description;
            if (!isEmpty(data.isAvailable)) menuObject.IS_AVAILABLE = data.isAvailable;

            //checks if the menuObject has any property
            //If menuObject is empty, either no or invalid optional parameters are passed
            if (Object.keys(menuObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);


            console.log(">>>>>>>>>>>> Updating menu in Database", menuObject);
            //updating the menu item with given id in gthe database
            const updatedMenu = await restaurantModel.updateMenu(data.itemID, menuObject);
            console.log(">>>>>>>>>>>>> Menu Updated: ", updatedMenu);

            //returning the updated menu item
            return updatedMenu[0];
        }
        catch (err){
            throw err;
        }
    }

    async addIngredients(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateAddIngredientsParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }
            console.log(">>>>> Restaurant Found: ", JSON.stringify(restaurant));

            //checks if the menu item exist in th database
            const menu = await this.restaurantUtils.checkMenu(data.providerID, data.itemID);
            if (!menu){
                console.log(`No menu found against provider id: ${data.providerID} and menu id: ${data.itemID}`);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_MENU_FOUND);
            }
            console.log(">>>>> Menu Item Found: ", JSON.stringify(menu));

            if (data.ingredients.length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, "No ingredients present")

            //Creating database array of ingredients
            let ingredientsArray = [];
            data.ingredients.forEach(x => {
                
                const ingredient = {
                    MENU_ITEM_ID: data.itemID,
                    INGREDIENT_NAME: x,
                    ACTIVE_IND: 1
                };
                ingredientsArray.push(ingredient);
            });

            console.log(">>>>>>>>>>>> Adding ingredients in Database", ingredientsArray)
            //Executes the insert query to insert a restaurant
            //A list of all objects that are inserted is returned
            const newIngredients = await restaurantModel.addIngredients(ingredientsArray)

            console.log(">>>>>>>>>>>>> INGREDIENTS: ", newIngredients);

            //returns the inserted restaurant as an object
            return newIngredients;

        }
        catch(err){
            throw err;
        }

    }

    async updateIngredient(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateUpdateIngredientParams(data)
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const restaurant = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!restaurant){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            const ingredient = await this.restaurantUtils.checkIngredient(data.ingredientID);
            if (!ingredient){
                console.log("No ingredient found against id: ", data.ingredientID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_INGREDIENT_FOUND);
            }

            //These are all optional parameters which may be present or not
            //If a parameter is present, the data object is updated which will later update the database
            let ingredientObject = {};
            if (!isEmpty(data.ingredientName)) ingredientObject.INGREDIENT_NAME = data.ingredientName;
            if (!isEmpty(data.activeInd)) ingredientObject.ACTIVE_IND = data.activeInd;

            //checks if the restaurantObject has any property
            //If restaurant object is empty, either no or invalid optional parameters are passed
            if (Object.keys(ingredientObject).length === 0)
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.INVALID_PARAMETERS);

            console.log(">>>>>>>>>>>> Updating ingredient in Database", ingredientObject)

            
            //ingredient with given ingredient id is updated
            //restaurantObject.MODIFIED_AT = Date();
            const updatedIngredient = await restaurantModel.updateIngredient(data.ingredientID, ingredientObject);

            console.log(">>>>>>>>>>>>> Ingredient: ", updatedIngredient);

            //updated information is returned as an object
            return updatedIngredient[0];

        }
        catch(err){
            throw err;
        }

    }


    async getAllCategories() {
        try{
            //fetching and returning all the different food categories that the platform supports
            return await restaurantModel.getAllCategories();
        }
        catch(err){
            throw err;
        }
    }

    async getItemsByCategory(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateGetItemsByCategoryParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if this category exist in the database
            const category = await this.restaurantUtils.checkCategory(data.id);
            if (!category){
                console.log("No category found against id: ", data.id);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_CATEGORY_FOUND);
            }

            //fetching and returning all the food items belonging to a particular category
            return await restaurantModel.getItemsByCategories(data.id);
        }
        catch(err){
            throw err;
        }
    }

    async getQueueState(data) {
        try{

            //checks if the request body contains all the required parameters
            const [paramsValidated, err] = this.restaurantUtils.validateGetQueueStateParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            //checks if the restaurant with the given providerID exists
            const provider = await this.restaurantUtils.checkRestaurant(data.providerID);
            if (!provider){
                console.log("No restaurant found against id: ", data.providerID);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_PROVIDER_FOUND);
            }

            //fetching the current state of the queue
            const currentQueueSize = await restaurantModel.getQueueState(data.providerID);

            //returning if the queue has space or is full
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