const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    brand:{
        type:String,
        required: true
    },
    Image:{
        type: String,
        required:false,
        default: 'https://www.rivera.gub.uy/portal/wp-content/uploads/2017/02/imagen-no-disponible-820x513.jpg'
    },
    price:{
        type: Number,
        required: true
    },
    available:{
        type: Boolean,
        required: true,
    },
    productCategory:{
        type: Schema.Types.ObjectId,
        ref: 'productCategory',
        required: true
    }
});

productSchema.plugin(mongoosePaginate);

module.exports = model('Products', productSchema)