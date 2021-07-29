const usersLogic = require('../logic/users-logic');
const express = require("express");
const cache = require("./cache-controller");


const server = express();

server.use(express.json());


// POST http://localhost:3001/users/login
server.post("/login", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    const userLoginDetails = request.body;
    try {
        const successfullLoginData = await usersLogic.login(userLoginDetails);
        response.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }
});

// ADD USER
// POST http://localhost:3001/users/
server.post("/", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    const newUserDetails = request.body;
    try {
        const successfullLoginData = await usersLogic.addUser(newUserDetails);
        response.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }

});

server.get("/street", async (request, response, next) => {
    
    const customerID = cache.extractUserDataFromCache(request).id;
    try {
        const resulte = await usersLogic.getCustomerStreetAdress(customerID);
        response.json(resulte);
    }
    catch (error) {
        return next(error);
    }
});
server.get("/city", async (request, response, next) => {
    const customerID = cache.extractUserDataFromCache(request).id;
    try {
        const resulte = await usersLogic.getCustomerCity(customerID);
        response.json(resulte);
    }
    catch (error) {
        return next(error);
    }
});



module.exports = server;