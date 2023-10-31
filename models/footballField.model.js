const { Schema, model } = require('mongoose');

const footballFieldSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  grassType:{
    type : String,
    required: true
  },
  players: {
    type: String,
    required: true
  }
});

module.exports = new model('FootballField',footballFieldSchema);