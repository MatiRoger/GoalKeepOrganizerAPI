const express = require('express');
const router = express.Router(); 
const { createCarrusel, deleteCarrusel, getAllCarrusel } = require('../controllers/carrusel.controller');

router.post('/', createCarrusel);
router.get('/', getAllCarrusel);
router.delete('/:id', deleteCarrusel);

module.exports = router;