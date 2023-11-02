const { createFootballFieldService, getFootballFieldService, deleteFootballFieldService, updateFootballFieldService } = require('../services/footballField.services')


const createFootballField = async(req,res)=>{
  try {
    const newFootballField = await  createFootballFieldService(req.body);
    res.status(201).json({newFootballField});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFootballFields = async (req,res)=>{
  try {
    const footballFields = await getFootballFieldService(req.body);
    res.status(200).json({ footballFields });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteFootballField =  async (req,res)=>{
  try {
    await deleteFootballFieldService(req.body);
    res.status(200).json({ message: 'Cancha borrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFootballField = async (req,res)=>{
  try {
    await updateFootballFieldService(req.body);
    res.status(200).json({ message: "Cancha actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFootballField,
  getFootballFields,
  deleteFootballField,
  updateFootballField
}
