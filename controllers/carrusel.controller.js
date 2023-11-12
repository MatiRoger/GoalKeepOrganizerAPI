const { createCarruselServices, getCarruselsServices, deletingCarruselServices } = require('../services/carrusel.service');

const createCarrusel = async (req, res) => {
    try {
        const newCarrusel = await createCarruselServices(req.body);
        res.status(201).json({ newCarrusel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el carrusel' });
    }
};

const getAllCarrusel = async (req, res) => {
    try {
        const { id, page, limit, name } = req.query;
        const carruselsInfo = await getCarruselsServices({ id, page, limit, name });
        res.status(200).json({ carruselsInfo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los carruseles' });
    }
};

const deleteCarrusel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCarrusel = await deletingCarruselServices(id);
        res.status(200).json({ deletedCarrusel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el carrusel' });
    }
};

module.exports = {
    createCarrusel,
    getAllCarrusel,
    deleteCarrusel,
};