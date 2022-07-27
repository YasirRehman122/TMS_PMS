const db = require('../../database/dbObject');

const getEmail = async (email) => db('USER').select('ID').where({EMAIL: email}).first();

const getCellNo = async (cellNo) => db('USER').select('ID').where({CELL_NUMBER: cellNo}).first();

const insertUser = async (dataObj) => db('USER').insert(dataObj).returning('*');

const getUserByEmail = async (email) => db.select('*').from('USER').where({EMAIL: email}).first();

const getUserById = async (id) => db.select('*').from('USER').where({ID: id}).first();

const updateById = async (id, obj) => db("USER").where({ID: id}).update(obj);


module.exports = {
    getEmail,
    getCellNo,
    insertUser,
    getUserByEmail,
    getUserById,
    updateById
}