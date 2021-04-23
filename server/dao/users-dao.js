const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function login(user) {
    let sql = `SELECT 
                    *
                FROM
                    supermarket.users
                WHERE
                    email = ?
                        AND password = ?;`

    let parameters = [user.email, user.password];
    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    // A functional (!) issue which means - the userName + password do not match
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return usersLoginResult[0];
}

async function addUser(user) {
    let sql = `INSERT INTO users (firstName, lastName, email, personalID, password, city, address, userType)
                    values(?,?,?,?,?,?,?,?);`;
    let parameters = [user.firstName, user.lastName, user.email, user.id, user.password,
    user.city, user.address, "customer"];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function isUserExistByEmail(email) {
    let sql = "SELECT email FROM users where email = ? ";
    console.log(email);
    let parameters = [email]
    try {
        let isUserNameExists = await connection.executeWithParameters(sql, parameters);
        if (isUserNameExists == null || isUserNameExists.length == 0) {
            return false;
        }
        return true;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getCustomerLastCartOrPurchase(customerID) {
    let sql = `SELECT 
                cartID, dateOfCreation, status
                    FROM
                        supermarket.cart
                    WHERE
                        customerID = ?
                    ORDER BY cartID DESC
                    LIMIT 1;`;

    let parameters = [customerID];
    let customerLastCartOrPurchase;
    try {
        customerLastCartOrPurchase = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e);
    }

    // Checking if a customer does not have a cart if not, that means he is a new customer
    if (customerLastCartOrPurchase == null || customerLastCartOrPurchase.length == 0) {
        return customerLastCartOrPurchase = null;
    }

    return customerLastCartOrPurchase[0];
}

async function getCustomerCity(id) {
    let sql = `SELECT 
                    city
                FROM
                    supermarket.users
                WHERE
                    id = ?;`;
    let parameters = [id];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getCustomerStreetAdress(id) {
    let sql = `SELECT 
                    address
                FROM
                    supermarket.users
                WHERE
                    id = ?;`;
    let parameters = [id];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}
module.exports = {
    addUser,
    isUserExistByEmail,
    getCustomerLastCartOrPurchase,
    login,
    getCustomerCity,
    getCustomerStreetAdress
};