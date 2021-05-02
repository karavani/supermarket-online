const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function getOrdersNumber() {
    let sql = `SELECT COUNT(*) as ordersNumber from orders;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function updateOrder(order) {
    let sql = `UPDATE orders set 
                    totalPrice = ?, 
                    cityToDeliver = ?,
                    addressToDeliver = ?,
                    dateToDeliver = ?,
                    orderDate = ?,
                    CVV = ?
                WHERE orderID = ?;`;
    let parameters = [order.totalPrice, order.cityToDeliver, order.addressToDeliver,
    order.dateToDeliver, order.orderDate, order.CVV, order.orderID];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function addNewOrder(customerID, newOrderDetails) {
    let sql = `INSERT INTO orders (customerID,cartID, totalPrice, cityToDeliver, addressToDeliver, dateToDeliver, orderDate, payment4LastDigits) values (?,?,?,?,?,?,?,?);`;
    let dateToDeliver = newOrderDetails.dateToDeliver.split("T");
    let parameters = [customerID, newOrderDetails.cartID, newOrderDetails.totalPrice, newOrderDetails.cityToDeliver, newOrderDetails.addressToDeliver,
        dateToDeliver[0], new Date(), newOrderDetails.payment4LastDigits];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getOrderDateByCartID(cartID) {
    let sql = `SELECT 
                    orderDate AS lastPurchase
                FROM
                    supermarket.orders
                WHERE
                    cartID = ?;`;
    let parameters = [cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getOrdersBusyDays() {
    let sql = `SELECT
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

module.exports = {
    getOrdersNumber,
    updateOrder,
    getOrderDateByCartID,
    getOrdersBusyDays,
    addNewOrder
};