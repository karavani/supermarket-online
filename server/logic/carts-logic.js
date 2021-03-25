const cartsDao = require('../dao/carts-dao');

async function creatNewCart(customerID) {
    let response = await cartsDao.creatNewCart(customerID);
    return response;
}

async function getCartStatus(cartID) {
    let response = await cartsDao.getCartStatus(cartID);
    return response;
}

async function deleteAllCartItems(cartID) {
    let response = await cartsDao.deleteAllCartItems(cartID);
    return response;
}

module.exports = {
    creatNewCart,
    getCartStatus,
    deleteAllCartItems
};