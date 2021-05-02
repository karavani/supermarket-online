const productsDao = require('../dao/products-dao');



async function getAllProducts() {
    let response = await productsDao.getAllProducts();
    return response;
}
async function addNewProduct(newProductDetails) {
    let response = await productsDao.addNewProduct(newProductDetails);
    return response;
}
async function updateProduct(product) {
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