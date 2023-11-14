const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  footballField: {
    type: Schema.Types.ObjectId,
    ref: 'footballField',
    required: true
  },
  day: {
    type: Date,
    required: true,
  },
  hour:{
    start:{ type: Number, required: true },
    end:{ type: Number, required: true}
  }
})

module.exports = model('Reservation', reservationSchema);