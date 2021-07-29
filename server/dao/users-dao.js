const connection = require("./connection-wrapper");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");

async function login(user) {
    const sql = `SELECT 
                    *
                FROM
                    supermarket.users
                WHERE
                    email = ?
                        AND password = ?;`

    const parameters = [user.email, user.password];
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
    const sql = `INSERT INTO users (firstName, lastName, email, personalID, password, city, address, userType)
                    values(?,?,?,?,?,?,?,?);`;
    const parameters = [user.firstName, user.lastName, user.email, user.id, user.password,
    user.city, user.address, "customer"];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function isUserExistByEmail(email) {
    const sql = "SELECT email FROM users where email = ? ";
    const parameters = [email]
    try {
        const isUserNameExists = await connection.executeWithParameters(sql, parameters);
        if (isUserNameExists == null || isUserNameExists.length == 0) {
            return false;
        }
        return true;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}



async function getCustomerCity(id) {
    const sql = `SELECT 
                    city
                FROM
                    supermarket.users
                WHERE
                    id = ?;`;
    const parameters = [id];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getCustomerStreetAdress(id) {
    const sql = `SELECT 
                    address
                FROM
                    supermarket.users
                WHERE
                    id = ?;`;
    const parameters = [id];
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
    login,
    getCustomerCity,
    getCustomerStreetAdress
};