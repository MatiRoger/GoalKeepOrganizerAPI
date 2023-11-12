const ProductCategory = require('../models/productCategory.model');

const createCategory = async (name) => {
    const category = await ProductCategory.create({name})

    if(!category) throw new Error('No se pudo crear una categoria de productos')
    return category;
}
const getAllCategoriesService = async () => {
    const searchResult = await ProductCategory.find();
    if(!searchResult) throw new Error('Aun no ha creado categorias de productos');
    return searchResult;
}

module.exports = {
    createCategory,
    getAllCategoriesService
}