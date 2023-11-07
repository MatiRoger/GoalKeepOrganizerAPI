const { createUser, getAllUser } = require('../services/user.service');

const createUsers = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.status(200).json({ newUser });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { id, name } = req.query;
        const allUsers = await getAllUser({ id, name });
        res.status(200).json({ allUsers });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

module.exports = {
    createUsers,
    getAllUsers
}