const db = require('../../database/dbObject');


    const createRestaurant = async (restaurantObject) => db('PROVIDER_INFO').insert(restaurantObject).returning('*');

    const updateRestaurant = async (id, restaurantObject) => db('PROVIDER_INFO').where({ID: id}).update(restaurantObject).returning('*');

    const addContact = async (contactObject) => db('CONTACT').insert(contactObject).returning('*');

    const updateContact = async (id, contactObject) => db('CONTACT').where({ID: id}).update(contactObject).returning('*');

    const createMenu = async (menuObject) => db('PROVIDER_MENU_ITEM').insert(menuObject).returning('*');

    const updateMenu = async (id, menuObject) => db('PROVIDER_MENU_ITEM').where({ID: id}).update(menuObject).returning('*');

    const addIngredients = async (ingredientsArray) => db('INGREDIENTS').insert(ingredientsArray).returning('*');

    const updateIngredient = async (id, ingredientObject) => db('INGREDIENTS').where({ID: id}).update(ingredientObject).returning('*');

    const getIngredient = async (id) => db.select().table('INGREDIENTS').where({ID: id}).first();

    const getContactById = async (id, contactID) => db.select().table('CONTACT').where({ID: contactID, PROVIDER_ID: id}).first();

    const getContactByValue = async (value) => db.select().table('CONTACT').where({CONTACT_VALUE: value}).first();

    const getProvider = async (id) => db.select().table('PROVIDER_INFO').where({ID: id}).first();

    const getMenuItem = async (id, providerItemID) => db.select().table('PROVIDER_MENU_ITEM').where({ID: providerItemID, PROVIDER_ID: id}).first();

    const getAllCategories = async() => db.select().table('CATEGORY');

    const getCategoryById = async (id) => db.select().table('CATEGORY').where({ID: id}).first();

    const getItemsByCategories = async (id) => db.select().table('MENU_ITEM').where({CATEGORY_ID: id});

    const getQueueState = async (id) => db.select('CURRENT_QUEUE_SIZE').table('PROVIDER_INFO').where({ID: id}).first();

    module.exports = {
        createRestaurant,
        updateRestaurant,
        addContact,
        updateContact,
        createMenu,
        updateMenu,
        addIngredients,
        updateIngredient,
        getProvider,
        getContactById,
        getContactByValue,
        getMenuItem,
        getIngredient,
        getAllCategories,
        getCategoryById,
        getItemsByCategories,
        getQueueState
    }