const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const UserUtils = require("../utils/user");
const {generateHash}  = require("../library/auth");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");

class UserService extends BaseService{
    constructor() {
        super()

        this.userUtils = new UserUtils();
    }

    async checkEmailAndCell(data) {
        try{

            // checking email if it exist in database or not
            console.log(">>>>>>>>>> Checking email");
            let emailExists = await this.userUtils.checkEmail(data.email);
            if(emailExists){
                console.log("Provided email already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
            }

            // checking cell number if it exist in database or not
            console.log(">>>>>>>>>> Checking cell number");
            let cellNoExists = await this.userUtils.checkCellNo(data.cellNumber);
            if(cellNoExists){
                console.log("Provided cell number already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_CELLNO_EXISTS);
            }

            // calls otp service to get OTP

            let otp = 45879;

            return otp;
        }
        catch(err){
            throw err;
        }
        
        
    }


    async signUp(data) {
        try{

            let [paramsValidated, err] = this.userUtils.validateSignUpParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            // checking email if it exist in database or not
            console.log(">>>>>>>>>> Checking email");
            let emailExists = await this.userUtils.checkEmail(data.email);
            if(emailExists){
                console.log("Provided email already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
            }

            // checking cell number if it exist in database or not
            console.log(">>>>>>>>>> Checking cell number");
            let cellNoExists = await this.userUtils.checkCellNo(data.cellNumber);
            if(cellNoExists){
                console.log("Provided cell number already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_CELLNO_EXISTS);
            }

            // Converting plain text password into hash
            let hashedPassword = await generateHash(data.password);

            // Preparing data object to save in database
            let userObject = {
                FIRST_NAME: data.firstName,
                LAST_NAME: data.lastName,
                EMAIL: data.email,
                CELL_NUMBER: data.cellNumber,
                PASSWORD: hashedPassword,
                CNIC: data.cnic,
                IS_PROVIDER: data.isProvider,
                ACTIVE_IND: true
            }

            console.log(">>>>>>>>>>>> Inserting user in Database", userObject)

            let newUser = await userModel.insertUser(userObject);

            console.log(">>>>>>>>>>>>> NEW USER: ", newUser);

            return newUser[0];

        }
        catch(err){
            throw err;
        }

    }


    async login(data) {

        try{

            let [paramsValidated, err] = this.userUtils.validateLoginParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            let user = await this.userUtils.getUserByEmail(data.email);
            if (!user){
                console.log("No user found against email: ", data.email);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_USER_FOUND);
            }

            console.log(">>>>> User Found: ", JSON.stringify(user));

            let passwordVerified = await this.userUtils.validatePassword(data.password, user.PASSWORD);
            if (!passwordVerified){
                console.log("Invalid Password");
                throw new Exception(STATUS_CODES.SUCCESS, RESPONSE_MESSAGES.INVALID_PASSWORD);
            }

            return await this.userUtils.createToken(user);

        }
        catch (err){
            throw err;
        }
    }


    async changePassword(data) {
        try{
            
            let [paramsValidated, err] = this.userUtils.validateLoginParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            let user = await this.userUtils.getUserById(data.email);
            if (!user){
                console.log("Invalid user");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.NO_USER_FOUND);
            }

            let oldPasswordVerified = await this.userUtils.validatePassword(data.oldPasswrd, user.PASSWORD);
            if (!oldPasswordVerified){
                console.log("Password not matched");
                throw new Exception(STATUS_CODES.SUCCESS, RESPONSE_MESSAGES.PASSWORD_NOT_MATCHED);
            }

            // Calculating hash value of new password
            let hashedPassword = await generateHash(data.newPassword);

            // Updating new password in database
            await this.userUtils.updateById(user_id, {PASSWPRD: hashedPassword});

            return true;

        }
        catch(err){
            throw errr;
        }
    }
}

module.exports = UserService;