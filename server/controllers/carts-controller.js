const cartsLogic = require('../logic/carts-logic');
const express = require("express");
const server = express();

server.use(express.json());

server.post("/", async (request, response, next) => {

    let customerID = request.body.id;
    try {
        await cartsLogic.creatNewCart(customerID);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = server;