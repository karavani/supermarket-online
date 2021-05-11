const cartsDao = require('../dao/carts-dao');

async function creatNewCart(customerID) {
    let response = await cartsDao.creatNewCart(customerID);
    return response;
}
async function getCartStatus(customerID) {
    let response = await cartsDao.getCartStatus(customerID);
    return response;
}

async function getCartStatusForCartID(cartID) {
    let response = await cartsDao.getCartStatusForCartID(cartID);
    return response;
}

async function deleteAllCartItems(cartID) {
    let response = await cartsDao.deleteAllCartItems(cartID);
    return response;
}

module.exports = {
    creatNewCart,
    getCartStatusForCartID,
    deleteAllCartItems,
    getCartStatus
};