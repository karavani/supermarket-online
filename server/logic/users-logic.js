const usersDao = require('../dao/users-dao');
const ordersLogic = require('../logic/orders-logic');

let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
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
    if (!usersDao.isUserExistByEmail(user.email)) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    else {
        user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
        return await usersDao.addUser(user);
    }

}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let response = re.test(String(email).toLowerCase());
    return response;
}


async function login(user) {
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    let userData = await usersDao.login(user);
    const token = jwt.sign({ sub: saltLeft + userData.userName + saltRight }, config.secret)
    cache.put(token, userData);
    if (userData.userType == 'customer') {
        let cart = await usersDao.getCustomerLastCartOrPurchase(userData.id);
        let response = { token: "Bearer " + token, userType: userData.userType, name: userData.firstName, cart }
        return response;
    }
    let response = { token: "Bearer " + token, userType: userData.userType }
    return response;
}

async function getCustomerLastCartOrPurchase(cartID) {
    let response = await usersDao.getCustomerLastCartOrPurchase(cartID);
    if (response == null) {
        return response;
    }
    if (response.status == 0) {
        return response;
    }
    if (response.status == 1) {
        return response;
    }
}

async function getCustomerCity(id){
    let response = await usersDao.getCustomerCity(id);
    return response[0].city;
}
async function getCustomerStreetAdress(id){
    let response = await usersDao.getCustomerStreetAdress(id);
    return response[0].address;
}

module.exports = {
    addUser,
    getCustomerLastCartOrPurchase,
    login,
    getCustomerCity,
    getCustomerStreetAdress
};