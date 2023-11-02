const Products = require('../models/product.model');
const productCategoryModel = require('../models/productCategory.model');

const createProduct = async ({name, image, price, available, url, productCategory}) => {
        const product = new Products({
            name,
            image,
            price,
            available,
            url,
            productCategory
    });
    
    console.log(product)
    await product.save();

    const category = await productCategoryModel.findById(productCategory);

    if(category){
        category.products.push(product._id);
        await category.save();
    }

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