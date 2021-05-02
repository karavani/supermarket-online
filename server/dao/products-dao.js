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
    let sql = `SELECT 
                    productID,
                    productName,
                    p.categoryID,
                    c.categoryName,
                    price,
                    imageURL
                FROM
                    supermarket.products p
                JOIN
                    categories c ON c.categoryID = p.categoryID;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function addNewProduct(newProductDetails) {
    let sql = `INSERT INTO products (productName,categoryID, price, imageURL) values (?,?,?,?);`;
    let parameters = [newProductDetails.productName, newProductDetails.categoryID, newProductDetails.price,
    newProductDetails.imageURL];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateProduct(product) {
    let sql = `UPDATE products set
                    productName = ?, 
                    categoryID = ?,
                    price = ?,
                    imageURL = ?
                WHERE productID = ?;`;
    let parameters = [product.productName, product.categoryID, product.price,
    product.imageURL, product.productID];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};


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

async function getProductByName(productName) {
    let sql = `SELECT * FROM supermarket.products where LOWER(productName) LIKE ?;`;
    let parameters = ["%" + productName + "%"];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}



module.exports = {
    getAllProducts,
    getAllProductsByCategory,
    getAllCategories,
    getProductsNumber,
    getProductByName,
    addNewProduct,
    updateProduct
};