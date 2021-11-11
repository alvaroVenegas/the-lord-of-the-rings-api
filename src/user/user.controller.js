const UserController = require('express').Router();
const { isAuth } = require('../middlewares/auth.middleware')

const { /* getAllUsers, */ getUser, postNewUser, loginUser, logoutUser } = require('./user.service')

//UserController.get('/', [isAuth],getAllUsers)
UserController.get('/:id',[isAuth], getUser)

UserController.post('/', postNewUser)

UserController.post('/login', loginUser)
UserController.post('/logout', [isAuth], logoutUser)


module.exports = UserController