const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function addNewItemToCart(cartItem) {
    let sql = `INSERT INTO cartitem (productID, quantity, totalPrice, cartID) VALUES (?,?,?,?);`;
    let parameters = [cartItem.productID, cartItem.quantity, cartItem.totalPrice, cartItem.cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartItems(cartID) {
    let sql = `SELECT 
                    p.productName,
                    p.price,
                    p.imageURL,
                    c.itemID,
                    c.productID,
                	quantity,
                    totalPrice,
                    cartID
                FROM
                    supermarket.cartitem c
                        JOIN
                    products p ON p.productID = c.productID
                    where cartID = ?;`;
    let parameters = [cartID];
    let cartItems;
    try {
        return cartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateItemQuantity(cartItem) {
    let sql = `UPDATE cartitem 
                    SET 
                        quantity = ?
                    WHERE
                        itemID = ?;`;
    let parameters = [cartItem.quantity, cartItem.itemID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function deleteItem(itemID) {
    let sql = `DELETE FROM cartitem 
               WHERE
                   itemID = ?;`;
    let parameters = [itemID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

module.exports = {
    addNewItemToCart,
    getCartItems,
    updateItemQuantity,
    deleteItem
};