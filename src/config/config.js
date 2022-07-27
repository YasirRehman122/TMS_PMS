const env  = require('../env');

const config = {
    jwt: {
        key: process.env.JWT_SECRET,
        expiry: process.env.JWT_EXP,
        algo: process.env.JWT_ALGO
    }

}

module.exports = config;