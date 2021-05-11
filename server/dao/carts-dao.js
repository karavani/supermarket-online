const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function creatNewCart(customerID) {
    let sql = `INSERT INTO supermarket.cart (dateOfCreation, customerID) VALUES (?, ?);`;
    let parameters = [new Date(), customerID];
    let cartID;
    try {
        return cartID = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartStatus(customerID) {
    let sql = `SELECT 
                    dateOfCreation, status
                FROM
                    supermarket.cart
                WHERE
                    customerID = ?
                ORDER BY dateOfCreation DESC
                LIMIT 1;`;
    let parameters = [customerID];
    let cartStatus;
    try {
        return cartStatus = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartStatusForCartID(cartID) {
    let sql = `SELECT status, dateOfCreation FROM supermarket.cart where cartID = ?;`;
    let parameters = [cartID];
    let cartStatus;
    try {
        return cartStatus = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function deleteAllCartItems(cartID) {
    let sql = `DELETE FROM supermarket.cartitem 
               WHERE
                   cartID = ?;`;
    let parameters = [cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateCartStatus(cartID) {
    let sql = `UPDATE supermarket.cart
                SET status = 1
               WHERE
                   cartID = ?;`;
    let parameters = [cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};



module.exports = {
    creatNewCart,
    getCartStatusForCartID,
    deleteAllCartItems,
    getCartStatus,
    updateCartStatus
};