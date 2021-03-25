const ordersDao = require('../dao/orders-dao');


async function getOrdersNumber() {
    let response = await ordersDao.getOrdersNumber();
    return response;
}

async function addNewOrder(newOrderDetails) {
    let response = await ordersDao.addNewOrder(newOrderDetails);
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