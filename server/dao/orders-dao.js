const connection = require("./connection-wrapper");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");


async function getOrdersNumber() {
    const sql = `SELECT COUNT(*) as ordersNumber from orders;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}



async function addNewOrder(customerID, newOrderDetails) {
    const sql = `INSERT INTO orders (customerID,cartID, totalPrice, cityToDeliver, addressToDeliver, dateToDeliver, orderDate, payment4LastDigits) values (?,?,?,?,?,?,?,?);`;
    const dateToDeliver = newOrderDetails.dateToDeliver.split("T");
    const parameters = [customerID, newOrderDetails.cartID, newOrderDetails.totalPrice, newOrderDetails.cityToDeliver, newOrderDetails.addressToDeliver,
        dateToDeliver[0], new Date(), newOrderDetails.payment4LastDigits];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getOrderDateByCartID(cartID) {
    const sql = `SELECT 
                    orderDate AS lastPurchase
                FROM
                    supermarket.orders
                WHERE
                    cartID = ?;`;
    const parameters = [cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getOrdersBusyDays() {
    const sql = `SELECT
                    dateToDeliver
                FROM
                    orders
                GROUP BY
                    dateToDeliver
                HAVING 
                    COUNT(*) = 3;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}
async function isOrderInBusyDays(dateToDeliver) {
    const sql = `SELECT 
                    COUNT(*) AS amount
                FROM
                    orders
                WHERE
                    dateToDeliver = ?;`;
    const parameters = [dateToDeliver]
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

module.exports = {
    getOrdersNumber,
    getOrderDateByCartID,
    getOrdersBusyDays,
    isOrderInBusyDays,
    addNewOrder
};