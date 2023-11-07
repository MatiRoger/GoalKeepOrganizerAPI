const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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

module.exports = {
    createUser,
    getAllUser
}