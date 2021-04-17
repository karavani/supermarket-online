const cartItemsLogic = require('../logic/cart-items-logic');
const express = require("express");
const server = express();

server.use(express.json());

server.post("/", async (request, response, next) => {

    let newCartItem = request.body;
    try {
        let itemID = await cartItemsLogic.addNewItemToCart(newCartItem);
        response.json(itemID.insertId);
    }
    catch (error) {
        return next(error);
    }
});

server.get("/:id", async (request, response, next) => {

    let cartID = request.params.id;
    try {
        let cartItems = await cartItemsLogic.getCartItems(cartID);
        response.json(cartItems);
    }
    catch (error) {
        return next(error);
    }
});

server.put("/", async (request, response, next) => {

    let cartItem = request.body;
    try {
        await cartItemsLogic.updateItemQuantity(cartItem);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

server.delete("/:id", async (request, response, next) => {

    let itemID = request.params.id;
    try {
        await cartItemsLogic.deleteItem(itemID);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});
module.exports = server;