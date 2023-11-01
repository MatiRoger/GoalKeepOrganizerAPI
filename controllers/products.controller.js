const { createProduct, getProducts } = require('../services/products.service');

const createProducts = async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(200).json({ newProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error })
        
    }
};

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await getProducts();
        res.status(200).json({ allProducts });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}

module.exports = {
    createProducts,
    getAllProducts
}