const ordersLogic = require('../logic/orders-logic');
const express = require("express");
const server = express();
const cache = require("./cache-controller");


server.use(express.json());


server.post("/", async (request, response, next) => {

    let customerID = cache.extractUserDataFromCache(request).id;

    let newOrderDetails = request.body;
    console.log(newOrderDetails);
    try {
        await ordersLogic.addNewOrder(customerID, newOrderDetails);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

server.put("/", async (request, response, next) => {

    let order = request.body;
    try {
        await ordersLogic.updateOrder(order);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

// GET http://localhost:3001/orders/number
server.get("/number", async (request, response, next) => {

    try {
        let numberOfOrders = await ordersLogic.getOrdersNumber();
        response.json(numberOfOrders);
    }
    catch (error) {
        return next(error);
    }
});

// GET http://localhost:3001/orders/
server.get("/", async (request, response, next) => {
    //  Three Orders limited Per Day = busy Day
    try {
        let busyDays = await ordersLogic.getOrdersBusyDays();
        response.json(busyDays);
    }
    catch (error) {
        return next(error);
    }
});
module.exports = server;