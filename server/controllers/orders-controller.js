const ordersLogic = require('../logic/orders-logic');
const express = require("express");


const server = express();

server.use(express.json());


// GET http://localhost:3001/products/number
server.get("/number", async (request, response, next) => {

    try {
        let numberOfOrders = await ordersLogic.getOrdersNumber();
        response.json(numberOfOrders);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = server;