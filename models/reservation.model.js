const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        required: true,
    },
    footballField:{
        type: Schema.Types.ObjectId,
        ref:'footballField',
        required: true
    }
})

module.exports= new model('Reservation', reservationSchema);