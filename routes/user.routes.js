const express = require('express');
const routes = express();
const { createUsers, getAllUsers } = require('../controllers/user.controller');


routes.post('/register', createUsers );
routes.get('/', getAllUsers);

module.exports = routes