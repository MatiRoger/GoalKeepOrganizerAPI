const Products = require('../models/product.model');

const createProduct = async () => {
    const product = await new Products({

    });

    if(!product) throw new Error('No se pudo crear producto')
    return product;
};

module.exports = {
    createProduct
}