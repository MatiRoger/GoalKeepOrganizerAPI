const { createCardServices, getcardsServices, deletingcardServices} = require('../services/card.service');

const createcards = async (req, res) => {
    try {
        const newcard = await createCardServices(req.body);
        res.status(201).json({ newcard });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });  
    }
};

const getAllCards = async (req, res) => {
    try {
        const { id, page, limit, name } = req.query
        const info = await getcardsServices({ id, page, limit, name })
        const results = await getcardsServices({ id });
        res.status(200).json({ info, results });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}

const deletecards = async (req, res) => {
    try {
        const { id } = req.params;
        const deletecard = await deletingcardServices(id);
        res.status(200).json({ deletecard });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
}

module.exports = {
    createcards,
    getAllCards,
    deletecards,
}