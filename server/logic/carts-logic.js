const cartsDao = require('../dao/carts-dao');

async function creatNewCart(customerID) {
    let response = await cartsDao.creatNewCart(customerID);
    return response;
}
async function getCartStatus(customerID) {
    let response = await cartsDao.getCartStatus(customerID);
    let date = response[0].dateOfCreation
    response[0].dateOfCreation = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return response;
}

async function getCartStatusForCartID(cartID) {
    let response = await cartsDao.getCartStatusForCartID(cartID);
    let date = response[0].dateOfCreation
    console.log(response)
    response[0].dateOfCreation = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
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