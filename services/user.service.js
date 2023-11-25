const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const encryptPassword = async (password) => {
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
}


const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s']{2,30}$/;
    return nameRegex.test(name);
}


const validatePassword = (password) => {
    // La expresión regular requiere al menos una mayúscula, una minúscula, un número y un carácter especial
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};


const createUser = async ({ name, lastName, userName, password, confirmPassword, email, admin, active }) => {

    const passwordHashed = await encryptPassword(password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validateName(name) || !validateName(lastName)) {
        throw new Error('Nombre o apellido no válido');
    };
    
    if (!userName) {
        throw new Error('Se requiere ingresar un nombre de usuario');
    };

    if (!validatePassword(password)) {
        throw new Error('Contraseña no es valida (deber tener al menos: un minimo de 8 caracteres, una mayuscula, una minuscula, un numero y un simbolo especial)');
    };

    if (!confirmPassword) {
        throw new Error('Debe confirmar la contraseña');
    };

    if(password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
    };

    if (!emailRegex.test(email)) {
        throw new Error('El formato del correo electrónico no es válido');
    };


    const user = new User({
        name,
        lastName,
        userName,
        password: passwordHashed,
        email,
        admin,
        active
    });

    await user.save();

    if (!user) throw new Error('Error al crear un nuevo usuario')
    return user;
};


const getAllUser = async ({ id, name }) => {

    let query = {};

    if (id) {
        query._id = id;
    }

    if (name) {
        query.name = { $regex: '.*' + name + '.*', $options: 'i' };
    }

    const users = await User.find(query);

    if (!users) throw new Error('Error al traer todos los usuarios')
    return users
};


const login = async ({ userName, email, password }) => {
    const SECRET = process.env.SECRET_KEY;
    let userFounded;

    if (userName) {
        userFounded = await User.findOne({ userName });
    } else if (email) {
        userFounded = await User.findOne({ email })
    }

    if (!userFounded) throw new Error('Las credenciales no son validas');

    const passwordCompare = await bcrypt.compare(password, userFounded.password);

    if (!passwordCompare) throw new Error('Las credenciales no son validas');

    const userPasswordHidden = userFounded._doc;
    delete userPasswordHidden.password;

    const payload = {
        userPasswordHidden
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '3h',
    });

    return { token, userPasswordHidden };
};


const deleteUsersService = async ({ id }) => {

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) throw new Error('No se pudo eliminar el usuario')
    return deleteUser

};


const updateUsersService = async ( id, userUpdate ) => {

    if (userUpdate.password && !validatePassword(userUpdate.password)) {
        throw new Error('Contraseña no es valida (deber tener al menos: un minimo de 8 caracteres, una mayuscula, una minuscula, un numero y un simbolo especial)');
    }

    if (userUpdate.name && !validateName(userUpdate.name)) {
        throw new Error('Nombre no válido');
    }

    if (userUpdate.lastName && !validateName(userUpdate.lastName)) {
        throw new Error('Apellido no válido');
    }

    if (userUpdate.password) {
        userUpdate.password = await encryptPassword(userUpdate.password);
    }

    let userUpdates = await User.findByIdAndUpdate(id, userUpdate, { new: true });
    console.log(userUpdate);

    if (!userUpdates) throw new Error('No se pudo encontrar el usuario para actualizar')
    return userUpdates; 
};


module.exports = {
    createUser,
    getAllUser,
    login,
    deleteUsersService,
    updateUsersService
}