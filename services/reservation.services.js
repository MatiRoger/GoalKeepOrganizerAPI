const Reservation = require('../models/reservation.model');

const createReservationService = async({ user, date, footballField })=>{
    
  const existingReservation = await Reservation.find({ date: date, footballField: footballField });
  if(existingReservation) throw new Error('Esta cancha ya esta reservada en esa fecha y horario.');
  const newReservation = new Reservation({ user,date,footballField });

  if(!newReservation)throw new Error('Error al crear Reservacion');

  await newReservation.save();
  return newReservation;
};

const getReservationsService = async ({ user, date, footballField}) => {
let query = {};
if(user) query.user = user;
if(date) query.date = date;
if (footballField) query.footballField=footballField;

const searchResult = await Reservation.find(query);

if(!searchResult) throw new Error('Reservacion/es no encontrada/s');

return searchResult;

}

const deleteReservationService = async ({ reservationId })=> {
  const reservation = await Reservation.find({ _id: reservationId});
  if(!reservation) throw new Error('La reservacion no existe.');
  if(reservation.date < (Date.now()-7200000)) throw new Error ('La cancelacion debe ser realizada con al menos 2hs de antelacion');
  
  await Reservation.findByIdAndDelete(reservationId);

}

module.exports = {
  createReservationService,
  getReservationsService,
  deleteReservationService
}