const Reservation = require('../models/reservation.model');

const isHourOverlap = (existingReservations, newReservation) => {


  for (let existingReservation of existingReservations) {
    const existingStartingHour = existingReservation.hour.start;
    const existingEndingHour = existingReservation.hour.end;
    const newStartingHour = newReservation.hour.start;
    const newEndingHour = newReservation.hour.end;

    if (
      (newStartingHour >= existingStartingHour && newStartingHour < existingEndingHour) ||
      (newEndingHour > existingStartingHour && newEndingHour <= existingEndingHour) ||
      (newStartingHour <= existingStartingHour && newEndingHour >= existingEndingHour)
    ) return true;
  }
  return false;
}



const createReservationService = async({ user, day, footballField, hour })=>{
    
  const existingReservations = await Reservation.find({ day: day, footballField: footballField });
  console.log(existingReservations);
  const newReservation = new Reservation({ user,day,footballField, hour });
  console.log(isHourOverlap(existingReservations, newReservation))
  if(isHourOverlap(existingReservations,newReservation))throw new Error('Horario ocupado');

  if(!newReservation)throw new Error('Error al crear Reservacion');

  await newReservation.save();
  return newReservation;
};

const getReservationsService = async ({ user, day, footballField}) => {
let query = {};
if(user) query.user = user;
if(day) query.day = day;
if (footballField) query.footballField=footballField;

const searchResult = await Reservation.find(query);

if(!searchResult) throw new Error('Reservacion/es no encontrada/s');

return searchResult;

}

const deleteReservationService = async ({ reservationId })=> {
  const reservation = await Reservation.find({ _id: reservationId});
  
  if(!reservation) throw new Error('La reservacion no existe.');
  
  await Reservation.findByIdAndDelete(reservationId);
}

module.exports = {
  createReservationService,
  getReservationsService,
  deleteReservationService
}