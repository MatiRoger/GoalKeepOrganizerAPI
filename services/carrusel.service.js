const carrusels = require('../models/carrusel.model');

const createCarruselServices = async ({name, description, Image, }) => {
        const Carrusel = new carrusels({
            name,
            description,
            Image,
    });
    
    console.log(Carrusel)
    await Carrusel.save();

    if(!Carrusel) throw new Error('No se pudo crear Carrusel')
    return Carrusel;
};

const getCarruselsServices = async ({id}) => {
    let query = {}

    if(id){
        query._id = id;
    }

    const getCarrusel = await carrusels.find(query);
    
    if(!getCarrusel) throw new Error('No se pudieron traer los producos')
    return getCarrusel
}

const  deletingCarruselServices = async (id) => {
    const Carrusel = await carrusels.findByIdAndDelete(id);
    if(!Carrusel) throw new Error('No se logro eliminar el Carruselo')
    return Carrusel
}

module.exports = {
    createCarruselServices,
    getCarruselsServices,
    deletingCarruselServices,
}