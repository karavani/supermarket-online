const productsLogic = require('../logic/products-logic');
const express = require("express");


const server = express();

server.use(express.json());


// GET http://localhost:3001/products
server.get("/", async (request, response, next) => {

    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    }
    catch (error) {
        return next(error);
    }
});

// GET http://localhost:3001/products/categories
server.get("/categories", async (request, response, next) => {

    try {
        let categories = await productsLogic.getAllCategories();
        response.json(categories);
    }
    catch (error) {
        return next(error);
    }
});


// GET http://localhost:3001/products/number
server.get("/number", async (request, response, next) => {

    try {
        let numberOfProducts = await productsLogic.getProductsNumber();
        response.json(numberOfProducts);
    }
    catch (error) {
        return next(error);
    }
});

// GET http://localhost:3001/products/:id
server.get("/:id", async (request, response, next) => {

    let id = request.params.id;
    try {
        let allProductsByCategory = await productsLogic.getAllProductsByCategory(id);
        response.json(allProductsByCategory);
    }
    catch (error) {
        return next(error);
    }
});




module.exports = server;