const express = require ('express');
const { createReservation, getReservations, cancelReservation } = require('../controllers/reservation.controller');


const route= express();

route.post('/',createReservation)
route.get('/',getReservations)
route.delete('/', cancelReservation)

module.exports = route;