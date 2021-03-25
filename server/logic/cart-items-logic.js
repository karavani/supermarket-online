const cartItemsDao = require('../dao/cart-items-dao');

async function addNewItemToCart(newCartItem) {
    let response = await cartItemsDao.addNewItemToCart(newCartItem);
    return response;
}

async function getCartItems(cartID) {
    let response = await cartItemsDao.getCartItems(cartID);
    return response;
}

async function updateItemQuantity(cartItem) {
    let response = await cartItemsDao.updateItemQuantity(cartItem);
    return response;
}

async function deleteItem(itemID) {
    let response = await cartItemsDao.deleteItem(itemID);
    return response;
}

module.exports = {
    addNewItemToCart,
    updateItemQuantity,
    deleteItem,
    getCartItems
};