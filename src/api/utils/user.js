const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const userModel = require('../models/user');
const {verifyHash} = require('../library/auth');
const {generateToken} = require('../library/auth');

class UserUtils extends CommonUtils{
    constructor() {super()}

    validateSignUpParams(data){

        let requiredParams = ['firstName', 'lastName', 'email', 'cellNumber', 'password', 'cnic', 'isProvider'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateLoginParams(data){

        let requiredParams = ['email','password'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    validateChangePassParams(data){

        let requiredParams = ['oldPassword','newPassword'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    async checkEmail(email){

        let userEmail = await userModel.getEmail(email);

        return userEmail ?? false;
    }

    async checkCellNo(cellNumber){

        let cellNo = await userModel.getCellNo(cellNumber);

        return cellNo ?? false;
    }

    async getUserByEmail(email){

        let user = await userModel.getUserByEmail(email);

        return user ?? null;
    }

    async getUserById(id) {

        let user = await userModel.getUserById(id);

        return user ?? null;
    }

    async validatePassword(password, hashedPassword){
        return await verifyHash(password, hashedPassword)
    }

    async createToken(user){

        let userObj = {id: user.id};

        return await generateToken(userObj);
    }

    async updateById(userId, obj) {

        await userModel.updateById(userId, obj);
    }

}

module.exports = UserUtils;