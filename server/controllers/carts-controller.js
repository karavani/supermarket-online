const cartsLogic = require('../logic/carts-logic');
const express = require("express");
const server = express();

server.use(express.json());

server.post("/", async (request, response, next) => {

    let customerID = request.body.id;
    try {
        let cartID = await cartsLogic.creatNewCart(customerID);
        response.json(cartID.insertId);
    }
    catch (error) {
        return next(error);
    }
});

server.get("/:id", async (request, response, next) => {

    let cartID = request.params.id;
    try {
        let cartStatus = await cartsLogic.getCartStatus(cartID);
        response.json(cartStatus);
    }
    catch (error) {
        return next(error);
    }
});

server.delete("/:id", async (request, response, next) => {

    let cartID = request.params.id;
    try {
        await cartsLogic.deleteAllCartItems(cartID);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});


module.exports = server;