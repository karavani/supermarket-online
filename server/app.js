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

server.use(express.json());
server.use(express.static('public'));

server.use(cors());

server.use(loginFilter());
server.use("/users", usersController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);
server.use("/cart-items", cartItemsController);


server.use(errorHandler);
server.listen(4200, () => console.log("Listening on http://localhost:4200"));


