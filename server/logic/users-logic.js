const usersDao = require('../dao/users-dao');
const cartsLogic = require('../logic/carts-logic');

const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const cache = require("../controllers/cache-controller");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

async function addUser(user) {

    // Validations
    if (!isValidEmail(user.email)) {
        throw new ServerError(ErrorType.EMAIL_NOT_VALID);
    }
    if (await usersDao.isUserExistByEmail(user.email)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    else {
        user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
        return await usersDao.addUser(user);
    }

}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const response = re.test(String(email).toLowerCase());
    return response;
}


async function login(user) {
    
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    const userData = await usersDao.login(user);
    const token = jwt.sign({ sub: saltLeft + userData.userName + saltRight }, config.secret)
    cache.put(token, userData);
    if (userData.userType == 'customer') {
        const cart = await cartsLogic.getCartStatus(userData.id);
        const response = { token: "Bearer " + token, userType: userData.userType, name: userData.firstName, cart }
        return response;
    }
    const response = { token: "Bearer " + token, userType: userData.userType }
    return response;
}

async function getCustomerCity(id){
    const response = await usersDao.getCustomerCity(id);
    return response[0].city;
}

async function getCustomerStreetAdress(id){
    const response = await usersDao.getCustomerStreetAdress(id);
    return response[0].address;
}

module.exports = {
    addUser,
    login,
    getCustomerCity,
    getCustomerStreetAdress
};