const cartsLogic = require('../logic/carts-logic');
const express = require("express");

const cache = require("./cache-controller");
const server = express();

server.use(express.json());

server.post("/", async (request, response, next) => {

    const customerID = cache.extractUserDataFromCache(request).id
    try {
        const cartID = await cartsLogic.creatNewCart(customerID);
        response.json(cartID.insertId);
    }
    catch (error) {
        return next(error);
    }
});

server.get("/", async (request, response, next) => {

    const customerID = cache.extractUserDataFromCache(request).id;
    try {
        const cartStatus = await cartsLogic.getCartStatus(customerID);
        response.json(cartStatus);
    }
    catch (error) {
        return next(error);
    }
});


server.delete("/:id", async (request, response, next) => {

    const cartID = request.params.id;
    try {
        await cartsLogic.deleteAllCartItems(cartID);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


module.exports = server;