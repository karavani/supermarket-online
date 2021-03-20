const cartsDao = require('../dao/carts-dao');

async function creatNewCart(customerID) {
    let response = await cartsDao.creatNewCart(customerID);
    return response;
}

module.exports = {
    creatNewCart
};