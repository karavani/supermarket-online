const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function creatNewCart(customerID) {
    let sql = `INSERT INTO supermarket.cart (dateOfCreation, customerID) VALUES (?, ?);`;
    let parameters = [new Date(), customerID];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};


module.exports = {
    creatNewCart
};