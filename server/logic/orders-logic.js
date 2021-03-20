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
module.exports = {
    getOrdersNumber,
    addNewOrder,
    updateOrder
};