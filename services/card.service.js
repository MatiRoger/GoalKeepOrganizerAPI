const cards = require('../models/card.model');

const createCardServices = async ({name, description, Image, }) => {
        const card = new cards({
            name,
            description,
            Image,
    });
    
    console.log(card)
    await card.save();

    if(!card) throw new Error('No se pudo crear card')
    return card;
};

const getcardsServices = async ({id}) => {
    let query = {}

    if(id){
        query._id = id;
    }

    const getcard = await cards.find(query);
    
    if(!getcard) throw new Error('No se pudieron traer los producos')
    return getcard
}

const deletingcardServices = async (id) => {
    const card = await cards.findByIdAndDelete(id);
    if(!card) throw new Error('No se logro eliminar el cardo')
    return card
}

module.exports = {
    createCardServices,
    getcardsServices,
    deletingcardServices,
}