const { createProduct } = require('../services/products.service');

const createProducts = async (req, res) => {
    try {
        const newProduct = await createProduct;
        res.status(200).json({ newProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error })
        
    }
};

module.exports = {
    createProducts
}