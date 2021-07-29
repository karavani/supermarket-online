const connection = require("./connection-wrapper");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");


async function addNewItemToCart(cartItem) {
    const sql = `INSERT INTO cartitem (productID, quantity, totalPrice, cartID) VALUES (?,?,?,?);`;
    const parameters = [cartItem.productID, cartItem.quantity, cartItem.totalPrice, cartItem.cartID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function getCartItems(cartID) {
    const sql = `SELECT 
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
    const parameters = [cartID];
    let cartItems;
    try {
        return cartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateItemQuantity(cartItem) {
    const sql = `UPDATE cartitem 
                    SET 
                        quantity = ?
                    WHERE
                        itemID = ?;`;
    const parameters = [cartItem.quantity, cartItem.itemID];
    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function deleteItem(itemID) {
    const sql = `DELETE FROM cartitem 
               WHERE
                   itemID = ?;`;
    const parameters = [itemID];
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