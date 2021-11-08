const Location = require('./location.model')
const { setError } = require('../utils/error/error.utils');


const getAllLocations = async (req, res, next) => {
    try {
        const allLocations = await Location.find()
        res.status(200).json(allLocations)
    } catch (error) {
        return next(error)
    }
}

const getLocation = async (req, res, next) => {
    try{
        const {id} = req.params
        const location = await Location.findById(id)
        if (!location) {
            return next(setError(404, 'Location not found'))
        }
        return res.status(200).json(location)

    }catch(error){
        return next(error)
    }
}

const postNewLocation = async (req, res, next) => {
    try {
        const newLocation = new Location()
        newLocation.name = req.body.name
        newLocation.residents = req.body.residents
        if(req.file){
            newLocation.img= req.file.path      
        }
        const locationInBd = await newLocation.save()
        return res.status(201).json(locationInBd)
    } catch (error) {
        return next(error)
    }
}

const patchLocation = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchLocation = new Location(req.body);
        patchLocation._id = id;
        if(req.file){
            patchLocation.img = req.file.path
        }
        const updatedLocation = await Location.findByIdAndUpdate(id, patchLocation)
        if (!updatedLocation) {
            return next(setError(404, 'Location not found'))
        }
        return res.status(200).json(updatedLocation)
    } catch (error) {
        return next(error)
    }
}

const deleteLocation = async (req, res, next) => {
    try{
        const {id} = req.params
        const deletedLocation = await Location.findByIdAndDelete(id)
        if (!deletedLocation) {
            return next(setError(404, 'Location not found'))
        }
        return res.status(200).json(deletedLocation)

    }catch(error){
        return next(error)
    }
}


module.exports = {
    getAllLocations,
    postNewLocation,
    patchLocation,
    deleteLocation,
    getLocation


}