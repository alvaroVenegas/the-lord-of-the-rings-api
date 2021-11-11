const User = require('./user.model')
const bcrypt = require('bcrypt')
const { setError } = require('../utils/error/error.utils')
const JwtUtils = require('../utils/jwt/jwtUtils')


/* const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            element.password = null
        }
        return res.status(200).json(users)
    } catch (error) {
        return next(error)
    }
} */

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        if(id != req.user.id){
            return next(setError(403, 'Forbidden'))
        }
        const user = await User.findById(id)
        if (!user) {
            return next(setError(404, 'User not found'))
        }
        user.password = null
        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }
}

const postNewUser = async (req, res, next) => {
    try {

        const newUser = new User(req.body)
        const userExist = await User.findOne({ alias: newUser.alias })
      
        if (userExist) {
            return next(setError(404, 'This Alias already exists'))
        }
        const userInBd = await newUser.save()
        userInBd.password = null
        return res.status(201).json(userInBd)
    } catch (error) {
        return next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        //console.log('alias-->',req.body.alias)
        const userInBd = await User.findOne({ alias: req.body.alias })
        // console.log('usuario encontrado-->',userInBd)

        if (!userInBd) {
            return next(setError(404, 'Location not found'))
        }

        if (bcrypt.compareSync(req.body.password, userInBd.password)) {
            userInBd.password = null
            // console.log('constraseña correcta')

            const token = JwtUtils.generate(userInBd._id, userInBd.alias)
            //const token = jwt.sign({ id: userInBd._id, alias: userInBd.alias }, process.env.JWT_SECRET, { expiresIn: '1d' });

            return res.status(200).json(token)
        }

    } catch (error) {
        error.message = 'error to login'
        return next(error)
    }

}

const logoutUser = (req, res, next) => {
    try {
        const token = null
        return res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
   /*  getAllUsers, */
    getUser,
    postNewUser,
    loginUser,
    logoutUser

}