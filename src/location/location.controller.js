const LocationController = require('express').Router();
const { getAllLocations, postNewLocation, patchLocation,deleteLocation, getLocation } = require('./location.service');
const upload = require('../middlewares/file.middleware')



LocationController.get('/', getAllLocations)
LocationController.get('/:id', getLocation)
LocationController.post('/', upload.single('img'), postNewLocation)
LocationController.patch('/:id',upload.single('img'),patchLocation)
LocationController.delete('/:id',deleteLocation)


module.exports = LocationController