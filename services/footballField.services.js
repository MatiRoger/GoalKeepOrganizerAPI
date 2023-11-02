const FootballField = require('../models/footballField.model');

const createFootballFieldService = async({ name, grassType, players, imgUrl })=>{
  const newFootballField = new FootballField({ name, grassType, players, imgUrl });
  
  if(!newFootballField)throw new Error ('Hubo un error al crear una nueva cancha');
  
  await newFootballField.save();

  return newFootballField;
}

const getFootballFieldService = async({ footballFieldId, name, grassType, players })=>{
  let query = {};
  if(footballFieldId) query._id = footballFieldId;
  if(name)query.name=name;
  if(grassType) query.grassType = grassType;
  if(players) query.players = players;
  const searchResult = await FootballField.find(query);

  if(!searchResult) throw new Error('Cancha/s no encontrada/s');

  return searchResult;
};

const deleteFootballFieldService = async({footballFieldId})=>{
  const footballField = await FootballField.findById(footballFieldId);
  
  if(!footballField) throw new Error('La cancha que desea eliminar no existe');

  await FootballField.findByIdAndDelete(footballFieldId);
};

const updateFootballFieldService = async ({footballFieldId, newName, newGrassType, newPlayers, newImgUrl})=>{
  let query = {};
  if(newName) query.name = newName;
  if(newGrassType) query.grassType = newGrassType;
  if(newPlayers) query.players = newPlayers;
  if(newImgUrl) query.imgUrl = newImgUrl;

  const footballField = FootballField.findById(footballFieldId);
  if(!footballField) throw new Error ('La cancha que desea actualizar no existe');

  return await FootballField.findByIdAndUpdate(footballFieldId, query);

}


module.exports = {
  createFootballFieldService,
  getFootballFieldService,
  deleteFootballFieldService,
  updateFootballFieldService
}