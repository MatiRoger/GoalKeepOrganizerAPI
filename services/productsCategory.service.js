const ProductCategory = require('../models/productCategory.model');

const createCategory = async (name) => {
    const category = await ProductCategory.create({name})

    if(!category) throw new Error('No se pudo crear una categoria de productos')
    return category;
}

module.exports = {
    createCategory
}