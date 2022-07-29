const db = require('../../database/dbObject');


    const createRestaurant = async (restaurantObject) => db('PROVIDER_INFO').insert(restaurantObject).returning('*');

    const createMenu = async (menuObject) => db('PROVIDER_MENU_ITEM').insert(menuObject).returning('*');

    const getProvider = async (id) => db.select().table('PROVIDER_INFO').where({ID: id}).first();

    const getAllCategories = async() => db.select().table('CATEGORY');

    const getCategoryById = async (id) => db.select().table('CATEGORY').where({ID: id}).first();

    const getItemsByCategories = async (id) => db.select().table('MENU_ITEM').where({CATEGORY_ID: id});

    const getQueueState = async (id) => db.select('CURRENT_QUEUE_SIZE').table('PROVIDER_INFO').where({ID: id}).first();

    module.exports = {
        createRestaurant,
        createMenu,
        getProvider,
        getAllCategories,
        getCategoryById,
        getItemsByCategories,
        getQueueState
    }