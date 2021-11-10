const express = require('express');
const CharacterController = require('./src/character/character.controller');
const LocationController = require('./src/location/location.controller')
const ItemController = require('./src/item/item.controller')
const WeaponController = require('./src/weapon/weapon.controller')
const UserController = require('./src/user/user.controller')
const {isAuth} = require('./src/middlewares/auth.middleware')

const { connectDb } = require('./src/utils/db/db')
const cloudinary = require('cloudinary').v2

const PORT = 4000;
const app = express();

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(express.json({
    limit:'5mb'
}))
app.use(express.urlencoded({ extended: true }))

app.use('/users', UserController)
app.use(isAuth)
app.use('/characters', CharacterController)
app.use('/locations', LocationController)
app.use('/items', ItemController)
app.use('/weapons', WeaponController)


app.use('*', (req, res, next) => {
    const error = new Error()
    error.status = 404
    error.message = 'Route not found'
    return next(error)
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
})