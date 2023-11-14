const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    Image:{
        type: String,
        required:true,
    },
});

module.exports = model('cards', cardSchema)