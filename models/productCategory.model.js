const { Schema, model } = require('mongoose');

const productCategorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref:"Products",
    }]
})

module.exports = model('ProductCategory', productCategorySchema)