const expressJwt = require('express-jwt');
const config = require("../config.json");

const { secret } = config;


function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/users/login', // Login
            '/users', // Register
            '/products/',
            '/products/number',
            '/orders/number'
        ]
    })
}

module.exports = authenticateJwtRequestToken;
