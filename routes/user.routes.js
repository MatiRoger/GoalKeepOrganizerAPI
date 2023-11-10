const express = require('express');
const routes = express();
const { createUsers, getAllUsers, loginService, deleteUsers, updateUsers } = require('../controllers/user.controller');


routes.post('/register', createUsers );
routes.get('/', getAllUsers);
routes.post('/login', loginService);
routes.delete('/:id', deleteUsers);
routes.put('/:id', updateUsers);

module.exports = routes