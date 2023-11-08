const express = require('express');
const routes = express();
const { createUsers, getAllUsers, loginService } = require('../controllers/user.controller');


routes.post('/register', createUsers );
routes.get('/', getAllUsers);
routes.post('/login', loginService)

module.exports = routes