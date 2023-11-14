const { Schema, model } = require('mongoose');

const carruselSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    Image:{
        type: String,
        required:true,
    },
});

module.exports = model('carrusels', carruselSchema)