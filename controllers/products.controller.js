const { createProduct, getItems, getProducts, editingProduct, deletingProduct } = require('../services/products.service');

const createProducts = async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(200).json({ newProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error })
        
    }
};

const getAllItems = async (req, res) => {
    try {
        const { id, page, limit, name, productCategory } = req.query
        const info = await getItems({ id, page, limit, name, productCategory })
        const results = await getProducts({ id });
        res.status(200).json({ info, results });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}


const editProducts = async (req, res) => {
    try {
        const { id } = req.params
        const editProduct = await editingProduct(id, req.body);
        res.status(200).json({ editProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}

const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduct = await deletingProduct(id);
        res.status(200).json({ deleteProduct }) 
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}

module.exports = {
    createProducts,
    editProducts,
    deleteProducts,
    getAllItems
}