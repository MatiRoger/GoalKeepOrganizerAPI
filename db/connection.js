const mongoose = require('mongoose');

const connection = async () => {
    const connectionString = process.env.CONNECTION_STRING;
    try {
        await mongoose.connect(connectionString);
        console.log("Conectado a Base de Datos");
    } catch (error) {
        console.log(error);
    }
}
module.exports=connection;