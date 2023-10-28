const express = require ('express');

const route= express();

route.post('/',createReservation)
route.get('/',getAllReservations)
route.get('/:userId',getReservationByUserId)