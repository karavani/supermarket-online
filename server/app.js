const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const cartsController = require("./controllers/carts-controller");
const cartItemsController = require("./controllers/cart-items-controller");


const errorHandler = require("./errors/error-handler");
const loginFilter = require('./middleware/login-filter');
const server = express();

// Extract the JSON from the body and create request.body object containing it: 
server.use(express.json());
server.use(cors({ origin: ["http://localhost:4200"] }));

server.use(loginFilter());

server.use("/users", usersController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);
server.use("/cart-items", cartItemsController);





server.use(errorHandler);
server.listen(3001, () => console.log("Listening on http://localhost:3001"));


