const connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getAllProductsByCategory(id) {
    let sql = `SELECT * FROM products where categoryID = ?;`;
    let parameters = [id];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function getAllProducts() {
    let sql = `SELECT * from products;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getAllCategories() {
    let sql = `SELECT * from categories;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getProductsNumber() {
    let sql = `SELECT COUNT(*) as productsNumber from products;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}



module.exports = {
    getAllProducts,
    getAllProductsByCategory,
    getAllCategories,
    getProductsNumber
};