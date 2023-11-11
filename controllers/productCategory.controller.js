const { createCategory } = require('../services/productsCategory.service')

const createProductCategory = async (req, res) => {
    try {
        const { name } = req.body
        const newCategory = await createCategory(name);
        res.status(200).json({ newCategory});
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

module.exports = {
    createProductCategory,
}