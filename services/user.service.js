const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const encryptPassword = async (password) => {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash( password, SALT_ROUNDS );
    return hashedPassword;
}


const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s']+$/;
    return nameRegex.test(name);
}


const validatePassword = (password) => {
    // La expresión regular requiere al menos una mayúscula, una minúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


const createUser = async ({ name, lastName, userName, password, email, admin, active }) => {

    const passwordHashed = await encryptPassword(password);    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateName(name) || !validateName(lastName)) {
        throw new Error('Nombre o apellido no válido');
    }

    if(!validatePassword(password)){
        throw new Error('El formato de la contraseña no es valido');
    }

    if (!emailRegex.test(email)) {
        throw new Error('El formato del correo electrónico no es válido');
    }

    const user = new User({
        name,
        lastName,
        userName,
        password: passwordHashed,
        email: emailValidation, 
        admin,
        active
    });

    await user.save();

    if(!user) throw new Error('Error al crear un nuevo usuario')
    return user;
};


const getAllUser = async ({ id, name }) => {

    let query = {};

    if(id){
        query._id = id;
    }

    if (name) {
        query.name =  { $regex: '.*' + name + '.*', $options: 'i' };
    }

    const users = await User.find(query);

    if(!users) throw new Error('Error al traer todos los usuarios')
    return users
};


const login = async ({ userName, email, password }) => {
    const SECRET = process.env.SECRET_KEY;
    let userFounded;

    if(userName){
        userFounded = await User.findOne({ userName });
    }else if(email){
        userFounded = await User.findOne({ email })
    }
    
    if(!userFounded) throw new Error('Las credenciales no son validas');

    const passwordCompare = await bcrypt.compare(password, userFounded.password);

    if (!passwordCompare) throw new Error('Las credenciales son incorrectas');

    const userPasswordHidden = userFounded._doc;
    delete userPasswordHidden.password;

    const payload = {
        userPasswordHidden       
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '3h',
    });

    return{ token, userPasswordHidden };
};


const deleteUsersService = async ({ id }) => {

    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser) throw new Error('No se pudo eliminar el usuario')
    return deleteUser

};


const updateUsersService = async ({ id, ...updates }) => {

    const validFields = ['name', 'lastName', 'userName', 'password']; 

    if (('name' in updates && !validateName(updates.name)) || ('lastName' in updates && !validateName(updates.lastName))) {
        throw new Error('Nombre o apellido no válido');
    }

    if('password' in updates && !validatePassword(updates.password)){
        throw new Error('La contraseña no es valida');
    }

    //some: verifica si al menos un valor cumple
    //Object.keys: devuelve un array de las keys
    if (!validFields.some(field => Object.keys(updates).includes(field))) {
        throw new Error('Se requiere al menos un campo válido para la actualización');
    }

    // Obeject.entries() : crea un array de subarrays
    // .filter(([key]) => validFields.includes(key)): Utiliza el método filter para crear un nuevo array que solo incluye los subarrays donde la clave (key) está presente en validFields. 
    const filteredUpdates = Object.fromEntries(Object.entries(updates).filter(([key]) => validFields.includes(key)));

    if (filteredUpdates.password) {
        filteredUpdates.password = await encryptPassword(filteredUpdates.password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, filteredUpdates, { new: true });

    if (!updatedUser) {
        throw new Error('Error al actualizar usuario');
    }

    return updatedUser;
};


module.exports = {
    createUser,
    getAllUser,
    login,
    deleteUsersService,
    updateUsersService
}