const Products = require('../models/product.model');
const productCategoryModel = require('../models/productCategory.model');

const createProduct = async ({name, description, brand, Image, price, available, url, productCategory}) => {
        const product = new Products({
            name,
            description,
            brand,
            Image,
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

const getProducts = async ({id}) => {
    let query = {}

    if(id){
        query._id = id;
    }

    const getProduct = await Products.find(query);
    
    if(!getProduct) throw new Error('No se pudieron traer los producos')
    return getProduct
}

const getItems = async ({id, page, limit, name}) =>  {
    let query = {}

    if(id){
        query._id = id;
    }

    if (name) {
        query.name =  { $regex: '.*' + name + '.*', $options: 'i' };
    }

    const options = {
        page: page || 1,
        limit: limit || 6,
    };

    // const getProduct = await Products.find(query);
    const getItem = await Products.paginate(query, options);

    if(!getItem) throw new Error('No se pudieron traer los producos')
    return getItem
}

const editingProduct = async (id, updtateProduct ) => {

    
    let product = await Products.findByIdAndUpdate(id, updtateProduct, {new: true});
    
    if(!product) throw new Error('No se pudo realizar la peticion de actualizacion')
    return product;
}

const deletingProduct = async (id) => {
    const product = await Products.findByIdAndDelete(id);
    if(!product) throw new Error('No se logro eliminar el producto')
    return product
}

module.exports = {
    createProduct,
    getItems,
    editingProduct,
    deletingProduct,
    getProducts
}