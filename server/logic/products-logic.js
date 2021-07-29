const productsDao = require('../dao/products-dao');
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");


async function getAllProducts() {
    const response = await productsDao.getAllProducts();
    return response;
}
async function addNewProduct(userType, newProductDetails) {
    if(userType !== "admin"){
        throw new ServerError(ErrorType.USER_NOT_AUTHORIZED, sql, e);
    }
    const response = await productsDao.addNewProduct(newProductDetails);
    return response;
}
async function updateProduct(userType, product) {
    if(userType !== "admin"){
        throw new ServerError(ErrorType.USER_NOT_AUTHORIZED, sql, e);
    }
    const response = await productsDao.updateProduct(product);
    return response;
}

async function getAllCategories() {
    const response = await productsDao.getAllCategories();
    return response;
}

async function getProductByName(productName) {
    const response = await productsDao.getProductByName(productName);
    return response;
}
async function getProductsNumber() {
    const response = await productsDao.getProductsNumber();
    return response;
}

async function getAllProductsByCategory(id) {
    const response = await productsDao.getAllProductsByCategory(id);
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