const FootballField = require('../models/footballField.model');

const createFootballFieldService = async({ name, grassType, players })=>{
  const newFootballField = new FootballField({ name,grassType,players });
  
  await newFootballField.save();

  if(!newFootballField)throw new Error ('Hubo un error al crear una nueva cancha');

  return newFootballField;
}

const getFootballFieldService = async({ name, grassType, players })=>{
  let query = {};
  if(name)query.name=name;
  if(grassType) query.grassType = grassType;
  if(players) query.players = players;
  const searchResult = FootballField.find(query);

  if(!searchResult) throw new Error('Cancha/s no encontrada/s');

  return searchResult;
};

module.exports = {
  createFootballFieldService,
  getFootballFieldService,

}