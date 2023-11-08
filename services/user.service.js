const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async ({ name, lastName, userName, password, email, admin, active }) => {

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash( password, saltRounds );

    const user = new User({
        name,
        lastName,
        userName,
        password: hashedPassword,
        email, 
        admin,
        active
    });

    await user.save();

    if(!user) throw new Error('No se a podido crear un nuevo usuario')
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

    if(!users) throw new Error('No se pueden traer todos los usuarios')
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




module.exports = {
    createUser,
    getAllUser,
    login
}