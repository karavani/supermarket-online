const ordersDao = require('../dao/orders-dao');


async function getOrdersNumber() {
    let response = await ordersDao.getOrdersNumber();
    return response;
}



module.exports = {
    getOrdersNumber
};