const connection = require("./connection-wrapper");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");

async function getAllProductsByCategory(id) {
    const sql = `SELECT * FROM products where categoryID = ?;`;
    const parameters = [id];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}


async function getAllProducts() {
    const sql = `SELECT 
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
    const sql = `INSERT INTO products (productName,categoryID, price, imageURL) values (?,?,?,?);`;
    const parameters = [newProductDetails.productName, newProductDetails.categoryID, newProductDetails.price,
    newProductDetails.imageURL];
    try {
        await connection.executeWithParameters(sql, parameters);
        const productId = await connection.execute("SELECT LAST_INSERT_ID() as id;");
        return productId[0].id;
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};

async function updateProduct(product) {
    const sql = `UPDATE products set
                    productName = ?, 
                    categoryID = ?,
                    price = ?,
                    imageURL = ?
                WHERE productID = ?;`;
    const parameters = [product.productName, product.categoryID, product.price,
    product.imageURL, product.productID];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
};


async function getAllCategories() {
    const sql = `SELECT * from categories;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getProductsNumber() {
    const sql = `SELECT COUNT(*) as productsNumber from products;`;
    try {
        return await connection.execute(sql);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
}

async function getProductByName(productName) {
    const sql = `SELECT * FROM supermarket.products where LOWER(productName) LIKE ?;`;
    const parameters = ["%" + productName + "%"];

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