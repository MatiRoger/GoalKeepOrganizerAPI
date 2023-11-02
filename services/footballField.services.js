const FootballField = require('../models/footballField.model');

const createFootballFieldService = async({ name, grassType, players, imgUrl })=>{
  const newFootballField = new FootballField({ name, grassType, players, imgUrl });
  
  if(!newFootballField)throw new Error ('Hubo un error al crear una nueva cancha');
  
  await newFootballField.save();

  return newFootballField;
}

const getFootballFieldService = async({ name, grassType, players })=>{
  let query = {};
  if(name)query.name=name;
  if(grassType) query.grassType = grassType;
  if(players) query.players = players;
  const searchResult = await FootballField.find(query);

  if(!searchResult) throw new Error('Cancha/s no encontrada/s');

  return searchResult;
};

const deleteFootballFieldService = async({footballFieldId})=>{
  const footballField = await FootballField.findById(footballFieldId);
  
  if(!footballField) throw new Error('No se encontro la cancha que desea eliminar');

  await FootballField.findByIdAndDelete(footballFieldId);
}

module.exports = {
  createFootballFieldService,
  getFootballFieldService,
  deleteFootballFieldService
}