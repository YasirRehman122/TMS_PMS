const  jwt = require('jsonwebtoken');
const config  = require('../../config/config');
const bcrypt = require("bcryptjs");
const token = config.jwt;


module.exports = {

    generateToken: async (obj) => {
        
        return jwt.sign({obj}, token.key, {
            expiresIn: token.expiry, 
            algorithm: token.algo
        } );
    },

    generateHash: (data) =>  {
        return bcrypt.hash(data, 10);
    },

    verifyHash: async (text, hashValue) => {
        return await bcrypt.compare(text, hashValue)
    }
}