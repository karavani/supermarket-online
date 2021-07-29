const connection = require("./connection-wrapper");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");


async function creatNewCart(customerID) {
    const sql = `INSERT INTO supermarket.cart (dateOfCreation, customerID) VALUES (?, ?);`;
    const parameters = [new Date(), customerID];
    let cartID;
    try {
        return cartID = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartStatus(customerID) {
    const sql = `SELECT 
                   cartID, dateOfCreation, status
                FROM
                    supermarket.cart
                WHERE
                    customerID = ?
                ORDER BY dateOfCreation DESC
                LIMIT 1;`;
    const parameters = [customerID];
    let cartStatus;
    try {
        return cartStatus = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartStatusForCartID(cartID) {
    const sql = `SELECT status, dateOfCreation FROM supermarket.cart where cartID = ?;`;
    const parameters = [cartID];
    let cartStatus;
    try {
        return cartStatus = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function deleteAllCartItems(cartID) {
    const sql = `DELETE FROM supermarket.cartitem 
               WHERE
                   cartID = ?;`;
    const parameters = [cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateCartStatus(cartID) {
    const sql = `UPDATE supermarket.cart
                SET status = 1
               WHERE
                   cartID = ?;`;
    const parameters = [cartID];
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