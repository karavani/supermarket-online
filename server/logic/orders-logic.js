const ordersDao = require('../dao/orders-dao');
const cartsDao = require('../dao/carts-dao');



async function getOrdersNumber() {
    let response = await ordersDao.getOrdersNumber();
    return response;
}

async function addNewOrder(customerID, newOrderDetails) {
    let response = await ordersDao.addNewOrder(customerID, newOrderDetails);
    await cartsDao.updateCartStatus(newOrderDetails.cartID);
    return response;
}

async function updateOrder(order) {
    let response = await ordersDao.updateOrder(order);
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
    getOrdersBusyDays,
    updateOrder
};