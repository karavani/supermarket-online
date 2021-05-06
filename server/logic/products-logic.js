const productsDao = require('../dao/products-dao');
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");


async function getAllProducts() {
    let response = await productsDao.getAllProducts();
    return response;
}
async function addNewProduct(userType, newProductDetails) {
    if(userType !== "admin"){
        throw new ServerError(ErrorType.USER_NOT_AUTHORIZED, sql, e);
    }
    let response = await productsDao.addNewProduct(newProductDetails);
    return response;
}
async function updateProduct(userType, product) {
    if(userType !== "admin"){
        throw new ServerError(ErrorType.USER_NOT_AUTHORIZED, sql, e);
    }
    let response = await productsDao.updateProduct(product);
    return response;
}

async function getAllCategories() {
    let response = await productsDao.getAllCategories();
    return response;
}

async function getProductByName(productName) {
    let response = await productsDao.getProductByName(productName);
    return response;
}
async function getProductsNumber() {
    let response = await productsDao.getProductsNumber();
    return response;
}

async function getAllProductsByCategory(id) {
    let response = await productsDao.getAllProductsByCategory(id);
    return response;
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