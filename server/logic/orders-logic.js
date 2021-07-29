const ordersDao = require('../dao/orders-dao');
const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require("./../errors/error-type");


async function getOrdersNumber() {
    const response = await ordersDao.getOrdersNumber();
    return response;
}

async function addNewOrder(customerID, newOrderDetails) {
    const dateToDeliver = newOrderDetails.dateToDeliver.split("T");
    const amount = await ordersDao.isOrderInBusyDays(dateToDeliver[0]);
    if(amount[0].amount >= 3){
        throw new ServerError(ErrorType.DELIVERY_DATE_IS_FULL);
    }
    const response = await ordersDao.addNewOrder(customerID, newOrderDetails);
    await cartsDao.updateCartStatus(newOrderDetails.cartID);
    return response;
}

async function getOrderDateByCartID(cartID) {
    const response = await ordersDao.getOrderDateByCartID(cartID);
    return response;
}

async function getOrdersBusyDays() {
    const response = await ordersDao.getOrdersBusyDays();
    return response;
}
module.exports = {
    getOrdersNumber,
    addNewOrder,
    getOrderDateByCartID,
    getOrdersBusyDays
};