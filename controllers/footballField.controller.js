const { createFootballFieldService, getFootballFieldService } = require('../services/footballField.services')


const createFootballField = async(req,res)=>{
  try {
    const newFootballField = await  createFootballFieldService(req.body);
    res.status(201).json({newFootballField});
  } catch (error) {
    res.status(500).json({error});
  }
};

const getFootballFields = async (req,res)=>{
  try {
    const footballFields = await getFootballFieldService(req.body);
  } catch (error) {
    res.status(500).json({ error })
  }
}

module.exports = {
  createFootballField,
  getFootballFields
}
