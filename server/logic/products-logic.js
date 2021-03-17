const productsDao = require('../dao/products-dao');



async function getAllProducts() {
    let response = await productsDao.getAllProducts();
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
    getProductsNumber
};