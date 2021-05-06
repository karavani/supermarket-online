const ordersDao = require('../dao/orders-dao');
const cartsDao = require('../dao/carts-dao');
const ServerError = require('../errors/server-error');
let ErrorType = require("./../errors/error-type");


async function getOrdersNumber() {
    let response = await ordersDao.getOrdersNumber();
    return response;
}

async function addNewOrder(customerID, newOrderDetails) {
    let dateToDeliver = newOrderDetails.dateToDeliver.split("T");
    let amount = await ordersDao.isOrderInBusyDays(dateToDeliver[0]);
    if(amount[0].amount >= 3){
        throw new ServerError(ErrorType.DELIVERY_DATE_IS_FULL);
    }
    let response = await ordersDao.addNewOrder(customerID, newOrderDetails);
    await cartsDao.updateCartStatus(newOrderDetails.cartID);
    return response;
}

async function getOrderDateByCartID(cartID) {
    let response = await ordersDao.getOrderDateByCartID(cartID);
    return response;
}

async function getOrdersBusyDays() {
    let response = await ordersDao.getOrdersBusyDays();
    return response;
}
module.exports = {
    getOrdersNumber,
    addNewOrder,
    getOrderDateByCartID,
    getOrdersBusyDays
};