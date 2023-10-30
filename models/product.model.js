const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    Image:{
        
    },
    productCategory:{
        type: Schema.Types.ObjectId,
        ref: 'productCategory',
        required: true
    }
});

module.exports = model('Products', productSchema)