const Weapon = require('./weapon.model')
const { setError } = require('../utils/error/error.utils');


const getAllWeapons = async (req, res, next) => {
    try {
        const allWeapons = await Weapon.find()
        res.status(200).json(allWeapons)
    } catch (error) {
        return next(error)
    }
}

const getWeapon = async (req, res, next) => {
    try{
        const {id} = req.params
        const weapon = await Weapon.findById(id)
        if (!weapon) {
            return next(setError(404, 'Weapon not found'))
        }
        return res.status(200).json(weapon)

    }catch(error){
        return next(error)
    }
}

const postNewWeapon = async (req, res, next) => {
    try {
        const newWeapon = new Weapon()
        newWeapon.name = req.body.name
        newWeapon.type = req.body.type
        newWeapon.owner = req.body.owner
        if(req.file){
            newWeapon.img= req.file.path      
        }
        const weaponInBd = await newWeapon.save()
        return res.status(201).json(weaponInBd)
    } catch (error) {
        return next(error)
    }
}

const patchWeapon = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchWeapon = new Weapon(req.body);
        patchWeapon._id = id;
        if(req.file){
            patchWeapon.img = req.file.path
        }
        const updatedWeapon = await Weapon.findByIdAndUpdate(id, patchWeapon)
        if (!updatedWeapon) {
            return next(setError(404, 'Weapon not found'))
        }
        return res.status(200).json(updatedWeapon)
    } catch (error) {
        return next(error)
    }
}

const deleteWeapon = async (req, res, next) => {
    try{
        const {id} = req.params
        const deletedWeapon = await Weapon.findByIdAndDelete(id)
        if (!deletedWeapon) {
            return next(setError(404, 'Weapon not found'))
        }
        return res.status(200).json(deletedWeapon)

    }catch(error){
        return next(error)
    }
}


module.exports = {
    getAllWeapons,
    postNewWeapon,
    patchWeapon,
    deleteWeapon,
    getWeapon


}