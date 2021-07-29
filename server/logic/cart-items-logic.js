const cartItemsDao = require('../dao/cart-items-dao');
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");

async function addNewItemToCart(newCartItem) {
    if (newCartItem.cartID == undefined) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e)
    }
    const response = await cartItemsDao.addNewItemToCart(newCartItem);
    return response;
}

async function getCartItems(cartID) {
    if (cartID == undefined) {
        throw new ServerError(ErrorType.GENERAL_ERROR, e)
    }
    const response = await cartItemsDao.getCartItems(cartID);
    return response;
}

async function updateItemQuantity(cartItem) {
    const response = await cartItemsDao.updateItemQuantity(cartItem);
    return response;
}

async function deleteItem(itemID) {
    const response = await cartItemsDao.deleteItem(itemID);
    return response;
}

module.exports = {
    addNewItemToCart,
    updateItemQuantity,
    deleteItem,
    getCartItems
};