const Products = require('../models/product.model');

const createProduct = async ({name, image, price, available}) => {
        const product = new Products({
            name,
            image,
            price,
            available
    });
    
    console.log(product)
    await product.save();

    if(!product) throw new Error('No se pudo crear producto')
    return product;
};

const getProducts = async () =>  {
    const getProduct = await Products.find();

    if(!getProduct) throw new Error('No se pudieron traer los producos')
    return getProduct
}

module.exports = {
    createProduct,
    getProducts
}