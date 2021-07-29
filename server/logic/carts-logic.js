const cartsDao = require('../dao/carts-dao');

async function creatNewCart(customerID) {
    const response = await cartsDao.creatNewCart(customerID);
    return response;
}
async function getCartStatus(customerID) {
    const response = await cartsDao.getCartStatus(customerID);
    const date = response[0].dateOfCreation
    response[0].dateOfCreation = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return response;
}

async function getCartStatusForCartID(cartID) {
    const response = await cartsDao.getCartStatusForCartID(cartID);
    const date = response[0].dateOfCreation
    console.log(response)
    response[0].dateOfCreation = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return response;
}

async function deleteAllCartItems(cartID) {
    const response = await cartsDao.deleteAllCartItems(cartID);
    return response;
}

module.exports = {
    creatNewCart,
    getCartStatusForCartID,
    deleteAllCartItems,
    getCartStatus
};