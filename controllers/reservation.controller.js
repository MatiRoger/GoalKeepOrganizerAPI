const { createReservationService, getReservationsService, deleteReservationService } = require('../services/reservation.services')

const createReservation = async (req, res) => {
  try {
    const newReservation = await createReservationService(req.body);
    res.status(201).json({ newReservation });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getReservations = async (req,res)=>{
  try {
    const reservations = await getReservationsService(req.query);
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ error })
  }
}

const cancelReservation = async (req,res)=>{
  try {
    await deleteReservationService(req.query);
    res.status(200).json({ message: "Reservacion cancelada"});
  } catch (error) {
    res.status(500).json({ message: error })
  }
}


module.exports = {
  createReservation,
  getReservations,
  cancelReservation
}