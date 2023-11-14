const { createUser, getAllUser, login, deleteUsersService, updateUsersService } = require('../services/user.service');

const createUsers = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(200).json({ newUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { id, name } = req.query;
        const allUsers = await getAllUser({ id, name });
        res.status(200).json({ allUsers });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const loginService = async (req, res) => {
    try {
        const loginUser = await login(req.body);
        res.status(200).json({ loginUser });
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = deleteUsersService({ id });
        if (!deleteUser) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ msg: 'Usuario eliminado con éxito' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await updateUsersService( id, req.body );
        res.status(200).json({ updateUser });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUsers,
    getAllUsers,
    loginService,
    deleteUsers,
    updateUsers
}