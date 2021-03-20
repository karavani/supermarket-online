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


async function addNewOrder(newOrderDetails) {
    let sql = `UPDATE orders set 
                    totalPrice = ?, 
                    cityToDeliver = ?,
                    addressToDeliver = ?,
                    dateToDeliver = ?,
                    orderDate = ?,
                    CVV = ?
                WHERE orderID = ?;`;
    let parameters = [newOrderDetails.totalPrice, newOrderDetails.cityToDeliver, newOrderDetails.addressToDeliver,
    newOrderDetails.dateToDeliver, newOrderDetails.orderDate, newOrderDetails.CVV, newOrderDetails.orderID];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};



module.exports = {
    getOrdersNumber,
    addNewOrder
};