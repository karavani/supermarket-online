const usersLogic = require('../logic/users-logic');
const express = require("express");


const server = express();

server.use(express.json());


// POST http://localhost:3001/users/login
server.post("/login", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    let userLoginDetails = request.body;
    try {
        let successfullLoginData = await usersLogic.login(userLoginDetails);
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
    let newUserDetails = request.body;
    console.log(newUserDetails);
    try {
        let successfullLoginData = await usersLogic.addUser(newUserDetails);
        response.json(successfullLoginData);
    }
    catch (error) {
        return next(error);
    }

});

server.get("/:id", async (request, response, next) => {

    let customerID = request.params.id;
    try {
        let resulte = await usersLogic.getCustomerLastCartOrPurchase(customerID);
        response.json(resulte);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = server;