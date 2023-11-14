const { get } = require('../routes/footballField.routes');
const { createCategory, getAllCategoriesService } = require('../services/productsCategory.service')

const createProductCategory = async (req, res) => {
  try {
    const { name } = req.body
    const newCategory = await createCategory(name);
    res.status(200).json({ newCategory });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const products = await getAllCategoriesService();
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createProductCategory,
  getAllCategories
}